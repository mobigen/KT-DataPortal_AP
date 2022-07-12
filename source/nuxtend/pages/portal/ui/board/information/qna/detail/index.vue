<template>
  <div>
    <h1>문의하기</h1>
    <h2>* 문의 주신 내용은 충분한 검토 및 확인 후 답변 드리겠습니다.</h2>
    <h2>* 이용에 관한 문의 및 답변은 공개를 원칙으로 운영되며, 비공개를 원하실 경우 문의 등록 시, 공개 여부를 선택해 주세요.</h2>
    <basic-view-table
      :headerList="qna.qnaInfo.header"
      :dataObj="qna.qnaInfo.body"
      viewTableColumnCount="4"
    ></basic-view-table>
    <basic-view-table
      :headerList="qna.qnaTitle.header"
      :dataObj="qna.qnaTitle.body"
      viewTableColumnCount="1"
    ></basic-view-table>
    <basic-view-table
      :headerList="qna.qnaContents.header"
      :dataObj="qna.qnaContents.body"
      viewTableColumnCount="1"
    ></basic-view-table>
    <div v-if="qna.ansYn">
      <basic-view-table
        :headerList="qna.answerInfo.header"
        :dataObj="qna.answerInfo.body"
        viewTableColumnCount="1"
      ></basic-view-table>
      <basic-view-table
        :headerList="qna.answerContents.header"
        :dataObj="qna.answerContents.body"
        viewTableColumnCount="1"
      ></basic-view-table>
    </div>
    <br/>
    <h2>첨부파일</h2>
    <h3 v-if="fileList.length==0">없음</h3>
    <div v-for="file in fileList" @click="downloadFile(file.fileId,file.fileName)">
      {{file.fileName}}
    </div>
    <br/><br/>
    <basic-button
      @click="showQnaList"
    >목록</basic-button>

    <div v-if="qna.qnaInfo.body.userId==userInfo.userId && !qna.ansYn">
      <basic-button @click="onModify">수정</basic-button>
      <basic-button @click="onDelete">삭제</basic-button>
    </div>

    <basic-button
      @click="emailAnsAlertTest"
    >이메일답변 테스트</basic-button>
  </div>
</template>

<script>
import axios from 'axios'
import BasicViewTable from "@common/atoms/basic-view-table";
import BasicButton from "@common/atoms/basic-button";
import {mapActions} from "vuex";
export default {
  name: "index",
  components: {BasicButton, BasicViewTable},
  async asyncData({store,route}) {
    // qna 가져오기
    const getQnaParams = {
      id : route.query.id
    }
    await store.dispatch("board/qna/qna/getQna",getQnaParams)
    const qna = store.getters["board/qna/qna/qna"]

    // 로그인 유저 정보 가져오기
    const userInfo = store.getters["users/user/getUserInfo"]
    console.log(userInfo)
    console.log(qna)

    // 파일리스트 가져오기
    const getFileListParams = {
      contentId : route.query.id,
      service : "qna"
    }
    await store.dispatch("board/qna/qna/getFileList",getFileListParams)
    const fileList = store.getters["board/qna/qna/fileList"]

    return {qna,fileList,userInfo}
  },
  data() {
    return {
      qna:{},
      fileList:[],
      userInfo:{}
    }
  },
  methods: {
    ...mapActions("board/qna/qna",["setHasDetailParams","deleteQna"]),
    showQnaList() {
      this.$router.push(`/portal/ui/board/information/qna`)
      this.setHasDetailParams(true)
    },
    // 관리자 페이지 생성시 추후 개발
    async emailAnsAlertTest(){
      const res = await axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/qna/email-ans-alert?email=${this.qna.qnaInfo.body.userEmail}&qnaId=${this.qna.qnaInfo.body.qnaId}`)
      console.log(res)
      if(res.data.result===1){alert("성공적으로 이메일답변이 전송되었습니다."); return;}
      if(res.data.result===0){alert("이메일 답변전송에 실패하였습니다"); return;}
    },
    async downloadFile(fileId,fileName){
      // // (구)파일 다운로드 API
      // const res = await axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/file/download?fileId=${fileId}`,{responseType:"blob"})
      const res = await axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/file?fileId=${fileId}`)
      console.log(res.data.data)
      if(process.client){
        // base64 => blob 변환
        let binaryStr = atob(res.data.data.fileBase64);
        let bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++){bytes[i] = binaryStr.charCodeAt(i);}
        // blob으로 다운로드 URL 생성
        const url = window.URL.createObjectURL(new Blob([bytes]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        link.style.cssText = "display:none";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    },
    onModify(){
      this.$router.push(`/portal/ui/board/information/qna/modify?id=${this.$route.query.id}`)
    },
    async onDelete(){
      if(confirm("작성한 내용을 삭제하시겠습니까?")){
        await this.deleteQna({qnaId:this.$route.query.id})
        history.back()
      }
    }
  },
}
</script>

<style scoped>

</style>
