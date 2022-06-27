<template lang="html">
  <div>
    <h3>데이터 활용 신청내역</h3>

    <search-input-field
      :searchKeyword="searchKeyword"
      :use-recent-search="false"
      :use-inner-search="false"
      @search="searchBtnClick"
      @filterCheck=""
    ></search-input-field>

    <basic-label forProperty="">처리상태</basic-label>
    <base-select
      labelName="status"
      :select-list="selectList"
      :selected-key="selectKey"
      :use-all-option="true"
      placeholder-text="전체"
      @changeData="selectChange"
    />

    <basic-table
      componentId=""
      :headerList="requestedData.header"
      :dataList="requestedData.body"
      :headerLocale="$t('header')"
      :bodyLocale="$t('body')"
      :hideColumns="['id']"
      rowKey="id"
      :useSerialNum="false"
      serialNumText=""
      :useTableButton="false"
      :tableButtonText="{}"
      @buttonAction=""
      @columnAction=""
      :keyActionText="{}"
      @keyAction=""
    />
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import BasicTable from "@component/aiPlatform/basic/basic-table";
import BasicLabel from "@component/aiPlatform/basic/basic-label.vue";
import BaseSelect from "@component/common/atoms/base-select/base-select";
import BasicButton from "@component/aiPlatform/basic/basic-button";
import { mapActions, mapGetters } from "vuex";
import SearchInputField from "@component/common/organisms/search-input-field/search-input-field.vue";

export default {
  name: "users-requested",
  extends: {},
  props: {},
  data() {
    return {
      searchKeyword: null,
      selectKey: null,
      selectList: [
        {
          key: "P",
          text: this.$t("body.status.P")
        },
        {
          key: "U",
          text: this.$t("body.status.U")
        },
        {
          key: "E",
          text: this.$t("body.status.E")
        }
      ],
      searchParam: {}
    };
  },
  computed: {
    ...mapGetters("users/requested/requested", ["requestedData"])
  },
  components: {
    BasicLabel,
    BasicTable,
    BaseSelect,
    BasicButton,
    SearchInputField
  },
  watch: {},
  methods: {
    ...mapActions("users/requested/requested", {
      restApiRequestedData: "getRequestedData"
    }),
    selectChange({ input }) {
      this.getRequestedData("status", input);
    },
    getRequestedData(paramKey, paramValue) {
      if (paramKey !== undefined) {
        this.searchParam[paramKey] = paramValue;
      }
      this.restApiRequestedData(this.searchParam);
    },
    searchBtnClick(inputData) {
      this.getRequestedData("keyword", inputData.trim());
    }
  },
  created() {
    this.getRequestedData();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
