<template lang="html">
  <div>
    <h2>super admin metaName</h2>

    <h1>META 정보</h1>
    <div>
      <h3>simple-table</h3>
      <basic-table
        componentId="metaName1"
        :headerList="metaName.header"
        :dataList="metaName.body"
        mainKey="name_id"
        numHeaderUse
        numHeaderText="No."
        buttonHeaderUse
        buttonHeaderText="삭제"
        @buttonAction="removeObject"
        @columnAction="getObject"
        keyAction="{}"
        atcionText="[]"
      />
    </div>

    <div class="add-button">
      <basic-button
        componentId="metaName1"
        @click="reset"
        buttonCss="text-button"
        >초기화</basic-button
      >
    </div>

    <div>
      <h3>form</h3>
      <basic-form />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
import BasicForm from "@/components/basic/basic-form.vue";
import BasicButton from "@/components/basic/basic-button.vue";
export default {
  name: "super-admin-metaName",
  extends: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaName"])
  },
  components: { BasicTable, BasicForm, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", [
      "getMetaNameList",
      "getMetaName",
      "addMetaName",
      "removeMetaName"
    ]),
    getObject(id, componentId) {
      if (componentId === "metaName1") {
        this.getMetaName(id);
      }
    },
    removeObject(id, componentId) {
      if (componentId === "metaName1") {
        this.removeMetaName(id);
      }
    },
    reset() {
      alert("초기화");
    },
    addObject(componentId) {
      if (componentId === "metaName1") {
        this.addMetaName("add!");
      }
    }
  },
  created() {
    this.getMetaNameList();
  }
};
</script>

<style lang="scss">
.add-button {
  margin: 10px;
}
</style>
