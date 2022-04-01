<template lang="html">
  <div>
    <h2>super admin metaName</h2>
    metaName : {{ metaName }} changeData : {{ changeData }}
    <h1>META 정보</h1>
    <div>
      <h3>simple-table</h3>
      <basic-table
        componentId="metaName1"
        :headerList="metaNameList.header"
        :dataList="metaNameList.body"
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
      <basic-form
        mainKey="name_id"
        :headerList="metaNameList.header"
        :dataObject="changeData"
        @changeData="setChangeData"
      />
    </div>

    <basic-button
      componentId="metaName1"
      @click="addObject"
      buttonCss="text-button"
      >저장</basic-button
    >
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
    return {
      changeData: {}
    };
  },
  props: {},
  computed: {
    ...mapGetters("metaName", ["metaNameList"]),
    ...mapGetters("metaName", ["metaName"])
  },
  components: { BasicTable, BasicForm, BasicButton },
  watch: {
    metaName(data) {
      this.changeData = data;
    }
  },
  methods: {
    ...mapActions("metaName", [
      "getMetaNameList",
      "getMetaName",
      "addMetaName",
      "removeMetaName",
      "editMetaName"
    ]),
    getObject(key, componentId) {
      if (componentId === "metaName1") {
        this.getMetaName(key);
      }
    },
    removeObject(key, componentId) {
      if (componentId === "metaName1") {
        this.removeMetaName(key);
      }
    },
    reset() {
      this.changeData = {};
    },
    addObject(componentId) {
      if (
        componentId === "metaName1" &&
        Object.keys(this.metaName).length === 0
      ) {
        this.addMetaName(this.changeData);
      } else if (
        componentId === "metaName1" &&
        Object.keys(this.metaName).length !== 0
      ) {
        this.editMetaName(this.changeData);
      }
    },
    setChangeData(data) {
      this.changeData = data;
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
