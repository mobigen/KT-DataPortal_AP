<template lang="html">
  <div>
    <h5>데이터 상세보기</h5>

    <div class="component">
      <h3>name tag component - wide</h3>
      <basic-name-tag
        :nameTagObject="searchDetailObject.mainProductInfo"
        @nameTagClick=""
        @dataOfInterest=""
        @dataSharing=""
        width="wide"
      >
        <template v-slot:header><div></div></template>
        <template v-slot:right-side><div></div></template>
        <template v-slot:body-top>
          <div class="body-top">
            <div>
              <basic-single-tag
                :tagName="searchDetailObject.mainProductInfo.dataType"
                previousText=""
              ></basic-single-tag>
              <basic-single-tag
                :tagName="searchDetailObject.mainProductInfo.dataLocation"
                previousText=""
              ></basic-single-tag>
              <!-- 배너 이미지 있을경우는 배너 노출 / 없을 경우 제공기관 text 노출-->
              <basic-single-tag
                :tagName="searchDetailObject.mainProductInfo.dataSource"
                previousText=""
              ></basic-single-tag>
            </div>
          </div>
        </template>
      </basic-name-tag>
    </div>

    <div class="component">
      <h3>title component</h3>
      <basic-title title="제공기관 정보" subtitle=""></basic-title>
      <h3>view table component - 2</h3>
      <basic-view-table
        :headerList="searchDetailObject.providerInfo.header"
        :dataObj="searchDetailObject.providerInfo.body"
        viewTableColumnCount="2"
      ></basic-view-table>
    </div>

    <div class="component">
      <h3>title component</h3>
      <basic-title title="데이터 정보" subtitle=""></basic-title>
      <h3>view table component 2 + 1</h3>
      <basic-view-table
        :headerList="twoRowTableHeader"
        :dataObj="searchDetailObject.dataInfo.body"
        viewTableColumnCount="2"
      ></basic-view-table>
      <basic-view-table
        :headerList="singleRowTableHeader"
        :dataObj="searchDetailObject.dataInfo.body"
        viewTableColumnCount="1"
      ></basic-view-table>
    </div>

    <div class="component">
      <h3>title component</h3>
      <basic-title
        title="본문정보"
        subtitle="관리자가 등록한 데이터 관련 본문 정보입니다."
      ></basic-title>
      <h3>textarea component</h3>
      <basic-textarea
        :inputData="searchDetailObject.mainTextInfo"
        placeholder="내용을 입력해주세요"
        :disabled="true"
        :readonly="false"
        maxlength=""
        @input="changeData"
      >
      </basic-textarea>
    </div>

    <div class="component">
      <h3>title component</h3>
      <basic-title
        title="미리보기"
        subtitle="데이터 미리보기를 제공합니다."
      ></basic-title>
      <h3>tab menu component</h3>
      <h3>button component</h3>
      <h3>basic-table</h3>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicViewTable from "@/components/aiPlatform/basic/basic-view-table.vue";
import BasicTitle from "@/components/aiPlatform/basic/basic-title.vue";
import BasicTextarea from "@/components/aiPlatform/basic/basic-textarea.vue";
import BasicNameTag from "@/components/aiPlatform/basic/basic-name-tag.vue";
import BasicSingleTag from "@/components/aiPlatform/basic/basic-single-tag.vue";

export default {
  name: "app-search-full-detail",
  extends: {},
  props: {},
  data() {
    return {
      singleRowTableHeader: [],
      twoRowTableHeader: []
    };
  },
  computed: {
    ...mapGetters("app/search/search", ["searchDetailObject"])
  },
  components: {
    BasicViewTable,
    BasicTitle,
    BasicTextarea,
    BasicNameTag,
    BasicSingleTag
  },
  watch: {},
  methods: {
    ...mapActions("app/search/search", ["getSearchDetailObject"]),
    changeData(input) {
      console.log(input);
    },
    getDataInfoHeader() {
      const dataInfoHeader = JSON.parse(
        JSON.stringify(this.searchDetailObject.dataInfo.header)
      );
      const singleRowTableHeader = [];
      const singleRowTableColumnName = ["provideUrl", "description", "keyword"];

      singleRowTableColumnName.forEach((el) => {
        const index = dataInfoHeader.findIndex(
          (item) => item.column_name === el
        );
        singleRowTableHeader.push(dataInfoHeader.splice(index, 1).shift());
      });

      this.singleRowTableHeader = singleRowTableHeader;
      this.twoRowTableHeader = dataInfoHeader;
    }
  },
  created() {
    this.getSearchDetailObject(this.$route.query.postId);
    this.getDataInfoHeader();
  }
};
</script>

<style lang="scss">
.component {
  padding: 20px;
  border: 1px solid lightgrey;
  margin: 10px;
}
</style>
