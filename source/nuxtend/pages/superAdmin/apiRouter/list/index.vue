<template lang="html">
  <div>
    <div class="component flex">
      <basic-label forProperty="">CTGRY</basic-label>
      <base-select
        labelName="CTGRY"
        :select-list="selectList"
        :selected-key="selectKey"
        :use-all-option="true"
        placeholder-text="전체"
        @changeData="changeData"
      />
    </div>

    <div class="component">
      <basic-button
        componentId="metaFormAddBtn"
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="addApiRoute"
        >등록</basic-button
      >
    </div>

    <div class="component">
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
        :keyActionText="{ API_NM: 'viewRouterInfo' }"
        @keyAction="viewRouterInfo"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BaseSelect from "@/components/aiPlatform/basic/base-select/base-select.vue";
import { mapGetters } from "vuex";

import { confirmAlert } from "@/components/aiPlatform/basic/alert/alert-default";

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
      },
      selectList: [],
      selectKey: null
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { BasicButton, BasicTable, BasicLabel, BaseSelect },
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
      const me = this;
      confirmAlert("삭제하시겠습니까?", {
        confirm: () => {
          me.$axios
            .post(me.$config.API_ROUTER_PREFIX + "/delApi?API_NM=" + rowKey)
            .then(() => {
              me.getApiList();
            });
        }
      });
    },
    viewRouterInfo(rowKey) {
      // 설정한 key action이 한개 이므로, 분기처리 하지 않는다.
      this.$router.push({
        path: "/superAdmin/apiRouter/view",
        query: { apiName: rowKey }
      });
    },
    getApiList() {
      // select box 값에 따라서 호출되는 API가 다르기 때문에 여기서 분리한다.
      let url = "/getApiList";
      if (this.selectKey && this.selectKey !== "all") {
        url = "/getCategoryApiList?CTGRY=" + this.selectKey;
      }

      const me = this;
      this.$axios.get(this.$config.API_ROUTER_PREFIX + url).then((d) => {
        me.apiList = d.data["api_info"];
      });
    },

    async getCategoryObj() {
      const me = this;
      await this.$axios
        .get(this.$config.API_ROUTER_PREFIX + "/getServerInfoList")
        .then((d) => {
          let arr = [];
          d.data["api_server_info"].forEach((el) => {
            arr.push({
              key: el.NM,
              text: el.NM
            });
          });
          me.selectList = arr;
        });
    },
    changeData({ input }) {
      this.selectKey = input;

      this.getApiList();
    }
  },
  created() {
    this.getCategoryObj();

    this.getApiList();
  }
};
</script>

<style lang="scss" scoped>
.component {
  margin: 5px 10px;
  padding: 10px;
}
.component.flex {
  display: flex;
}
.component .select {
  width: 300px;
}
// @import ""
</style>
