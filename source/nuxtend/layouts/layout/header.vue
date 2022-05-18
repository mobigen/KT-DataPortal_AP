<template>
  <div>
    <json-viwer />
    <header>
      <h1>Header</h1>
      <basic-nav :menuList="menuList" />
    </header>
  </div>
</template>

<script>
import BasicNav from "@/components/aiPlatform/basic/basic-nav.vue";
export default {
  name: "layout-header",
  extends: {},
  data() {
    return {
      menuList: [
        { menuName: "SuperAdmin-MetaName", url: "/superAdmin/meta/metaName/list" },
        { menuName: "SuperAdmin-MetaMap", url: "/superAdmin/meta/map/list" },
        { menuName: "Admin-MetaName", url: "/mgnt/ui/meta/List" },
        { menuName: "Admin-MetaTree", url: "/mgnt/ui/meta/tree" }
      ]
    };
  },
  props: {},
  components: { BasicNav },
  computed: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
header {
  background-color: lightslategray;
  > nav {
    width: 70%;
    margin: auto;
  }
}
</style>
