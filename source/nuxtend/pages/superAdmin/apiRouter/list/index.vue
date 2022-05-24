<template lang="html">
  <div>
    <h3>api-router list</h3>

    <basic-table
      componentId=""
      :headerList="apiList.header"
      :dataList="apiList.body"
      rowKey="api_name"
      :useSerialNum="true"
      serialNumText="No."
      :useTableButton="true"
      :tableButtonText="this.buttonList"
      @buttonAction=""
      @columnAction=""
      :keyActionText="{
        eng_name: 'testAction01',
        show_order: 'testAction02'
      }"
      @keyAction=""
    />
  </div>
</template>

<script type="text/javascript">
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";

export default {
  name: "apiRouter-list",
  extends: {},
  props: {},
  data() {
    return {
      apiList: {},
      buttonList: {
        edit: {
          buttonType: "icon",
          buttonName: "수정",
          buttonCss: "icon-button",
          iconData: "pen-to-square"
        },
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "ban"
        }
      }
    };
  },
  computed: {},
  components: { BasicButton, BasicTable },
  watch: {},
  methods: {},
  created() {
    const me = this;
    this.$axios
      .get(this.$config.API_ROUTER_PREFIX + "/getApiList")
      .then((d) => {
        me.apiList = d.data["api_info"];
      });
  }
};
</script>

<style lang="scss">
// @import ""
</style>
