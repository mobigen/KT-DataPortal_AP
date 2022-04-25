<template>
  <div>
    <header>
      <h1>Header</h1>
      <basic-nav :menuList="menuList" />
    </header>
  </div>
</template>

<script>
import BasicNav from "@/components/basic/basic-nav.vue";
export default {
  name: "layout-header",
  extends: {},
  data() {
    return {
      menuList: [
        { menuName: "SuperAdmin-MetaName", url: "/superAdmin/meta/metaList" },
        { menuName: "SuperAdmin-MetaMap", url: "/superAdmin/meta/metaMapList" },
        { menuName: "Admin-MetaName", url: "/admin/meta/metaList" },
        { menuName: "Admin-MetaTree", url: "/admin/meta/metaTree" }
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
