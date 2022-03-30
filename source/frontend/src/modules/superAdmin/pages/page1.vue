<template lang="html">
  <div>
    <div>super admin page1</div>
    <div>
      {{ metaName }}
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";

export default {
  name: "super-admin-page1",
  extends: {},
  props: {},
  computed: {
    ...mapGetters("superAdmin", ["metaName"])
  },
  components: {},
  watch: {},
  methods: {
    ...mapActions("superAdmin", ["getMetaNameList"])
  },
  created() {
    this.getMetaNameList();
    this.getMetaList();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
