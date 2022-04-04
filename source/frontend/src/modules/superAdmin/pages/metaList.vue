<template lang="html">
  <div>
    <h2>super admin metaName</h2>
    <h1>META 정보</h1>
    <div>
      <h3>simple-table</h3>

      <div class="add-button">
        <basic-button
          componentId="metaName1"
          @click="addForm"
          buttonCss="text-button"
          >등록</basic-button
        >
      </div>

      <basic-table
        componentId="metaName1"
        :headerList="metaNameList.header"
        :dataList="metaNameList.body"
        rowKey="name_id"
        numHeaderUse
        numHeaderText="No."
        buttonHeaderUse
        :buttonHeaderText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="detailObject"
        keyAction="{}"
        atcionText="[]"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
import BasicButton from "@/components/basic/basic-button.vue";
export default {
  name: "super-admin-metaList",
  extends: {},
  data() {
    return {
      buttonList: [
        {
          buttonName: "수정",
          buttonCss: "icon-button",
          iconData: "@icon/minus.svg",
          buttonAction: "edit"
        },
        {
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "@icon/minus.svg",
          buttonAction: "remove"
        }
      ]
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaNameList"])
  },
  components: { BasicTable, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getMetaNameList", "removeMetaName"]),
    removeObject(rowKey, componentId) {
      if (componentId === "metaName1") {
        this.removeMetaName(rowKey);
      }
    },
    addForm(componentId) {
      if (componentId === "metaName1") {
        alert("metaName 등록");
        this.$router.push({ path: "/superAdmin/meta/metaForm" });
      }
    },
    editForm(rowKey, componentid) {
      alert("수정");
      if (componentid === "metaName1") {
        this.$router
          .push({
            path: "/superAdmin/meta/metaForm/" + rowKey
          })
          .catch(() => {});
      }
    },
    tableButtonClick(rowKey, componentId, btnAction) {
      if (btnAction === "remove") {
        this.removeObject(rowKey, componentId);
      } else if (btnAction === "edit") {
        this.editForm(rowKey, componentId);
      }
    },
    detailObject(rowKey, componentId) {
      console.log("rowKey : " + rowKey + ", componentId : " + componentId);
    }
  },
  created() {
    this.getMetaNameList();
  }
};
</script>

<style lang="scss">
.add-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
}
</style>
