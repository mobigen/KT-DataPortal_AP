<template>
  <div>
    <h1>코드 뽐내기</h1>
    <p>데이터 분석 시 자주 활용될 수 있는 분석 코드를 제공합니다.</p>
    <br>
    <hr>
    <basic-icon>asdfasdfasdf</basic-icon>
    <h1>{{ codeShowDetailRes.codeNm }}</h1>
    <hr>
    조회수 {{ codeShowDetailRes.searchCnt }} | 등록자 {{ codeShowDetailRes.codeRegUser }} | 등록일 {{ codeShowDetailRes.codeRegDate }}
    <hr>
    <br>
    <p>{{codeShowDetailRes.codeDesc}}</p>
    <br>
    <br>
    주피터 노트북 표시
    <br><br>
    활용데이터
    <hr>
    <br><br>
    <hr>
    <basic-button @click="goList">
      <slot>
        <span>목록</span>
      </slot>
    </basic-button>
  </div>
</template>

<script>

import BasicIcon from "@common/atoms/basic-icon";

import {mapActions, mapGetters} from "vuex";
import BasicButton from "@common/atoms/basic-button";
export default {
  name: "codeShowDetail",
  components: {BasicButton, BasicIcon},
  data(){
    return{
      codeId:this.$route.params.id
    }
  },
  mounted() {
    this.getData();
  },
  computed:{
    ...mapGetters("analysis/codeShow/codeShow", ["codeShowDetailRes"]),
  },
  methods:{
    ...mapActions("analysis/codeShow/codeShow", ["getCodeShowDetail"]),
    getData(){
      const param={
        codeId:this.codeId
      }
      this.getCodeShowDetail(param);
    },
    goList() {
      let query = { keyword: this.$route.query.keyword, page: this.$route.query.page }
      this.$router.push({path: '/portal/ui/analysis/utilize/code-show', query: query})
    }
  }
}
</script>

<style scoped>

</style>
