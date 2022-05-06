<template lang="html">
  <div>
    <h2>super admin metaMap</h2>
    <h1>META MAP 정보</h1>
    <div>
      <h3>simple-table</h3>

      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="reloadViewTable"
        >viewTableReload</basic-button
      >

      <basic-table
        componentId=""
        :headerList="headerList"
        :dataList="metaMapList.body"
        rowKey="item_id"
        :useSerialNum="false"
        serialNumText=""
        :useTableButton="false"
        :tableButtonText="{}"
        @buttonAction=""
        @columnAction=""
        :keyActionText="{ eng_name: 'keyActionTest01' }"
        @keyAction="keyClick"
      />

      <div class="edit-button">
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="editTable"
          >수정</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/aiPlatform/basic/basic-table.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "super-admin-metaMapList",
  extends: {},
  data() {
    return {
      // 임시
      headerList: [{ column_name: "kor_name" }, { column_name: "eng_name" }]
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaMapList"])
  },
  components: { BasicTable, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getMetaMapList", "viewReload"]),
    editTable() {
      this.$router.push({ path: "/superAdmin/meta/metaMapModify" });
    },
    keyClick(rowKey, keyAction) {
      alert("rowKey: " + rowKey + ",keyAction: " + keyAction);
    },
    async reloadViewTable() {
      const returnVal = await this.viewReload();
      alert(
        returnVal ? "변경된 metaname 정보로 viewTable이 재설정 됨." : "Error"
      );
    }
  },
  created() {
    this.getMetaMapList();
  }
};
</script>

<style lang="scss">
.edit-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px -5px;
}
</style>
