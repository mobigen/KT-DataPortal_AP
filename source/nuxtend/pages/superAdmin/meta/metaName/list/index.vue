<template lang="html">
  <div>
    <h2>super admin metaName</h2>
    <h1>META 정보</h1>
    <div>
      <h3>simple-table</h3>

      <div class="add-button">
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addForm"
          >등록</basic-button
        >
      </div>

      <basic-table
        componentId=""
        :headerList="metaNameList.header"
        :dataList="metaNameList.body"
        :headerLocale="$t('header')"
        rowKey="NM_ID"
        :useSerialNum="true"
        serialNumText="No."
        :useTableButton="true"
        :tableButtonText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="rowClick"
        :keyActionText="{
          ENG_NM: 'testAction01',
          SHOW_ODRG: 'testAction02'
        }"
        @keyAction="testAction"
      />

      <basic-pagination
        :paging-key="paginationKey"
        :paging-object="{
          [CONSTANTS.PAGING.ITEMS_PER_PAGE]: 5,
          [CONSTANTS.PAGING.VISIBLE_PAGES]: 3,
          [CONSTANTS.PAGING.PAGE]: 1
        }"
        @pagingEvent="getGridData"
        :show-test-table="false"
      />
    </div>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";

export default {
  name: "super-admin-metaList",
  extends: {},
  data() {
    return {
      paginationKey: "bizMetaPagination",
      buttonList: {
        edit: {
          buttonType: "icon",
          buttonName: "수정",
          buttonCss: "icon-button",
          iconData: "pen"
        },
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "minus"
        }
        /*
        sample : buttonType : text
        sample: {
          buttonType: "text",
          buttonName: "설정",
          buttonCss: "text-button",
          textData: ["선택취소", "선택"],
          selectButtonList: []
        } */
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("meta/bizMeta", ["metaNameList"])
  },
  components: { BasicTable, BasicButton, BasicPagination },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", ["getMetaNameList", "removeMetaName"]),
    removeObject(rowKey) {
      this.removeMetaName(rowKey);
    },
    addForm() {
      this.$router.push({ path: "/superAdmin/meta/metaName/form" });
    },
    editForm(rowKey) {
      this.$router.push({
        path: "/superAdmin/meta/metaName/form",
        query: { metaNameId: rowKey }
      });
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === "remove") {
        if (confirm("삭제 하시겠습니까?")) {
          this.removeObject(rowKey);
        }
      } else if (btnAction === "edit") {
        this.editForm(rowKey);
      }
    },
    rowClick(rowKey) {
      this.$router.push({
        path: "/superAdmin/meta/metaName/view",
        query: { metaNameId: rowKey }
      });
    },
    testAction(rowKey, keyAction) {
      alert("rowKey: " + rowKey + ",keyAction: " + keyAction);
    },
    getGridData() {
      this.getMetaNameList({
        paginationKey: this.paginationKey
      });
    }
  },
  created() {},
  mounted() {
    this.getGridData();
  }
};
</script>

<style lang="scss">
.add-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px -5px;
}
</style>
