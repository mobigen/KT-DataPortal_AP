<template lang="html">
  <div>
    <h3>api-router list</h3>

    <basic-button
      componentId="metaFormAddBtn"
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="addApiRoute"
      >등록</basic-button
    >

    <basic-table
      componentId=""
      :headerList="apiList.header"
      :dataList="apiList.body"
      rowKey="API_NM"
      :useSerialNum="true"
      serialNumText="No."
      :useTableButton="true"
      :tableButtonText="this.buttonList"
      @buttonAction="tableButtonClick"
      @columnAction=""
      :keyActionText="{ api_name: 'viewRouterInfo' }"
      @keyAction="viewRouterInfo"
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
        // edit: {
        //   buttonType: "icon",
        //   buttonName: "수정",
        //   buttonCss: "icon-button",
        //   iconData: "pen-to-square"
        // },
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
  methods: {
    addApiRoute() {
      this.$router.push({ path: "/superAdmin/apiRouter/form" });
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === "edit") {
        // edit form으로 이동
        this.$router.push({
          path: "/superAdmin/apiRouter/form",
          query: { apiName: rowKey }
        });
      } else if (btnAction === "remove") {
        // alert modal로 한번 더 확인 필요.
        this.removeBizMeta(rowKey);
      }
    },
    removeBizMeta(rowKey) {
      this.$axios
        .post(this.$config.API_ROUTER_PREFIX + "/delApi", {
          params: { api_name: rowKey }
        })
        .then((d) => {
          console.log(d);
        });
    },
    viewRouterInfo(rowKey) {
      // 설정한 key action이 한개 이므로, 분기처리 하지 않는다.
      this.$router.push({
        path: "/superAdmin/apiRouter/view",
        query: { apiName: rowKey }
      });
    }
  },
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
