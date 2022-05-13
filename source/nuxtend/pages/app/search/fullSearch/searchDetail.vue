<template lang="html">
  <div>
    <h5>데이터 상세보기</h5>

    <div class="component">
      <h3>name tag component</h3>
    </div>

    <div class="component">
      <h3>view table component - 2</h3>
      <basic-view-table
        :headerList="headerList"
        :dataList="dataList"
        viewTableColumnCount="2"
      ></basic-view-table>
    </div>

    <div class="component">
      <h3>view table component 2 + 1</h3>
      <basic-view-table
        :headerList="headerList"
        :dataList="dataList"
        viewTableColumnCount="2"
      ></basic-view-table>
      <basic-view-table
        :headerList="headerList"
        :dataList="dataList"
        viewTableColumnCount="1"
      ></basic-view-table>
    </div>

    <div class="component">
      <h3>title component</h3>
      <h3>textarea component</h3>
    </div>

    <div class="component">
      <h3>title component</h3>
      <h3>tab menu component</h3>
      <h3>button component</h3>
      <h3>basic-table</h3>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicViewTable from "@/components/aiPlatform/basic/basic-view-table.vue";

export default {
  name: "app-search-full-detail",
  extends: {},
  props: {},
  data() {
    return {
      headerList: [
        {
          column_name: "provider"
        },
        {
          column_name: "department"
        },
        {
          column_name: "manager"
        },
        {
          column_name: "deptPhoneNo"
        }
      ],
      dataList: [
        { provider: "제공기관" },
        { department: "관련부서" },
        { manager: "담당자" },
        { deptPhoneNo: "관련부서 전화번호" }
      ]
    };
  },
  computed: {},
  components: { BasicViewTable },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
.component {
  padding: 20px;
  border: 1px solid lightgrey;
  margin: 10px;
}
</style>
