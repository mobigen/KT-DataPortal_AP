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
  </div>
</template>

<script>
import axios from 'axios'
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table";
import BasicButton from "@component/aiPlatform/basic/basic-button";
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

    // 파일리스트 가져오기
    const getFileListParams = {
      contentId : route.query.id,
      service : "qna"
    }
    await store.dispatch("board/qna/qna/getFileList",getFileListParams)
    const fileList = store.getters["board/qna/qna/fileList"]

    return {qna,fileList}
  },
  data() {
    return {
      qna:{},
      fileList:[]
    }
  },
  methods: {
    showQnaList() {
      this.$router.push(`/portal/ui/board/information/qna`)
    },
    async downloadFile(fileId,fileName){
      const res = await axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/file/download?fileId=${fileId}`,{responseType:"blob"})
      if(process.client){
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        link.style.cssText = "display:none";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
  },
}
</script>

<style scoped>

</style>
