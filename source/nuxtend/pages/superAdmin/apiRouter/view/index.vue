<template lang="html">
  <div>
    <h3>api-router view</h3>

    <div>
      <basic-viewTable :useTableHead="false" :viewDetail="apiInfoDetail" />

      <div>PARAMS</div>
      <basic-table
        componentId=""
        :headerList="apiParamsDetail.header"
        :dataList="apiParamsDetail.body"
        rowKey="api_name"
        :useSerialNum="true"
        serialNumText="No."
        :useTableButton="false"
        :tableButtonText="{}"
        @buttonAction=""
        @columnAction=""
        :keyActionText="{}"
        @keyAction=""
      />

      <div class="add-button">
        <basic-button
          componentId=""
          @click="buttonOk"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          >확인</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicViewTable from "@component/aiPlatform/basic/basic-viewTable.vue";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";

export default {
  name: "apiRouter-view",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      apiInfoDetail: {},
      apiParamsDetail: {}
    };
  },
  computed: {},
  components: { BasicButton, BasicViewTable, BasicTable },
  watch: {},
  methods: {
    buttonOk() {
      this.$router.push({ path: "/superAdmin/apiRouter/list" });
    }
  },
  created() {
    this.apiName = this.$route.query.apiName;

    const me = this;
    this.$axios
      .get(
        this.$config.API_ROUTER_PREFIX +
          "/getApi?api_name=" +
          this.$route.query.apiName
      )
      .then((d) => {
        me.apiInfoDetail = d.data["api_info"];
        me.apiParamsDetail = d.data["api_params"];
      });
  }
};
</script>

<style lang="scss">
// @import ""
</style>
