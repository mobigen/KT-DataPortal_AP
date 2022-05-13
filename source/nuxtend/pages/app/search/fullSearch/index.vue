<template lang="html">
  <div>
    <h5>데이터 통합검색</h5>
    <!-- top-->
    <div class="search-box">
      <div class="component">
        <h3>검색바 component</h3>
        <basic-search-bar
          @search="searchClick"
          :searchKeyword="searchKeyword"
        />
      </div>

      <div class="component">
        <h3>추천검색어 component</h3>
        <recommend-search-tag
          tagLabel="추천검색어"
          :tagList="searchTagList"
          previousText="#"
          :useCancelButton="false"
          :cursorPointer="true"
          @tagClick="tagClick"
        ></recommend-search-tag>
      </div>

      <div class="component">
        <h3>결과 component</h3>
        <search-result-box :searchResultSuccess="searchResultSuccess">
          <template v-slot:resultSuccessTrueText>
            <span>"{{ searchKeyword }}"</span> 검색결과, 총 데이터
            <span>{{ numberOfData }}</span> 입니다.
          </template>
          <template v-slot:resultSuccessFalseText>
            <span>검색 결과가 없습니다.</span>
          </template>
        </search-result-box>
      </div>
    </div>

    <div class="component">
      <h3>필터 component</h3>

      <div class="component">
        <complex-filter-result :filter-obj="filterObj" :tree-obj="treeObj" />
      </div>
    </div>

    <!-- bottom-->
    <div class="component">
      <h3>tab component</h3>
      <basic-tab-menu
        :menuList="tabMenuList"
        @currentTabData="currentTabData"
      ></basic-tab-menu>
    </div>

    <!-- bottom-left-->
    <div class="component">
      <h3>검색바 component (radio가 포함된)</h3>
      <radio-button-search-bar
        :radioButtonList="RadioList"
        labelName="radioSelectSearch"
        :defaultValue="0"
        @searchClick="radioSelectSearch"
      ></radio-button-search-bar>
    </div>

    <!-- 모두보기 버튼/닫기 버튼(버튼토글) 추가해야함-->
    <div class="component">
      <h3>필터 - 체크 1단, 2단 component</h3>

      <complex-filter
        :filter-obj="filterObj"
        :tree-obj="treeObj"
      ></complex-filter>
    </div>

    <!-- bottom-right-->
    <div class="component">
      <h3>
        검색결과 요약 component (전체 몇건, sort options.. 개발 우선순위 밀림)
      </h3>

      <h4>sort options</h4>
      <basic-sort-options
        :sortList="sortList"
        :useSeparator="true"
        separator="|"
        :textPreviousIcon="[]"
        :textNextIcon="[]"
        @sortOptionsClick="sortOptionsClick"
      ></basic-sort-options>
    </div>

    <div class="component">
      <h3>검색결과 panel component</h3>
      <name-tag-list
        :nameTagList="searchResultList"
        @dataOfInterest="dataOfInterest"
        @dataSharing="dataSharing"
        @listClick="listClick"
      ></name-tag-list>
    </div>

    <div class="component">
      <h3>name tag component - wide</h3>
      <basic-name-tag
        :nameTagObject="nameTagObject"
        @nameTagClick="nameTagClick"
        @dataOfInterest="dataOfInterest"
        @dataSharing="dataSharing"
        width="wide"
      >
        <!-- 사용안하는 slot 빈값으로 바꾸는 다른 방법 알아보기 -->
        <template v-slot:header><div></div></template>
        <template v-slot:left-side><div></div></template>
        <template v-slot:right-side><div></div></template>
      </basic-name-tag>

      <h3>name tag component - narrow</h3>
      <basic-name-tag
        :nameTagObject="nameTagObject"
        @nameTagClick="nameTagClick"
        @dataOfInterest="dataOfInterest"
        @dataSharing="dataSharing"
        width="narrow"
      >
        <template v-slot:left-side><div></div></template>
        <template v-slot:right-side><div></div></template>
        <template v-slot:body-top>
          <div class="body-top">
            <div>
              <!-- data 가져오는 다른 방법 알아보기 -->
              <basic-single-tag
                :tagName="nameTagObject.category"
                previousText=""
              ></basic-single-tag>
              <basic-single-tag
                :tagName="nameTagObject.dataLocation"
                previousText=""
              ></basic-single-tag>
            </div>

            <div>
              <basic-icon>CSV</basic-icon>
              <basic-button
                componentId=""
                buttonCss="icon-button"
                :underline="false"
                :hoverColor="false"
                @click="dataSharing(nameTagObject.id)"
              >
                <fa icon="share-nodes" />
              </basic-button>
              <basic-button
                componentId=""
                buttonCss="icon-button"
                :underline="false"
                :hoverColor="false"
                @click="dataOfInterest(nameTagObject.id)"
                title="관심데이터 추가"
              >
                <fa icon="bookmark" />
              </basic-button>
            </div>
          </div>
        </template>
        <template v-slot:body-bottom><div></div></template>
      </basic-name-tag>
    </div>

    <div class="component">
      <h3>paging component</h3>
      <basic-pagination
        paging-key="fullSearchPagination"
        :paging-object="pagingObj"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicSearchBar from "@/components/aiPlatform/basic/basic-search-bar.vue";
