<template lang="html">
  <div>
    <div>
      <basic-viewTable
        :useTableHead="false"
        :viewDetail="apiInfoDetail"
        :hide-columns="hideColumns"
      />

      <div v-show="!hideColumns.includes(CONSTANTS.API_ROUTER.PARAM.PARAMS)">
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
          :hide-columns="paramHideColumns"
        />
      </div>

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
import { mapGetters } from "vuex";

export default {
  name: "apiRouter-view",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      apiInfoDetail: {},
      apiParamsDetail: {},
      hideColumns: [],
      paramHideColumns: ["API_NM"]
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { BasicButton, BasicViewTable, BasicTable },
  watch: {
    apiInfoDetail() {
      const row = this.apiInfoDetail.body[0];
      const MODE = row[this.CONSTANTS.API_ROUTER.PARAM.MODE];
      if (MODE === this.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING) {
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.URL);
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.METH);
      } else {
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.CMD);
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.PARAMS);
      }

      this.hideColumns = JSON.parse(JSON.stringify(this.hideColumns));
    }
  },
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
          "/getApi?API_NM=" +
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
