<template>
  <div class="sample">
    <!--    <h3>샘플 Grid + pagination</h3>-->

    <!--    <div class="NOTY">-->
    <!--      <p>grid.vue</p>-->
    <!--      <p>basic-table.vue : list</p>-->
    <!--      <p>basic-pagination.vue : pagination</p>-->
    <!--      <p>sample.js : vuex</p>-->
    <!--    </div>-->

    <basic-table
      componentId=""
      :headerList="metaNameList.header"
      :dataList="metaNameList.body"
      rowKey="name_id"
      :serialNumUse="false"
      serialNumText="No."
      :tableButtonUse="false"
      :tableButtonText="{}"
      @buttonAction="tableButtonClick"
      @columnAction="rowClick"
      :keyActionText="{
        eng_name: 'testAction01',
        show_order: 'testAction02'
      }"
      @keyAction="testAction"
    />

    <basic-pagination
      :paging-key="paginationKey"
      :paging-object="{
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: 5,
        [CONSTANTS.PAGING.VISIBLE_PAGES]: 3,
        [CONSTANTS.PAGING.PAGE]: 1
      }"
      @pagingEvent="getGridData"
      :show-test-table="false"
    />
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@component/aiPlatform/basic/basic-table";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";

export default {
  name: "sample-grid-pagination",
  extends: {},
  props: {},
  data() {
    return {
      paginationKey: "samplePagination",
      buttonList: {
        // sample 용이며, 여기서는 사용하지 않음.
        // edit: {
        //   buttonType: "icon",
        //   buttonName: "수정",
        //   buttonCss: "icon-button",
        //   iconData: "@icon/minus.svg"
        // },
        // remove: {
        //   buttonType: "icon",
        //   buttonName: "삭제",
        //   buttonCss: "icon-button",
        //   iconData: "@icon/minus.svg"
        // }
      }
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("sample/sample", ["metaNameList"])
  },
  components: { BasicTable, BasicPagination },
  watch: {},
  methods: {
    ...mapActions("sample/sample", ["getMetaNameList"]),

    /**
     * grid default methods
     */
    tableButtonClick() {},
    rowClick() {},
    testAction(rowKey, keyAction) {},
    /**
     * // grid default methods
     */
    getGridData() {
      this.getMetaNameList({
        paginationKey: this.paginationKey
      });
    }
  },
  mounted() {
    this.getGridData();
  }
};
</script>

<style lang="scss" scoped>
div.noty {
  margin: 20px;
}
.hidden {
  display: none;
}
.sample {
  margin: 10px;
}
</style>
