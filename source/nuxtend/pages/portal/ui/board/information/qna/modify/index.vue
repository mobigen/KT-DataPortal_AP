<template>
  <div>
    <h1>문의하기</h1><br/>

    <h3>문의유형</h3>
    <radio-button
      :radioButtonList="categoryList"
      labelName="qnaCategory"
      :defaultValue="categoryDefaultVal"
      @changeValue="setCategory"
    /><br/>

    <h3>제목</h3>
    <input
      type="text"
      :value="title"
      placeholder="50자 이내 입력가능"
      @input="setTitle"
    /><br/><br/>

    <h3>작성자</h3>
    <div v-if="getUserInfo.authenticated">{{getUserInfo.userNm}}</div><br/>

    <h3>이메일</h3>
    <div v-if="getUserInfo.authenticated">{{getUserInfo.email ? getUserInfo.email : "test@example.com"}}</div>
    <basic-single-checkbox
      checkboxLabel="이메일 답변 받기"
      :checked="emailAnsYnDefaultVal"
      @changeData="setEmailAnsYn"
    ></basic-single-checkbox><br/>

    <h3>공개여부</h3>
    <radio-button
      :radioButtonList="openYnList"
      labelName="qnaOpenYn"
      :defaultValue="openYnDefaultVal"
      @changeValue="setOpenYn"
    /><br/>

    <h3>내용</h3>
    <basic-textarea
      :inputData="contents"
      @input="setContents"
    ></basic-textarea><br/>

    <h3>첨부파일</h3>
    <file-upload-box :defaultFiles="defaultFiles" @setFiles="setFiles" msg="첨부파일을 선택해주세요. (최대 10MB까지 등록 가능)" @setDeletedFiles="setDeletedFiles"/>

    <h3>비밀번호</h3>
    <div>4자리 숫자 이하로 입력해주세요</div>
    <input
      type="password"
      :value="password"
      @input="setPassword"
    /><br/><br/>

    <basic-button
      @click="cancel"
    >취소</basic-button>

    <basic-button
      @click="modify"
    >수정</basic-button>
  </div>
</template>

<script>
import _ from "lodash"
import {mapActions, mapGetters} from "vuex";
import RadioButton from "@common/atoms/radio-button";
import TextInput from "@common/atoms/text-input";
import BasicTextarea from "@common/atoms/basic-textarea";
import BasicSingleCheckbox from "@common/atoms/basic-single-checkbox";
import BasicButton from "@common/atoms/basic-button";
import FileUploadBox from "@component/common/atoms/file-upload-box/file-upload-box";

