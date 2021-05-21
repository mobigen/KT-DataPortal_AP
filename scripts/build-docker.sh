#!/bin/bash

# directory 구조
#   . {baseDir}
#   build-source.sh
#   build-docker.sh
#   docker/
#       template/               {templateDir}
#           app/                {templateAppDir}
#           service/            {templateSvcDir}
#       target/                 {targetDir} - build 시 생성
#           app/${SERVICE_ID}/ {targetAppDir} - docker container 내부에서 필요한 파일들
#           service/            {targetSvcDir} - docker 환경을 위한 파일들
#       Dockerfile
#   dist-source/                {distSourceDir} - source bulid 시 생성
#   dist-docker/                {distDockerDir} - docker build 시 생성

set -e

cd $(dirname "$0")/..
baseDir=$(pwd)

source scripts/env.sh

dockerDir=$baseDir/docker

targetDir=$dockerDir/target
templateDir=$dockerDir/template

targetAppDir=$targetDir/app/${SERVICE_ID}
targetSvcDir=$targetDir/service

templateAppDir=$templateDir/app
templateSvcDir=$templateDir/service

distDockerDir=$baseDir/dist-docker
distSourceDir=$baseDir/dist-source

# docker config 정보 불러오기
source $templateSvcDir/docker-conf/docker.conf

## docker image tag 를 위한 정보
# current date YYYYMMdd
today=$(date +%Y%m%d)
## load version
newVersion="v2"
headHash=$(git rev-parse --short=7 HEAD)
dataFormat=`date +%Y`
newVersion=${newVersion}.${today}.0-${headHash}

function check() {
    echo "========================================================="
    echo "## Check"
    echo "========================================================="

    echo '-check docker command'
    if [ ! -d $docker ]; then
        echo 'docker command not found'
        exit 1
    fi

    echo '-check dist source'
    if [ ! -d $distSourceDir ]; then
        echo 'source build first.'
        exit 1
    fi

    echo ''
}

function clear() {
    echo "========================================================="
    echo "## Docker Clear"
    echo "========================================================="

    # remove container
    echo '-remove docker container'
    containerId=`docker ps -a | grep "[[:space:]]$instanceId$" | awk '{print $1}'`
    for c in $containerId
    do
        docker stop $c 2> /dev/null
        docker rm $c 2> /dev/null
    done

    # docker image 제거
    echo '-remove docker image'
    imageIds=`docker images -a | grep $appId | awk '{print $3}' | uniq`
    for imgId in $imageIds
    do
        docker rmi $imgId 2> /dev/null
    done

    echo '-remove directory'
    if [[ -d $distDockerDir ]]; then
        rm -rf $distDockerDir
    fi
    if [[ -d $targetDir ]]; then
        rm -rf $targetDir
    fi

    echo ''
}

