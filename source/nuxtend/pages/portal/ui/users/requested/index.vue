<template lang="html">
  <div>
    <h5>데이터 활용 신청내역</h5>

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
import basicTable from "@component/aiPlatform/basic/basic-table";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "users-requested",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("users/requested/requested", ["requestedData"])
  },
  components: {
    basicTable
  },
  watch: {},
  methods: {
    ...mapActions("users/requested/requested", ["getRequestedData"])
  },
  created() {
    this.getRequestedData();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
