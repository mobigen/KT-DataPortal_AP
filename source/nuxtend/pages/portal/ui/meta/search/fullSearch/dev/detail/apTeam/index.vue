<template lang="html">
  <div>
    <h5>데이터 상세보기</h5>

    <div style="display: flex; justify-content: space-between">
      <basic-menu
        :menuList="menuList"
        :useSeparator="true"
        separator=">"
        :textPreviousIcon="[]"
        :textNextIcon="[]"
      ></basic-menu>
      <div style="display: flex">
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="request"
          >요청
        </basic-button>
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="urlCopy"
          >URL 복사
        </basic-button>
        <basic-button
          componentId=""
          buttonCss="icon-button"
          :underline="false"
          :hoverColor="false"
          @click="dataSharing"
        >
          <fa icon="share-nodes" />
        </basic-button>
        <basic-button
          componentId=""
          buttonCss="icon-button"
          :underline="false"
          :hoverColor="false"
          @click="dataOfInterest"
        >
          <fa icon="bookmark" />
        </basic-button>
      </div>
    </div>

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
                :cursorPointer="false"
              ></basic-single-tag>
              <basic-single-tag
                :tagName="searchDetailObject.mainProductInfo.dataLocation"
                previousText=""
                :cursorPointer="false"
              ></basic-single-tag>
              <!-- 배너 이미지 있을경우는 배너 노출 / 없을 경우 제공기관 text 노출-->
              <basic-single-tag
                :tagName="searchDetailObject.mainProductInfo.dataSource"
                previousText=""
                :cursorPointer="false"
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
        :useTagList="false"
        tagPreviousText=""
        @tagClick=""
        :tagCursorPointer="false"
        :useSeparator="false"
        separator=""
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
        :useTagList="false"
        tagPreviousText=""
        :tagCursorPointer="false"
        @tagClick=""
        :useSeparator="false"
        separator=""
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
          componentId=""
          :useHeader="true"
          :headerList="getSampleData().detail.header"
          :dataList="getSampleData().detail.body"
          rowKey="id"
          :useSerialNum="false"
          serialNumText=""
          :useTableButton="false"
          :tableButtonText="{}"
          @buttonAction=""
          @columnAction=""
          :keyActionText="{}"
          @keyAction=""
        >
        </basic-table>
      </div>

      <div class="component">
        <h3>title component</h3>
        <div style="display: flex; justify-content: space-between">
          <basic-title
            title="파일데이터"
            subtitle="파일 데이터 미리보기 및 분석서비스를 제공합니다."
          ></basic-title>
          <div style="display: flex">
            <basic-button
              componentId=""
              buttonCss="text-button"
              :underline="false"
              :hoverColor="false"
              @click="analyze"
              >바로 분석하기</basic-button
            >
            <basic-button
              componentId=""
              buttonCss="text-button"
              :underline="false"
              :hoverColor="false"
              @click="fullDownload"
              >파일 전체 다운로드</basic-button
            >
          </div>
        </div>
        <p style="text-align: end; color: blue">
          ※ 파일 데이터의 일부 내용을 미리보기로 제공합니다. 전체 내용이 필요한
          경우 해당 파일을 다운로드 받으시길 바랍니다.
        </p>
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
            <basic-button
              componentId=""
              buttonCss="icon-button"
              :underline="false"
              :hoverColor="false"
              @click="download(rowKey)"
            >
              <fa icon="download"></fa>
            </basic-button>
          </template>
          <template v-slot:detail="{ rowKey, detail }">
            <basic-table
              componentId=""
              :useHeader="true"
              :headerList="detail.header"
              :dataList="detail.body"
              rowKey="id"
              :useSerialNum="false"
              serialNumText=""
              :useTableButton="false"
              :tableButtonText="{}"
              @buttonAction=""
              @columnAction=""
              :keyActionText="{}"
              @keyAction=""
            ></basic-table>
          </template>
        </basic-accordion-table>
      </div>

      <div class="component">
        <basic-title title="데이터 활용사례" subtitle=""></basic-title>
        <basic-table
          componentId=""
          :useHeader="false"
          :headerList="dataUseCases.header"
          :dataList="dataUseCases.body"
          rowKey="id"
          :useSerialNum="false"
          serialNumText=""
          :useTableButton="true"
          :tableButtonText="buttonList"
          :useTagList="true"
          @buttonAction="rowClick"
          @columnAction="rowClick"
          :keyActionText="{}"
          @keyAction=""
        >
        </basic-table>
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
          labelName="mainTextInfo"
          placeholder="내용을 입력해주세요"
          :disabled="true"
          :readonly="false"
          maxlength=""
          @input="changeData"
        >
        </basic-textarea>
      </div>

      <div class="component">
        <basic-title title="추천데이터" subtitle=""></basic-title>
        <name-tag-list
          :nameTagList="recommendData"
          width="narrow"
          :nameTagColumnCount="5"
        >
          <template v-slot:header><div></div></template>
          <template v-slot:body-top><div></div></template>
          <template v-slot:body-middle>
            <div class="img">
              <span>img</span>
            </div>
          </template>
          <template v-slot:body-bottom><div></div></template>
          <template v-slot:footer><div></div></template>
          <template v-slot:left-side><div></div></template>
          <template v-slot:right-side><div></div></template>
        </name-tag-list>
      </div>
    </template>

    <div>
      <p style="text-align: end">*데이터에 오류가 발견되면 오류신고해 주세요</p>
      <div style="display: flex">
        <basic-button
          style="align-self: center"
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="gotoFullSearch"
          >목록</basic-button
        >
        <basic-button
          style="align-self: end"
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="errorReport"
          >품질오류신고</basic-button
        >
      </div>
    </div>
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
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicTabMenu from "@component/aiPlatform/basic/basic-tab-menu.vue";
import BasicMenu from "@component/aiPlatform/basic/basic-menu.vue";
import NameTagList from "@component/aiPlatform/basic/name-tag-list";

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
      menuList: [
        { menuName: "홈", url: "/portal/ui/users/login" },
        { menuName: "데이터 검색", url: "/app/search/fullSearch" },
        { menuName: "통합검색", url: "/app/search/mapSearch" }
      ],
      currentTabMenuId: 1,
      singleColumnTableHeader: [],
      twoColumnTableHeader: [],
      buttonList: {
        edit: {
          buttonType: "icon",
          buttonName: "수정",
          buttonCss: "icon-button",
          iconData: "chevron-right"
        }
      }
    };
  },
  computed: {
    ...mapGetters("meta/search/search", [
      "searchDetailObject",
      "fileData",
      "recommendData",
      "dataUseCases"
    ])
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
    BasicTabMenu,
    BasicMenu,
    NameTagList
  },
  watch: {},
  methods: {
    ...mapActions("meta/search/search", [
      "getSearchDetailObject",
      "getFileData",
      "getRecommendData",
      "getDataUseCases"
    ]),
    changeData({ input }) {
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
    },
    analyze() {
      alert("바로 분석하기");
    },
    fullDownload() {
      alert("파일 전체 다운로드");
    },
    errorReport() {
      alert("품질오류신고");
    },
    gotoFullSearch() {
      this.$router.push({ path: "/portal/ui/meta/search/fullSearch" });
    },
    urlCopy() {
      alert("copy");
    },
    dataOfInterest() {
      alert("관심데이터/ 게시물ID: " + this.$route.query.postId);
    },
    dataSharing() {
      alert("데이터 공유하기/ 게시물ID: " + this.$route.query.postId);
    },
    rowClick(id) {
      alert("id : " + id);
    },
    request() {
      this.$router.push({
        path: "/portal/ui/meta/search/fullSearch/requestForm",
        query: { postId: this.$route.query.postId }
      });
    }
  },
  created() {
    this.getSearchDetailObject(this.$route.query.postId);
    this.getDataInfoHeader();
    this.getFileData(this.$route.query.postId);
    this.getRecommendData(this.$route.query.postId);
    this.getDataUseCases(this.$route.query.postId);
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
