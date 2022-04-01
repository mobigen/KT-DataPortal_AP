<template lang="html">
  <div>
    <div>admin meta list</div>
    <div>
      <basic-table
        componentId="metaList"
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

export default {
  name: "super-admin-list",
  extends: {},
  props: {},
  computed: {
    ...mapGetters("metaForm", ["bizMetaList"])
  },
  components: { BasicTable },
  watch: {},
  methods: {
    ...mapActions("metaForm", ["getBizMetaList"]),
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
