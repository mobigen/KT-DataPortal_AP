<template>
  <div>
    <h1>문의하기</h1>
    <h2>* 문의 주신 내용은 충분한 검토 및 확인 후 답변 드리겠습니다.</h2>
    <h2>* 이용에 관한 문의 및 답변은 공개를 원칙으로 운영되며, 비공개를 원하실 경우 문의 등록 시, 공개 여부를 선택해 주세요.</h2>
    <basic-view-table
      :headerList="qnaInfo.header"
      :dataObj="qnaInfo.body"
      viewTableColumnCount="4"
    ></basic-view-table>
    <basic-view-table
      :headerList="qnaTitle.header"
      :dataObj="qnaTitle.body"
      viewTableColumnCount="1"
    ></basic-view-table>
    <basic-view-table
      :headerList="qnaContents.header"
      :dataObj="qnaContents.body"
      viewTableColumnCount="1"
    ></basic-view-table>
    <div v-if="ansYn">
      <basic-view-table
        :headerList="answerInfo.header"
        :dataObj="answerInfo.body"
        viewTableColumnCount="1"
      ></basic-view-table>
      <basic-view-table
        :headerList="answerContents.header"
        :dataObj="answerContents.body"
        viewTableColumnCount="1"
      ></basic-view-table>
    </div>
    <basic-button
      @click="showQnaList"
    >목록</basic-button>
  </div>
</template>

<script>
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table";
import BasicButton from "@component/aiPlatform/basic/basic-button";
export default {
  name: "index",
  components: {BasicButton, BasicViewTable},
  async created() {
    console.log("created")
    console.log(this)
    const qna = await this.$axios.get(`${this.$config.API_BOARD_PREFIX}/qna?id=${this.$route.query.id}`)
    this.qnaTitle.body = {문의제목:qna.title}
    this.qnaInfo.body= {
      문의유형: qna.category,
      작성자: qna.regUser,
      작성일: qna.regDateStr,
      상태: qna.ansContents == null ? '대기중': '답변완료'
    }
    this.qnaContents.body={문의내용: qna.contents}
    this.answerInfo.body={답변:qna.ansDateStr}
    this.answerContents.body={답변내용:qna.ansContents}
    if(qna.ansContents!=null){
      this.ansYn = true
    }
  },
  data() {
    return {
        ansYn: false,
        qnaTitle:{
          header:[{column_name: "문의제목"}],
          body:{}
        },
        qnaInfo: {
          header: [
            {column_name: "문의유형"},
            {column_name: "작성자"},
            {column_name: "작성일"},
            {column_name: "상태"}
          ],
          body: {}
        },
        qnaContents:{
          header:[{column_name: "문의내용"}],
          body: {}
        },
        answerInfo:{
          header:[{column_name: "답변"}],
          body: {}
        },
        answerContents:{
          header:[{column_name: "답변내용"}],
          body: {}
        },

    }
  },
  methods: {
    showQnaList() {
      this.$router.push(`/portal/ui/board/information/qna`)
    }
  },
}
</script>

<style scoped>

</style>
