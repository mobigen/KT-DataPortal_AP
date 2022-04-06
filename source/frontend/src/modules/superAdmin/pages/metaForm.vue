<template lang="html">
  <div>
    <div>
      <h3>form</h3>
      <basic-form
        rowKey="name_id"
        :headerList="metaNameList.header"
        :dataObject="metaName"
        @changeData="setChangeData"
      />
    </div>

    <div class="button-box">
      <basic-button @click="cancel" buttonCss="text-button">취소</basic-button>

      <basic-button
        componentId="metaName1"
        @click="addObject"
        buttonCss="text-button"
        >저장</basic-button
      >
    </div>
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
  watch: {},
  methods: {
    ...mapActions("bizMeta", [
      "getMetaNameList",
      "getMetaName",
      "addMetaName",
      "editMetaName"
    ]),
    async addObject() {
      if (Object.keys(this.metaName).length === 0) {
        await this.addMetaName(this.changeData);
        this.changeData = {};
      } else if (Object.keys(this.metaName).length !== 0) {
        await this.editMetaName(this.changeData);
      }

      this.$router.push({ path: "/superAdmin/meta/metaList" });
    },
    setChangeData(data) {
      this.changeData = data;
    },
    cancel() {
      this.$router.go(-1);
    },
    radioButtonList() {
      const values = [
        { value: "rb1", label: "radio 1" },
        { value: "rb2", label: "radio 2" },
        { value: "rb3", label: "radio 3" },
        { value: "rb4", label: "radio 4" },
        { value: "rb5", label: "radio 5" },
        { value: "rb6", label: "radio 6" }
      ];
      return values;
    }
  },
  created() {
    this.getMetaNameList();
    this.getMetaName(this.$route.params.rowKey);
  }
};
</script>

<style lang="scss">
.button-box {
  display: flex;
  justify-content: flex-end;
}
</style>