function ready() {
    echo "========================================================="
    echo "## Docker Build Ready"
    echo "========================================================="

    echo '-copy dist source & scripts & conf'
    # app 구성 (+dist-source 복사)
    mkdir -p ${targetAppDir}
    mkdir -p ${targetAppDir}/lib
    mkdir -p ${targetAppDir}/conf

    # TODO: mount 를 하는데 필요한가?
    # cp -ap ${templateSvcDir}/docker-conf/* ${targetAppDir}/conf/
    cp -rf ${distSourceDir}/* ${targetAppDir}/lib/
    cp -rf ${templateAppDir}/* ${targetAppDir}
    # NOTE: entry-point 는 app 폴더 바깥에 배치
    mv ${targetAppDir}/entry-point ${targetDir}

    echo ''
}

function build() {
    echo "========================================================="
    echo "## Docker Build Start"
    echo "========================================================="

    # NOTE: docker build 는 Dockerfile 경로를 지정하거나 파일과 같은 위치에서 수행해야 한다.
    cd $dockerDir

    docker build \
        --build-arg SERVICE_ID=${SERVICE_ID} \
        --build-arg CONTAINER_HOME=${CONTAINER_HOME} \
        --build-arg SERVICE_HOME=${SERVICE_HOME} \
        -t $IMAGE_NAME:$newVersion \
        $dockerDir

    cd $baseDir

    if [ $? != 0 ]; then
        echo "[ERROR] docker build failed."
        exit 1
    fi

    echo ''
}

function package() {
    echo "========================================================="
    echo "## Docker Packaging"
    echo "========================================================="

    # target 디렉토리 생성
    echo '-make directory.'
    mkdir -p $targetSvcDir
    mkdir -p $targetSvcDir/conf-template/$appId
    mkdir -p $targetSvcDir/bin
    mkdir -p $targetSvcDir/install
    mkdir -p $targetSvcDir/images
    mkdir -p $targetSvcDir/logs/$appId

    echo '-start to copy files.'
    # docker 서비스 환경을 위한 파일 복사
    cp $templateSvcDir/bin/bin.sh $targetSvcDir/bin/$appId.sh
    cp $templateSvcDir/install/install.sh $targetSvcDir/install/$appId.sh
    if [[ -d $templateSvcDir/conf ]]; then
        cp -ap $templateSvcDir/conf/* $targetSvcDir/conf-template/$appId/
    fi
    cp -ap $templateSvcDir/docker-conf/* $targetSvcDir/conf-template/$appId/
    if [[ -f $templateSvcDir/bin/setup-apply.sh ]]; then
        cp $templateSvcDir/bin/setup-apply.sh $targetSvcDir/bin/$appId-setup-apply.sh
    fi

    echo '-insert docker env'
    function fnSet() {
        line=$1
        string=$2
        confFile=$3
        # WARN: BSD sed, GNU sed의 차이에 의해서 아래처럼 사용함.
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -e $line' i\
'$string'
' $confFile
        else
        sed -i'' -e $line' i\
'$string'
' $confFile
        fi
    }
    fnSet 3 appId=$appId $targetSvcDir/bin/$appId.sh
    fnSet 4 instanceId=$instanceId $targetSvcDir/bin/$appId.sh
    fnSet 5 company=$company $targetSvcDir/bin/$appId.sh
    fnSet 6 IMAGE_NAME=$IMAGE_NAME $targetSvcDir/bin/$appId.sh
    fnSet 6 CONTAINER_HOME=$CONTAINER_HOME $targetSvcDir/bin/$appId.sh
    fnSet 6 SERVICE_HOME=$SERVICE_HOME $targetSvcDir/bin/$appId.sh

    fnSet 3 appId=$appId $targetSvcDir/install/$appId.sh
    fnSet 4 instanceId=$instanceId $targetSvcDir/install/$appId.sh
    fnSet 5 company=$company $targetSvcDir/install/$appId.sh
    fnSet 6 IMAGE_NAME=$IMAGE_NAME $targetSvcDir/install/$appId.sh

    # output docker image
    docker save -o $targetSvcDir/images/$appId.tar.gz $IMAGE_NAME:$newVersion

    if [ $? != 0 ]; then
        echo "[ERROR] docker save failed."
        exit 1
    fi

    # Tar all the results
    cd $targetDir
    tar cvzf $appId-dist-$newVersion-$today.tar.gz service

    mkdir $distDockerDir
    mv $targetDir/$appId-dist-$newVersion-$today.tar.gz $distDockerDir

    cd $baseDir

    echo ''
}

# ex) ./build-docker.sh clear
if [[ $1 = "clear" ]]; then
    clear
else
    check
    clear
    ready
    build

    # NOTE: docker 서비스 환경을 위한 배포 파일 만들기
    # ex) ./build-docker.sh docker
    if [[ $1 = "docker" ]]; then
        package
    fi

    echo "========================================================="
    echo "## Docker Build End"
    echo "========================================================="

    echo "target: $IMAGE_NAME:$newVersion"
    echo "result: `docker images | grep ${IMAGE_NAME} | awk '{print $1":"$2}'`"

    echo ''
fi
