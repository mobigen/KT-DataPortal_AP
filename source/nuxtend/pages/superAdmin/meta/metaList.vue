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
        rowKey="name_id"
        :serialNumUse="true"
        serialNumText="No."
        :tableButtonUse="true"
        :tableButtonText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="rowClick"
        :keyActionText="{
          eng_name: 'testAction01',
          show_order: 'testAction02'
        }"
        @keyAction="testAction"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/aiPlatform/basic/basic-table.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import BasicPagination from "@/components/aiPlatform/basic/basic-pagination";

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
          iconData: "@icon/minus.svg"
        },
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "@icon/minus.svg"
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
    ...mapGetters("bizMeta", ["metaNameList"])
  },
  components: { BasicTable, BasicButton, BasicPagination },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getMetaNameList", "removeMetaName"]),
    removeObject(rowKey) {
      this.removeMetaName(rowKey);
    },
    addForm() {
      this.$router.push({ path: "/superAdmin/meta/metaForm" });
    },
    editForm(rowKey) {
      this.$router.push({
        path: "/superAdmin/meta/metaForm",
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
        path: "/superAdmin/meta/metaView",
        query: { metaNameId: rowKey }
      });
    },
    testAction(rowKey, keyAction) {
      alert("rowKey: " + rowKey + ",keyAction: " + keyAction);
    },
    getGridData() {
      this.getMetaNameList({});
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
