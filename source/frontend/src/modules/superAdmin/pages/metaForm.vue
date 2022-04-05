<template lang="html">
  <div>
    metaName : {{ metaName }} changeData :
    {{ changeData }}
    <div>
      <h3>form</h3>
      <basic-form
        rowKey="name_id"
        :headerList="metaNameList.header"
        :dataObject="changeData"
        @changeData="setChangeData"
      />
    </div>

    <basic-button @click="cancel" buttonCss="text-button">취소</basic-button>

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
import BasicForm from "@/components/basic/basic-form.vue";
import BasicButton from "@/components/basic/basic-button.vue";
export default {
  name: "super-admin-metaForm",
  extends: {},
  data() {
    return {
      changeData: {}
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaNameList", "metaName"])
  },
  components: { BasicForm, BasicButton },
  watch: {
    metaName(data) {
      this.changeData = data;
    }
  },
  methods: {
    ...mapActions("bizMeta", [
      "getMetaNameList",
      "getMetaName",
      "addMetaName",
      "editMetaName"
    ]),
    addObject() {
      if (Object.keys(this.metaName).length === 0) {
        this.addMetaName(this.changeData);
        this.changeData = {};
      } else if (Object.keys(this.metaName).length !== 0) {
        this.editMetaName(this.changeData);
      }
    },
    setChangeData(data) {
      this.changeData = data;
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getMetaNameList();
    this.getMetaName(this.$route.params.rowKey);
  }
};
</script>

<style lang="scss">
// @import ""
</style>
