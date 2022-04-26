<template lang="html">
  <div>
    <h5>데이터 통합검색</h5>
    <!-- top-->
    <div class="search-box">
      <h3>검색바 component</h3>
      <basic-search-bar @search="searchClick" :searchKeyword="searchKeyword" />

      <h3>추천검색어 component</h3>
      <recommend-search-tag
        tagLabel="추천검색어"
        :tagList="tagList"
        :hashTagUse="true"
        :cancelButtonUse="true"
        :cursorPointer="true"
        @tagClick="tagClick"
      ></recommend-search-tag>

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

    <div>필터 component</div>
    <!-- bottom-->

    <div>tab component</div>
    <!-- bottom-left-->
    <div>검색바 component (radio가 포함된)</div>

    <div>필터 - 체크 1단 component</div>
    <div>필터 - 체크 2단 component</div>
    <div>필터 - tree component</div>

    <!-- bottom-right-->
    <div>
      검색결과 요약 component (전체 몇건, sort options.. 개발 우선순위 밀림)
    </div>
    <div>검색결과 panel component</div>
    <div>paging component</div>
  </div>
</template>

<script type="text/javascript">
import BasicSearchBar from "@/components/basic/basic-search-bar.vue";
import RecommendSearchTag from "@/components/basic/recommend-search-tag.vue";
import SearchResultBox from "@/components/basic/search-result-box.vue";

export default {
  name: "app-search-full",
  extends: {},
  props: {},
  data() {
    return {
      tagList: ["test01", "test02", "test03", "test04", "test05"],
      searchKeyword: "",
      numberOfData: null,
      searchResultSuccess: false
    };
  },
  computed: {},
  components: { BasicSearchBar, RecommendSearchTag, SearchResultBox },
  watch: {},
  methods: {
    searchClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    tagClick(tagName) {
      this.searchKeyword = tagName;
      this.search();
    },
    search() {
      this.numberOfData = 126;

      if (this.searchKeyword.trim() === "") {
        this.searchResultSuccess = false;
        return;
      }

      this.searchResultSuccess = true;
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
