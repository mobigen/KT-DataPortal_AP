<template>
  <div>
    <h1>경진대회</h1>
    <p>데이터를 활용한 새로운 아이디어 및 서비스 개발 경진대회 도전을 응원합니다.</p>
    <hr/>
    <!--    {{ contest }}-->
    <div>
      {{ contest.conteTitle }}
      <basic-button
        v-if="contest.conteUrl"
        @click="goRegister"
      >
        <slot>
          <span>바로가기</span>
        </slot>
      </basic-button>

      <br>

      조회수 {{ contest.retvCnt }} | 등록자 {{ contest.regUser }} | 등록일 {{ contest.regDate }}
    </div>

    <br>
    <hr/>

    <div>
      {{ contest.conteInfo }}
    </div>

    <br>
    <hr>

    <basic-button @click="goList">
      <slot>
        <span>목록</span>
      </slot>
    </basic-button>

<!--    <basic-view-table-->
<!--      :headerList="tableHeaderList"-->
<!--      :dataObj="contest"-->
<!--      viewTableColumnCount="1"-->
<!--    ></basic-view-table>-->
<!--    <hr/>-->
<!--    <basic-button-->
<!--      @click="goList"-->
<!--    >-->
<!--      <slot>-->
<!--        <span>목록</span>-->
<!--      </slot>-->
<!--    </basic-button>-->
<!--    <basic-button-->
<!--      v-if="contest.conteUrl"-->
<!--      @click="goRegister"-->
<!--    >-->
<!--      <slot>-->
<!--        <span>바로가기</span>-->
<!--      </slot>-->
<!--    </basic-button>-->
  </div>
</template>

<script>
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table";
import BasicButton from "@component/aiPlatform/basic/basic-button";

export default {
  name: "contest-view-id",
  components: {BasicButton, BasicViewTable},
  data() {
    return {
      conteId: 'cnt_' + this.$route.params.id,
      contest: {
        conteId: 1,
        conteTitle: '',
        retvCnt: 0,
        regUser: '',
        regDate: '',
        conteUrl: '',
        conteInfo: ''
      },
      // tableHeaderList: [
      //   {column_name: 'conteId'},
      //   {column_name: 'conteTitle'},
      //   {column_name: 'retvCnt'},
      //   {column_name: 'regUser'},
      //   {column_name: 'regDate'},
      //   {column_name: 'conteUrl'},
      //   {column_name: 'conteInfo'}
      // ],
    }
  },
  computed: {},
  mounted() {
    this.getContest()
  },
  methods: {
    getContest() {
      let params = {
        conteId: this.conteId
      }
      this.$axios.post(`${this.$config.API_BOARD_PREFIX}/contest/view`, params)
        .then((res) => {
          // console.log('getContest return log')
          // console.log(res)
          this.contest = res
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    goRegister() {
      window.open(this.contest.conteUrl,'_blank')
    },
    goList() {
      let query = { keyword: this.$route.query.keyword, page: this.$route.query.page }
      this.$router.push({path: '/portal/ui/board/community/contest', query: query})
    }
  }
}
</script>

<style scoped>

</style>
