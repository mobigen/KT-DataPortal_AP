<!--경진대회-->
<template>
  <div>
    <h1>경진대회</h1>
    <hr />
    <p>목록</p>
    <basic-table
      :headerList="tableHeaderList"
      :dataList="tableDataList"
      rowKey="list_key"
      :serialNumUse="false"
      :tableButtonUse="false"
    >

    </basic-table>
  </div>
</template>

<script>
import BasicTable from "@component/aiPlatform/basic/basic-table";
export default {
  name: "contest",
  components: {BasicTable},
  data() {
    return {
      list: [],
      tableHeaderList: [
        {column_name : 'conteId'},
        {column_name : 'conteTitle'},
        {column_name : 'host'},
        {column_name : 'apyStDate'},
        {column_name : 'apyFnsDate'}
      ],
      tableDataList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.get(`${this.$config.API_BOARD_PREFIX}/contest/list`)
        .then((res) => {
          // console.log('return log')
          // console.log(res)
          this.tableDataList = res
          console.log('===========API 데이터==========')
          console.log('===테이블 헤더 목록======')
          console.log(this.tableHeaderList)
          console.log('==== 데이터 ====')
          console.log(this.tableDataList)
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
}
</script>

<style scoped>

</style>
