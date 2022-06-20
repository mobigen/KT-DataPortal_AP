<template lang="html">
  <div>
    <h2>super admin metaMap</h2>
    <h1>META MAP 정보</h1>
    <div>
      <h3>simple-table</h3>

      <basic-table
        componentId=""
        :headerList="headerList"
        :dataList="metaMapList.body"
        :headerLocale="$t('header')"
        rowKey="ITEM_ID"
        :useSerialNum="false"
        serialNumText=""
        :useTableButton="false"
        :tableButtonText="{}"
        @buttonAction=""
        @columnAction=""
        :keyActionText="{ ENG_NM: 'keyActionTest01' }"
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

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
export default {
  name: "super-admin-metaMapList",
  extends: {},
  data() {
    return {
      // 임시
      headerList: [{ column_name: "KOR_NM" }, { column_name: "ENG_NM" }]
    };
  },
  props: {},
  computed: {
    ...mapGetters("meta/bizMeta", ["metaMapList"])
  },
  components: { BasicTable, BasicButton },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", ["getMetaMapList", "viewReload"]),
    editTable() {
      this.$router.push({ path: "/superAdmin/meta/map/modify" });
    },
    keyClick(rowKey, keyAction) {
      alert("rowKey: " + rowKey + ",keyAction: " + keyAction);
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
