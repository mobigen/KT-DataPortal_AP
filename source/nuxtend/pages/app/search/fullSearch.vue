<template lang="html">
  <div>
    <h5>데이터 통합검색</h5>

    <!-- top-->
    <div>검색바 component</div>
    <div>추천검색어 component</div>
    <div>결과 component</div>
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
export default {
  name: "app-search-full",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
