<template>
  <div>
    <h3>샘플 Grid + pagination</h3>

    <div class="noty">
      <h5>NOTY</h5>
      <p>
        * ROOT Component 에서 list 목록 조회를 할때는 'mounted'를
        이용해야합니다.
      </p>
    </div>

    <basic-table
      componentId=""
      :headerList="metaNameList.header"
      :dataList="metaNameList.body"
      rowKey="name_id"
      :serialNumUse="false"
      serialNumText="No."
      :tableButtonUse="true"
      :tableButtonText="this.buttonList"
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
    />
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/aiPlatform/basic/basic-table";
import BasicButton from "@/components/aiPlatform/basic/basic-button";
import BasicPagination from "@/components/aiPlatform/basic/basic-pagination";

export default {
  name: "sample-grid-pagination",
  extends: {},
  props: {},
  data() {
    return {
      paginationKey: "samplePagination",
      currentPage: 0,
      buttonList: {
        edit: {
          buttonType: "icon",
          buttonName: "수정",
          buttonCss: "icon-button",
          iconData: "@icon/minus.svg"
        },
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "@icon/minus.svg"
        }
      }
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("sample/sample", ["metaNameList"])
  },
  components: { BasicTable, BasicButton, BasicPagination },
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
    getGridData(param) {
      if (param.page) {
        this.currentPage = param.page;
      }

      this.getMetaNameList({
        paginationKey: this.paginationKey
      });
    }
  },
  created() {},
  mounted() {
    this.getGridData({});
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
</style>
