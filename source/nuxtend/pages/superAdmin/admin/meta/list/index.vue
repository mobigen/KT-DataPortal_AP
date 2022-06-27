<template lang="html">
  <div>
    <div>admin meta list</div>
    <div>
      <div class="add-button">
        <basic-button
          componentId="metaFormAddBtn"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addMeta"
          >등록</basic-button
        >
      </div>

      <basic-table
        componentId=""
        :headerList="bizMetaList.header"
        :dataList="bizMetaList.body"
        :headerLocale="$t('header')"
        :hideColumns="['BIZ_DATASET_ID']"
        rowKey="BIZ_DATASET_ID"
        :useSerialNum="false"
        serialNumText=""
        :useTableButton="true"
        :tableButtonText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="viewMetaInfo"
        :keyActionText="{}"
        @keyAction=""
      />
    </div>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";

export default {
  name: "admin-list",
  extends: {},
  data() {
    return {
      buttonList: {}
    };
  },
  props: {},
  computed: {
    ...mapGetters("meta/bizMeta", ["bizMetaList"]),
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { BasicTable, BasicButton },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", ["getBizMetaList", "removeBizMeta"]),
    viewMetaInfo(rowKey) {
      this.$router.push({
        path: "/superAdmin/admin/meta/view",
        query: { datasetId: rowKey }
      });
    },
    addMeta() {
      this.$router.push({ path: "/superAdmin/admin/meta/form" });
    },
    editMeta(rowKey) {
      this.$router.push({
        path: "/superAdmin/admin/meta/form",
        query: { datasetId: rowKey }
      });
    },
    removeMeta(rowKey) {
      this.removeBizMeta(rowKey);
    },
    setTableBtn() {
      Object.assign(this.buttonList, this.CONSTANTS.BUTTONS.TABLE.EDIT_BTN);
      Object.assign(this.buttonList, this.CONSTANTS.BUTTONS.TABLE.DELETE_BTN);
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === this.CONSTANTS.BUTTONS.ACTION_NAME.EDIT) {
        this.editMeta(rowKey);
      } else if (btnAction === this.CONSTANTS.BUTTONS.ACTION_NAME.REMOVE) {
        this.removeMeta(rowKey);
      }
    }
  },
  created() {
    this.setTableBtn();
  },
  mounted() {
    this.getBizMetaList();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