export default {
  name: "index",
  components: {FileUploadBox, BasicButton, BasicSingleCheckbox, BasicTextarea, TextInput, RadioButton},
  computed: {
    ...mapGetters("users/user",["getUserInfo"]),
  },
  async asyncData({store,redirect,route}){
    // 유저정보 가져오기
    const userInfo = store.getters["users/user/getUserInfo"]

    // qna 가져오기
    const getQnaParams = {
      id : route.query.id
    }
    await store.dispatch("board/qna/qna/getQna",getQnaParams)
    const qna = store.getters["board/qna/qna/qna"]

    // 로그인 여부 및 작성자 체크크
    if(!userInfo.authenticated || qna.qnaInfo.body.userId!=userInfo.userId){
      redirect("/portal/ui/board/information/qna")
      if(process.client){alert("권한이 존재하지 않습니다."); return;}
    }

    const category = qna.qnaInfo.body["문의유형"]
    let categoryDefaultVal = 0
    switch(category){
      case "일반": categoryDefaultVal=0; break;
      case "데이터": categoryDefaultVal=1; break;
      case "회원가입": categoryDefaultVal=2; break;
      case "기타": categoryDefaultVal=3; break;
    }
    const title = qna.qnaTitle.body["문의제목"]
    const contents = qna.qnaContents.body["문의내용"]
    const openYn = qna.qnaInfo.body["openYn"]
    let openYnDefaultVal = 0
    switch(openYn){
      case "Y": openYnDefaultVal=0; break;
      case "N": openYnDefaultVal=1; break;
    }
    const emailAnsYn = qna.qnaInfo.body["emailAnsYn"]
    let emailAnsYnDefaultVal = false
    switch(emailAnsYn){
      case "Y": emailAnsYnDefaultVal=true; break;
      case "N": emailAnsYnDefaultVal=false; break;
    }
    const password = qna.qnaInfo.body.password == 0 ? "" : qna.qnaInfo.body.password

    // 파일리스트 가져오기
    const getFileListParams = {
      contentId : route.query.id,
      service : "qna"
    }
    await store.dispatch("board/qna/qna/getFileList",getFileListParams)
    const defaultFiles = _.cloneDeep(store.getters["board/qna/qna/fileList"])

    return {categoryDefaultVal,category,title,contents,openYn,openYnDefaultVal,emailAnsYn,emailAnsYnDefaultVal,password,defaultFiles}

  },
  data() {
    return {
      defaultFiles:[],
      deletedFiles:[],
      files:[],
      title:"",
      contents:"",
      categoryDefaultVal:0,
      category: "",
      categoryList: [
        { value: 0, label: "일반" },
        { value: 1, label: "데이터" },
        { value: 2, label: "회원가입" },
        { value: 3, label: "기타" }
      ],
      openYn:"",
      openYnDefaultVal:0,
      openYnList:[
        { value: 0, label: "공개" },
        { value: 1, label: "비공개" },
      ],
      emailAnsYn:'',
      emailAnsYnDefaultVal:true,
      password:''
    }
  },
  methods: {
    ...mapActions("board/qna/qna",["modifyQna","fileUpload","deleteFiles"]),
    setCategory(param) {
      this.category = this.categoryList.filter((item) => item.value == param.input)[0].label;
      console.log(this.category)
    },
    setOpenYn(param){
      if(param.input==0){this.password =''}
      this.openYn = param.input == 0 ? 'Y' : 'N'
    },
    setEmailAnsYn(value){
      this.emailAnsYn = value ? 'Y' : 'N'
    },
    setTitle(e){
      const maxLength = 50;
      if(e.target.value.length>maxLength){
        alert("제목은 50자 이내 입력가능합니다.")
        e.target.value = e.target.value.substr(0,maxLength)
      }
      this.title = e.target.value
    },
    setContents(param){
      this.contents = param.input;
    },
    setPassword(e){
      if(this.openYn=="Y"){ e.target.value = '' }  // 공개일때 비밀번호 비활성화
      const maxLength = 4
      e.target.value = e.target.value.replace(/[^0-9]/g, '')  // 숫자만 입력
      if(e.target.value.length>maxLength){
        alert("비밀번호는 4자 이내 입력가능합니다.")
        e.target.value = e.target.value.substring(0,maxLength)
      }
      this.password = e.target.value
    },
    setFiles(files){
      this.files=files;
      for(let file of this.defaultFiles){this.deletedFiles.push(file)};
      this.defaultFiles=[];
    },
    setDeletedFiles(deletedFiles){
      this.deletedFiles = deletedFiles
    },
    cancel(){
      if(confirm("취소하시겠습니까")){this.$router.push(`/portal/ui/board/information/qna/detail?id=${this.$route.query.id}`)}
    },
    async modify(){
      if(this.title=="" || this.contents==""){
        alert("제목과 내용을 모두 입력해주세요"); return;
      }
      if(this.openYn=="N" && (this.password.length==0 || this.password.length>4)){
        alert("비공개시 4자리 숫자 이내로 비밀번호를 입력해주세요"); return;
      }
      const modifyData={
        qnaId: this.$route.query.id,
        category : this.category,
        title : this.title,
        regUser : this.getUserInfo.userId,
        email : this.getUserInfo.email ? this.getUserInfo.email : "test@example.com",
        emailAnsYn : this.emailAnsYn,
        openYn : this.openYn,
        contents: this.contents,
        password: this.password
      }
      console.log(modifyData)
      if(confirm("수정하시겠습니까")){
        const data = await this.modifyQna(modifyData)
        console.log(data)
        if(this.deletedFiles.length>0){await this.deleteFiles({fileIds:this.deletedFiles.map((file)=>file.fileId)})}
        const params = {
          files: this.files,
          contentId : this.$route.query.id,
          service : "qna"
        }
        if(this.files.length>0){ await this.fileUpload(params)}
        this.$router.push(`/portal/ui/board/information/qna/detail?id=${this.$route.query.id}`)
      }

    }
  },
}
</script>

<style scoped>
</style>
