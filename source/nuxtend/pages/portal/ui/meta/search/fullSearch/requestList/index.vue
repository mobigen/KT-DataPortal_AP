<template lang="html">
  <div id="requestList">
    <basic-search-bar @search="searchClick" :searchKeyword="searchKeyword" />

    <basic-table
      componentId=""
      :useHeader="true"
      :headerList="requireObj.header"
      :dataList="requireObj.body"
      rowKey="id"
      :useSerialNum="false"
      serialNumText=""
      :useTableButton="false"
      :tableButtonText="{}"
      :useTagList="false"
      @buttonAction=""
      @columnAction=""
      :keyActionText="{}"
      @keyAction=""
    ></basic-table>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicSearchBar from "@common/atoms/basic-search-bar";
import BasicTable from "@common/atoms/basic-table";
export default {
  name: "app-search-full-request-list",
  extends: {},
  props: {},
  data() {
    return {
      searchKeyword: ""
    };
  },
  computed: {
    ...mapGetters("meta/search/search", ["requireObj"])
  },
  components: { BasicSearchBar, BasicTable },
  watch: {},
  methods: {
    ...mapActions("meta/search/search", ["getRequireObj"]),
    searchClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.getRequireObj({
        searchCriteria: "empNum",
        searchKeyword: this.searchKeyword
      });
    }
  },
  created() {
    this.getRequireObj();
  }
};
</script>

<style lang="scss" scoped>
#requestList {
  width: 70%;
  margin: auto;
  #searchBox {
    margin: 15px auto 30px;
  }
}
</style>
