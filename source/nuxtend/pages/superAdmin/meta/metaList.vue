<template lang="html">
  <div>
    <h2>super admin metaName</h2>
    <h1>META 정보</h1>
    <div>
      <h3>simple-table</h3>

      <div class="add-button">
        <basic-button @click="addForm" buttonCss="text-button"
          >등록</basic-button
        >
      </div>

      <basic-table
        :headerList="metaNameList.header"
        :dataList="metaNameList.body"
        rowKey="name_id"
        numHeaderUse
        numHeaderText="No."
        buttonHeaderUse
        :buttonHeaderText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction="rowClick"
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
    removeObject(rowKey) {
      this.removeMetaName(rowKey);
    },
    addForm() {
      this.$router.push({ path: "/superAdmin/meta/metaForm" });
    },
    editForm(rowKey) {
      this.$router
        .push({
          path: "metaForm/" + rowKey
        })
        .catch(() => {});
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === "remove") {
        this.removeObject(rowKey);
      } else if (btnAction === "edit") {
        this.editForm(rowKey);
      }
    },
    rowClick(rowKey) {
      console.log(rowKey)
      this.$router.push({ path: "metaView", query: { metaNameId: rowKey } });

      // this.$router.push({
      //   path: `metaView`,
      //   query: {
      //     metaNameId: rowKey
      //   }
      // });
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
  margin: 10px -5px;
}
</style>
