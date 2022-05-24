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
        :headerList="twoColumnTableHeader"
        :dataObj="searchDetailObject.dataInfo.body"
        viewTableColumnCount="2"
      ></basic-view-table>
      <basic-view-table
        :headerList="singleColumnTableHeader"
        :dataObj="searchDetailObject.dataInfo.body"
        viewTableColumnCount="1"
        :useTagList="true"
        tagPreviousText="#"
        :tagCursorPointer="false"
        @tagClick=""
        :useSeparator="false"
        separator=","
      ></basic-view-table>
    </div>

    <div class="component">
      <basic-tab-menu :menuList="tabMenuList" @tabMenuClick="tabMenuClick">
      </basic-tab-menu>
    </div>

    <template v-if="currentTabMenuId === 1">
      <div class="component">
        <basic-title title="샘플데이터 미리보기" subtitle=""></basic-title>
        <basic-table
          :headerList="getSampleData().detail.header"
          :dataList="getSampleData().detail.body"
        >
        </basic-table>
      </div>

      <div class="component">
        <h3>title component</h3>
        <basic-title
          title="파일데이터"
          subtitle="파일 데이터 미리보기 및 분석서비스를 제공합니다."
        ></basic-title>
        <h3>accordion component</h3>
        <basic-accordion-table
          componentId=""
          rowKey="id"
          :headerList="[]"
          :dataList="fileData"
          :useButtonEvent="true"
          :multipleActive="false"
        >
          <template v-slot:titleItem="{ rowKey }">
            <basic-button @click="download(rowKey)">
              <fa icon="download"></fa>
            </basic-button>
          </template>
          <template v-slot:detail="{ detail }">
            <basic-table
              :headerList="detail.header"
              :dataList="detail.body"
            ></basic-table>
          </template>
        </basic-accordion-table>
      </div>
    </template>

    <template v-else-if="currentTabMenuId === 2">
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
    </template>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table.vue";
import BasicTitle from "@component/aiPlatform/basic/basic-title.vue";
import BasicTextarea from "@component/aiPlatform/basic/basic-textarea.vue";
import BasicNameTag from "@component/aiPlatform/basic/basic-name-tag.vue";
import BasicSingleTag from "@component/aiPlatform/basic/basic-single-tag.vue";
import BasicAccordionTable from "@component/aiPlatform/basic/basic-accordion-table.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import BasicTable from "@/components/aiPlatform/basic/basic-table.vue";
import BasicTabMenu from "@/components/aiPlatform/basic/basic-tab-menu.vue";

export default {
  name: "app-search-full-detail",
  extends: {},
  props: {},
  data() {
    return {
      tabMenuList: [
        { menuId: 1, menuName: "데이터 목록/샘플", numberOfPosts: null },
        { menuId: 2, menuName: "데이터 본문 정보", numberOfPosts: null }
      ],
      currentTabMenuId: 1,
      singleColumnTableHeader: [],
      twoColumnTableHeader: []
    };
  },
  computed: {
    ...mapGetters("meta/search/search", ["searchDetailObject", "fileData"])
  },
  components: {
    BasicViewTable,
    BasicTitle,
    BasicTextarea,
    BasicNameTag,
    BasicSingleTag,
    BasicAccordionTable,
    BasicButton,
    BasicTable,
    BasicTabMenu
  },
  watch: {},
  methods: {
    ...mapActions("meta/search/search", [
      "getSearchDetailObject",
      "getFileData"
    ]),
    changeData(input) {
      console.log(input);
    },
    getDataInfoHeader() {
      const dataInfoHeader = JSON.parse(
        JSON.stringify(this.searchDetailObject.dataInfo.header)
      );
      const singleColumnTableHeader = [];
      const singleColumnTableColumnName = [
        "provideUrl",
        "description",
        "keyword"
      ];

      singleColumnTableColumnName.forEach((el) => {
        const index = dataInfoHeader.findIndex(
          (item) => item.column_name === el
        );
        singleColumnTableHeader.push(dataInfoHeader.splice(index, 1).shift());
      });

      this.singleColumnTableHeader = singleColumnTableHeader;
      this.twoColumnTableHeader = dataInfoHeader;
    },
    download(rowKey) {
      alert(rowKey + " 다운로드");
    },
    tabMenuClick(menuId) {
      this.currentTabMenuId = menuId;
    },
    getSampleData() {
      return this.fileData.find((element) => element !== undefined);
    }
  },
  created() {
    this.getSearchDetailObject(this.$route.query.postId);
    this.getDataInfoHeader();
    this.getFileData(this.$route.query.postId);
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
