<!--경진대회-->
<template>
  <div>
    <h1>경진대회</h1>

    <div style="display: flex;">
      <basic-tab-menu
        @currentTabData="currentTabData"
        :menuList="menuList">
      </basic-tab-menu>
      <basic-search-bar
        @search="search"
      ></basic-search-bar>


    </div>

  </div>
</template>

<script>
import BasicTabMenu from "@component/aiPlatform/basic/basic-tab-menu";
import BasicSearchBar from "@component/aiPlatform/basic/basic-search-bar";
import BasicViewTable from "@component/aiPlatform/basic/basic-viewTable";
import NameTagList from "@component/aiPlatform/basic/name-tag-list";
export default {
  name: "contest",
  components: {NameTagList, BasicViewTable, BasicSearchBar, BasicTabMenu},
  data() {
    return {
      tabDataIndex:"제목+내용",
      menuList: [
        { menuName: "제목+내용",data:"제목+내용" },
        { menuName: "제목",data:"제목" },
        { menuName: "내용",data:"내용"},
      ],
    }
  },
  methods: {
    currentTabData(data){
      this.tabDataIndex = data
    },
    search(data) {
      alert(`탭 옵션 =${this.tabDataIndex}
      검색어 = ${data}`);
    }
  },
}
</script>

<style scoped>

</style>
