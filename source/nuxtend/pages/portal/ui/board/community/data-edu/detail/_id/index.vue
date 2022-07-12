<template>
<div>
  <h1>데이터 교육</h1>
  <p>자동차분야 데이터를 활용한 분석 교육을 제공합니다.</p>
  <br>
  <hr>
  <div>
    {{ dataEduDetailRes.eduType }}
    <h1>{{ dataEduDetailRes.eduNm }}</h1>
    <p>{{ dataEduDetailRes.eduInfo }}</p>
    <br>
    조회수 {{ dataEduDetailRes.searchCnt }} | 등록자 {{ dataEduDetailRes.eduRegUser }} | 등록일 {{ dataEduDetailRes.eduRegDate }}
  </div>
  <br>
  <hr>
  <div>
      교육 링크 구역
  </div>
  <br>
  <hr>
  <div>
    활용데이터
    <hr>
      데이터리스트
    <hr>
    <br>
  </div>
  <basic-button @click="goList">
    <slot>
      <span>목록</span>
    </slot>
  </basic-button>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BasicButton from "@common/atoms/basic-button";
export default {
  components:{BasicButton},
  name: "dataEduDetail",
  data(){
    return{
      eduId: this.$route.params.id,
      // eduInfo: {
      //   eduId: '', // 교육 ID
      //   eduNm: '', // 교육 명
      //   eduDesc: '', // 교육 설명
      //   eduInfo: '', // 교육 내용
      //   eduType: '', // 교육 타입
      //   eduRegUser: '', // 교육 등록자
      //   eduRegDate: '', // 교육 등록시간
      //   searchCnt: '', // 조회수
      // }
    }
  },
  created(){
    this.getData()
  },
  computed: {
    ...mapGetters("board/dataEdu/dataEdu", ["dataEduDetailRes"]),
  },
  methods: {
    ...mapActions("board/dataEdu/dataEdu", ["getDataEduDetail"]),
    getData: function() {
      let params={
        eduId:this.eduId
      }
      this.getDataEduDetail(params);
    },
    goList() {
      let query = { keyword: this.$route.query.keyword, page: this.$route.query.page }
      this.$router.push({path: '/portal/ui/board/community/data-edu', query: query})
    }
  }

}
</script>

<style scoped>

</style>
