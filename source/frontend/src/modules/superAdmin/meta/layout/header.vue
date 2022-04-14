<template>
  <header>
    <h1>Header</h1>
    <basic-nav :menuList="menuList" />
  </header>
</template>

<script>
import BasicNav from "@/components/basic/basic-nav.vue";
export default {
  name: "sa-header",
  extends: {},
  data() {
    return {
      menuList: [
        { menuName: "SuperAdmin-MetaName", url: "/superAdmin/meta/metaList" },
        { menuName: "SuperAdmin-MetaMap", url: "/superAdmin/meta/metaMapList" },
        { menuName: "Admin-MetaName", url: "/admin/meta/metaList" }
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

<style lang="scss">
header {
  background-color: lightslategray;
  > nav {
    width: 70%;
    margin: auto;
  }
}
</style>