import RecommendSearchTag from "@/components/aiPlatform/basic/recommend-search-tag.vue";
import SearchResultBox from "@/components/aiPlatform/basic/search-result-box.vue";
import BasicTabMenu from "@/components/aiPlatform/basic/basic-tab-menu.vue";
import ComplexFilterResult from "@/components/aiPlatform/group/complex-filter-result.vue";
import RadioButtonSearchBar from "@/components/aiPlatform/group/radio-button-search-bar.vue";
import ComplexCheckbox from "@/components/aiPlatform/group/complex-checkbox.vue";
import BasicPagination from "@/components/aiPlatform/basic/basic-pagination";
import BasicSortOptions from "@/components/aiPlatform/basic/basic-sort-options.vue";
import ComplexFilter from "@/components/aiPlatform/group/complex-filter.vue";
import NameTagList from "@/components/aiPlatform/basic/name-tag-list.vue";
import BasicNameTag from "@/components/aiPlatform/basic/basic-name-tag.vue";
import BasicSingleTag from "@/components/aiPlatform/basic/basic-single-tag.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import BasicIcon from "@/components/aiPlatform/basic/basic-icon.vue";

export default {
  name: "app-search-full",
  extends: {},
  props: {},
  data() {
    return {
      /**
       * 사용하고자 하는 filter 를 key-value(obj)의 형태로 정의한다.
       * vuex에서 해당 key를 이용하여 데이터를 로드한다.
       */
      filterObj: {
        category: {
          label: "카테고리",
          componentType: "checkbox",
          columnCnt: 1
          // restApi: "/api/filter/getCategory"
        },
        provider: {
          label: "제공기관",
          componentType: "checkbox",
          columnCnt: 2
          // restApi: "/api/filter/getProvider"
        },
        dataType: {
          label: "데이터 타입",
          componentType: "checkbox",
          columnCnt: 1,
          useViewButton: true // 모두보기 버튼 사용 여부
          // restApi: "/api/filter/getDataType"
        },
        treeView: {
          label: "트리뷰",
          columnCnt: 1,
          componentType: "tree",
          restApi: "",
          forLabel: true // tree는 다른 컴포넌트를 사용하기 때문에, 예외처리를 위하여 추가한다.
        }
      },
      searchKeyword: "",
      numberOfData: null,
      searchResultSuccess: false,
      RadioList: [
        { value: 0, label: "포함" },
        { value: 1, label: "제외" }
      ],
      pagingObj: {
        visiblePages: 5
      },
      treeObj: {
        componentKey: "metaTreeKey",
        treeRestApi: "/api/meta/getCategoryList",
        checkboxLabel: "상위자동선택",
        treeKey: {
          nodeName: "node_name", // node title
          nodeIdText: "node_id", // node key
          parentIdText: "parent_id" // parent key
        }
      },
      sortList: [
        { sortName: "정확도순", orderBy: "accuracy" },
        { sortName: "최신순", orderBy: "latest" },
        { sortName: "다운로드순", orderBy: "download" },
        { sortName: "조회순", orderBy: "view" }
      ],
      nameTagObject: {
        id: 1,
        category: "자동차부품",
        dataLocation: "내부",
        dataSource: "도로교통공단",
        fileType: ["CSV", "XML"],
        title: "도로교통공단_결빙사고 다발지역",
        body: "노면상태가 '서리/결빙'인 교통사고에 대한 사고다발지역 정보",
        date: "2022-05-09",
        download: 180,
        hit: 200
      }
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("app/search/search", [
      "searchTagList",
      "tabMenuList",
      "searchResultList"
    ])
  },
  components: {
    BasicSearchBar,
    RecommendSearchTag,
    SearchResultBox,
    BasicTabMenu,
    ComplexFilterResult,
    RadioButtonSearchBar,
    ComplexCheckbox,
    BasicPagination,
    ComplexFilter,
    BasicSortOptions,
    NameTagList,
    BasicNameTag,
    BasicSingleTag,
    BasicButton,
    BasicIcon
  },
  watch: {},
  methods: {
    ...mapActions("app/search/search", [
      "getSearchTagList",
      "getTabMenuList",
      "getSearchFilterList",
      "getSearchResultList"
    ]),
    searchClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    tagClick(tagObj) {
      this.searchKeyword = tagObj.itemName;
      this.search();
    },
    search() {
      this.numberOfData = 126;

      if (this.searchKeyword.trim() === "") {
        this.searchResultSuccess = false;
        return;
      }

      this.searchResultSuccess = true;
    },
    currentTabData(data) {
      console.log(data);
    },
    radioSelectSearch(radioValue, searchKeyword) {
      alert("radioValue: " + radioValue + ", searchKeyword: " + searchKeyword);
    },
    sortOptionsClick(orderBy) {
      alert(orderBy);
    },
    dataOfInterest(id) {
      alert("관심데이터/ 게시물ID: " + id);
    },
    dataSharing(id) {
      alert("데이터 공유하기/ 게시물ID: " + id);
    },
    listClick(id) {
      const dataList = this.searchResultList.find((el) => {
        if (el.id === id) {
          return true;
        }
      });

      // dataLocationKey, path 정해지면 변경
      if (dataList.dataLocation === "내부") {
        this.$router.push({
          path: "/app/search/detail",
          query: { postId: id }
        });
      } else {
        window.open("/app/search/fullSearch", "_blank");
      }
    },
    nameTagClick(id) {
      alert("게시물ID: " + id);
    }
  },
  created() {
    this.getSearchTagList();
    this.getTabMenuList();
    this.getSearchFilterList(this.filterObj);
    this.getSearchResultList();
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
