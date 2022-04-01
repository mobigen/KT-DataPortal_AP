<template lang="html">
  <div>
    <div>super admin page1</div>
    <div>
      {{ bizMetaList }}
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
// import vuexMixin from "@/mixins/vuexMixin";

export default {
  name: "super-admin-page1",
  // mixins: [vuexMixin],
  extends: {},
  props: {},
  computed: {
    ...mapGetters("metaForm", ["bizMetaList"])
  },
  components: {},
  watch: {},
  methods: {
    ...mapActions("metaForm", ["getBizMetaList"])
  },
  created() {
    this.getBizMetaList();
    // this.commonMixin_ConvertSql(this.bizMetaList);
  }
};
</script>

<style lang="scss">
// @import ""
</style>
