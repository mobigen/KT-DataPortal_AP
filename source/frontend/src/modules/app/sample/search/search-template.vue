<template lang="html">
  <div class="search">
    <div class="search-head">
      <h3 class="search-head__title">매체별 검색</h3>
      <div class="search-head__breadcrumb">
        <div class="breadcrumb">
          <span class="breadcrumb__text"> Depth1 </span>
          <span class="breadcrumb__text"> Depth2 </span>
        </div>
      </div>
    </div>
    <search-filter></search-filter>
    <search-result></search-result>
  </div>
</template>

<script type="text/javascript">
import SearchFilter from "./search-filter.vue";
import SearchResult from "./search-result.vue";

export default {
  name: "SearchTemplate",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  computed: {},
  components: {
    SearchResult,
    SearchFilter
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
@import "./search-template";
</style>
