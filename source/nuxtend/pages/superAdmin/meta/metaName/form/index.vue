<template lang="html">
  <div>
    <div>
      <h3>form</h3>
      <meta-form
        rowKey="NM_ID"
        :labelList="metaNameDetail.header"
        :dataObject="metaNameDetail.body"
        :headerLocale="$t('header')"
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

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import MetaForm from "@component/meta/molecules/meta-form.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";

export default {
  name: "super-admin-metaForm",
  extends: {},
  data() {
    return {
      rowKey: null,
      changeData: {},
      formInputType: {
        kor_nm: "text",
        eng_nm: "text",
        show_odrg: "number",
        nm_id: "text",
        type: "radio"
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("meta/bizMeta", ["metaNameDetail"])
  },
  components: { MetaForm, BasicButton },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", [
      "getMetaNameDetail",
      "addMetaName",
      "editMetaName"
    ]),
    async addObject() {
      if (this.rowKey) {
        await this.editMetaName(this.changeData);
      } else {
        if (this.changeData.KOR_NM === "") {
          alert("KOR_NM 값을 입력해주세요");
          return;
        } else if (this.changeData.ENG_NM === "") {
          alert("ENG_NM 값을 입력해주세요.");
          return;
        }

        await this.addMetaName(this.changeData);
      }

      this.$router.push({ path: "/superAdmin/meta/metaName/list" });
    },
    setChangeData(data) {
      this.changeData = data;
    },
    cancel() {
      this.$router.push({ path: "/superAdmin/meta/metaName/list" });
    }
  },
  created() {
    this.rowKey = this.$route.query.metaNameId;

    this.getMetaNameDetail(this.rowKey);
    this.changeData = this.metaNameDetail.body;
  }
};
</script>

<style lang="scss">
.button-box {
  display: flex;
  justify-content: flex-end;
}
</style>
