<template lang="html">
  <div>
    <h2>super admin metaMap</h2>
    <h1>META MAP 정보</h1>
    <div>
      <h3>simple-table</h3>

      <basic-table
        :headerList="headerList"
        :dataList="metaMapList.body"
        rowKey="item_id"
        :keyActionText="{ eng_name: 'keyActionTest01' }"
        @keyAction="keyClick"
      />

      <div class="edit-button">
        <basic-button @click="editTable" buttonCss="text-button"
          >수정</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
import BasicButton from "@/components/basic/basic-button.vue";
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
    ...mapActions("bizMeta", ["getMetaMapList"]),
    editTable() {
      this.$router.push({ path: "/superAdmin/meta/metaMapModify" });
    },
    keyClick(keyAction) {
      alert(keyAction);
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
