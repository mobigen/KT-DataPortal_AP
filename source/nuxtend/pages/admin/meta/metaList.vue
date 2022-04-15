<template lang="html">
  <div>
    <div>admin meta list</div>
    <div>
      <div class="add-button">
        <basic-button
          componentId="metaFormAddBtn"
          @click="addMeta"
          buttonCss="text-button"
          >등록</basic-button
        >
      </div>

      <basic-table
        :headerList="bizMetaList.header"
        :dataList="bizMetaList.body"
        rowKey="rowId"
        :numHeaderUse="false"
        :buttonHeaderUse="true"
        :buttonHeaderText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="viewMetaInfo"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
import BasicButton from "@/components/basic/basic-button.vue";

export default {
  name: "admin-list",
  extends: {},
  data() {
    return {
      buttonList: []
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaList"]),
    ...mapGetters("constants", ["CONSTANTS"])
  },
  components: { BasicTable, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getBizMetaList", "removeBizMeta"]),
    viewMetaInfo(rowKey) {
      this.$router.push({
        path: "/admin/meta/metaView",
        query: { metaNameId: rowKey }
      });
    },
    addMeta() {
      this.$router.push({ path: "/admin/meta/metaForm" });
    },
    editMeta(rowKey) {
      this.$router.push({
        path: "/admin/meta/metaForm",
        query: { metaNameId: rowKey }
      });
    },
    removeMeta(rowKey) {
      this.removeMeta(rowKey);
    },
    setTableBtn() {
      this.buttonList.push(this.CONSTANTS.BUTTONS.TABLE.EDIT_BTN);
      this.buttonList.push(this.CONSTANTS.BUTTONS.TABLE.DELETE_BTN);
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
    this.getBizMetaList();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
