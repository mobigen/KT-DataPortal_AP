<template lang="html">
  <div>
    <h5>데이터 활용 신청내역</h5>

    <basic-label forProperty="">처리상태</basic-label>
    <base-select
      labelName="status"
      :select-list="selectList"
      :selected-key="selectKey"
      :use-all-option="true"
      placeholder-text="전체"
      @changeData="changeData"
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

export default {
  name: "users-requested",
  extends: {},
  props: {},
  data() {
    return {
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
      ]
    };
  },
  computed: {
    ...mapGetters("users/requested/requested", ["requestedData"])
  },
  components: {
    BasicLabel,
    BasicTable,
    BaseSelect,
    BasicButton
  },
  watch: {},
  methods: {
    ...mapActions("users/requested/requested", {
      restApiRequestedData: "getRequestedData"
    }),
    changeData({ input }) {
      this.selectKey = input;
      this.getRequestedData();
    },
    getRequestedData() {
      let params = {};
      params["status"] = this.selectKey;
      this.restApiRequestedData(params);
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
