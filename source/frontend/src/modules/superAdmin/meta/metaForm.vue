<template lang="html">
  <div>
    <div>
      <h3>form</h3>
      <meta-form
        rowKey="name_id"
        :headerList="metaNameList.header"
        :dataObject="metaName"
        @changeData="setChangeData"
        :formInputType="formInputType"
      />
    </div>

    <!-- <radio-button :radioButtonList="radioButtonList()"></radio-button> -->

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
import MetaForm from "@/components/meta/meta-form.vue";
import BasicButton from "@/components/basic/basic-button.vue";
/* import RadioButton from "@/components/basic/radio-button.vue"; */

export default {
  name: "super-admin-metaForm",
  extends: {},
  data() {
    return {
      rowKey: null,
      changeData: {},
      formInputType: {
        kor_name: "text",
        eng_name: "text",
        show_order: "number",
        name_id: "text",
        type: "number"
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaNameList", "metaName"])
  },
  components: { MetaForm, BasicButton /* RadioButton  */ },
  watch: {},
  methods: {
    ...mapActions("bizMeta", [
      "getMetaNameList",
      "getMetaName",
      "addMetaName",
      "editMetaName"
    ]),
    async addObject() {
      if (this.rowKey) {
        await this.editMetaName(this.changeData);
      } else {
        await this.addMetaName(this.changeData);
      }

      this.$router.push({ path: "metaList" });
    },
    setChangeData(data) {
      this.changeData = data;
    },
    cancel() {
      this.$router.go(-1);
    }
    /*     radioButtonList() {
      const values = [
        { value: "rb1", label: "radio 1" },
        { value: "rb2", label: "radio 2" },
        { value: "rb3", label: "radio 3" },
        { value: "rb4", label: "radio 4" },
        { value: "rb5", label: "radio 5" },
        { value: "rb6", label: "radio 6" }
      ];
      return values;
    } */
  },
  // beforeCreate() {
  //   console.log("before");
  //   this.changeData = {};
  // },
  created() {
    this.rowKey = this.$route.params.rowKey;

    this.getMetaNameList();
    this.getMetaName(this.rowKey);
  }
};
</script>

<style lang="scss">
.button-box {
  display: flex;
  justify-content: flex-end;
}
</style>
