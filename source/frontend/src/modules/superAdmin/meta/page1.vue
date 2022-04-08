<template lang="html">
  <div>
    <div>super admin page1</div>
    <div>
      <basic-table
        :headerList="bizMetaList.header"
        :dataList="bizMetaList.body"
        mainKey="rowId"
        :numHeaderUse="false"
        numHeaderText="No."
        :buttonHeaderUse="false"
        buttonHeaderText="삭제"
        @buttonAction="none"
        @columnAction="none"
        keyAction="{}"
        atcionText="[]"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
// import vuexMixin from "@/mixins/vuexMixin";

export default {
  name: "super-admin-page1",
  // mixins: [vuexMixin],
  extends: {},
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaList"])
  },
  components: { BasicTable },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getBizMetaList"]),
    none() {}
  },
  created() {
    this.getBizMetaList();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
