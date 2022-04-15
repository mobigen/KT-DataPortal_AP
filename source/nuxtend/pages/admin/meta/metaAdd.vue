<template lang="html">
  <div>
    <div>meta-add</div>
    <div>
      <basic-table-form
        :viewDetail="bizMetaForm"
        :rowValues="bizMetaDetail.body"
        placeholder="내용을 입력해주세요"
      ></basic-table-form>

      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="cancel"
        >취소</basic-button
      >

      <basic-button
        componentId="metaName1"
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
import BasicTableForm from "@/components/basic/basic-table-form";
import BasicButton from "@/components/basic/basic-button.vue";

export default {
  name: "meta-add",
  extends: {},
  data() {
    return {
      rowKey: {}
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaForm", "bizMetaDetail"])
  },
  components: { BasicTableForm, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getBizMetaForm", "getBizMetaDetail"]),
    cancel() {
      this.$router.go(-1);
    },
    addObject() {
      if (this.rowKey) {
        console.log("update");
      } else {
        console.log("insert");
      }
    }
  },
  created() {
    this.rowKey = this.$route.params.rowKey;

    this.getBizMetaForm();
    // rowKey가 있으면 '수정' 모드 이기 때문에 기존 데이터를 조회한다.
    if (this.rowKey) {
      this.getBizMetaDetail(this.rowKey);
    }
  }
};
</script>

<style lang="scss">
// @import ""
</style>
