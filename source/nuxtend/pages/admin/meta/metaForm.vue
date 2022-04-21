<template lang="html">
  <div>
    <div>meta-form</div>
    <div>
      <basic-table-form
        :viewDetail="bizMetaForm"
        :rowValues="bizMetaDetail"
        placeholder="내용을 입력해주세요"
        @changeData="setChangeData"
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
  name: "meta-form",
  extends: {},
  data() {
    return {
      rowKey: {},
      changeData: {}
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaForm"]),
    bizMetaDetail() {
      const vuexData = this.$store.getters["bizMeta/bizMetaDetail"];
      if (
        Object.prototype.hasOwnProperty.call(vuexData, "body") &&
        vuexData.body.length > 0
      ) {
        return vuexData.body.find(() => true); // find first object
      } else {
        return {};
      }
    }
  },
  components: { BasicTableForm, BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", [
      "getBizMetaForm",
      "getBizMetaDetail",
      "addBizMeta",
      "editBizMeta"
    ]),
    cancel() {
      this.$router.push({ path: "/admin/meta/metaList" });
    },
    async addObject() {
      const dataList = this.setDataList();

      if (this.rowKey) {
        await this.editBizMeta({ rowKey: this.rowKey, dataList: dataList });
      } else {
        await this.addBizMeta(dataList);
      }

      this.$router.push({ path: "/admin/meta/metaList" });
    },
    setDataList() {
      let dataList = [];
      const obj = this.changeData;

      for (var key in obj) {
        let setObj = {};
        setObj.itemId = key;
        setObj.itemVal = obj[key];

        dataList.push(setObj);
      }

      return dataList;
    },
    setChangeData(data) {
      this.changeData = data;
    }
  },
  created() {
    this.rowKey = this.$route.query.metaNameId;

    this.getBizMetaForm();

    this.getBizMetaDetail(this.rowKey);
  }
};
</script>

<style lang="scss">
// @import ""
</style>
