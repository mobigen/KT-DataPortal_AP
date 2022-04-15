<template lang="html">
  <div>
    <div>
      <h3>form</h3>
      <meta-form
        rowKey="name_id"
        :headerList="metaNameList.header"
        :dataObject="metaName"
        :formInputType="formInputType"
        @changeData="setChangeData"
        placeholder="내용을 입력해주세요"
      />
    </div>

    <div class="button-box">
      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="cancel"
        >취소</basic-button
      >

      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="addObject"
        >저장</basic-button
      >
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import MetaForm from "@/components/meta/meta-form.vue";
import BasicButton from "@/components/basic/basic-button.vue";

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
        type: "radio"
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaNameList", "metaName"])
  },
  components: { MetaForm, BasicButton },
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
        this.changeData = {};
      }

      this.$router.push({ path: "/superAdmin/meta/metaList" });
    },
    setChangeData(data) {
      this.changeData = data;
    },
    cancel() {
      this.$router.push({ path: "/superAdmin/meta/metaList" });
    }
  },
  created() {
    this.rowKey = this.$route.query.metaNameId;
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
