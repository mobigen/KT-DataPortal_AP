<template lang="html">
  <div>
    <div>
      <view-table
        :colgroup-array="['300px', 'auto']"
        table-title=""
        :header-has-locale="false"
        :view-detail="apiInfoDetail"
        :header-locale="$t('header')"
        :td-cnt-in-tr="1"
        :td-colspan="2"
        :view-header-list="[
          this.CONSTANTS.API_ROUTER.PARAM.NO,
          this.CONSTANTS.API_ROUTER.PARAM.API_NM,
          this.CONSTANTS.API_ROUTER.PARAM.CTGRY,
          this.CONSTANTS.API_ROUTER.PARAM.ROUTE_URL,
          this.CONSTANTS.API_ROUTER.PARAM.URL,
          this.CONSTANTS.API_ROUTER.PARAM.METH,
          this.CONSTANTS.API_ROUTER.PARAM.CMD,
          this.CONSTANTS.API_ROUTER.PARAM.MODE
        ]"
        :hide-columns="hideColumns"
      />

      <div
        class="param-table"
        v-show="!hideColumns.includes(CONSTANTS.API_ROUTER.PARAM.PARAMS)"
      >
        <div>{{ $t("header." + CONSTANTS.API_ROUTER.PARAM.PARAMS) }}</div>
        <basic-table
          componentId=""
          :headerList="apiParamsDetail.header"
          :dataList="apiParamsDetail.body"
          :headerLocale="$t('param_header')"
          :rowKey="CONSTANTS.API_ROUTER.PARAM.API_NM"
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

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import BasicButton from "@common/atoms/basic-button.vue";
import BasicTable from "@common/atoms/basic-table.vue";
import { mapGetters } from "vuex";
import ViewTable from "@common/organisms/view-table/view-table";

export default {
  name: "apiRouter-view",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      apiInfoDetail: {},
      apiParamsDetail: {},
      hideColumns: []
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    paramHideColumns() {
      return [this.CONSTANTS.API_ROUTER.PARAM.API_NM];
    }
  },
  components: { BasicButton, BasicTable, ViewTable },
  watch: {
    apiInfoDetail() {
      // view table에서 숨길 column 선택
      const row = this.apiInfoDetail.body[0];
      const MODE = row[this.CONSTANTS.API_ROUTER.PARAM.MODE];
      if (MODE === this.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING) {
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.CMD);
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.PARAMS);
      } else {
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.URL);
        this.hideColumns.push(this.CONSTANTS.API_ROUTER.PARAM.METH);
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
          "/getApi?" +
          this.CONSTANTS.API_ROUTER.PARAM.API_NM +
          "=" +
          this.$route.query.apiName
      )
      .then((d) => {
        me.apiInfoDetail = d.data[this.CONSTANTS.API_ROUTER.PARAM.API_INFO];
        me.apiParamsDetail = d.data[this.CONSTANTS.API_ROUTER.PARAM.API_PARAMS];
      });
  }
};
</script>

<style lang="scss">
// @import ""
.param-table {
  margin: 20px 0;
}
.param-table tr {
  height: 30px;
}
.param-table th,
td {
  padding: 5px;
}
.add-button {
  margin: 20px 0;
}
</style>
