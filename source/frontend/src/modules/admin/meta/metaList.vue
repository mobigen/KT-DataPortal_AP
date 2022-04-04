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
        :buttonHeaderUse="false"
        @columnAction="viewMetaInfo"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";

export default {
  name: "admin-list",
  extends: {},
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaList"])
  },
  components: { BasicTable },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getBizMetaList"]),
    viewMetaInfo(rowKey, componentId) {
      console.log("view : " + rowKey); // m1abc 를 가지고 view 화면으로 페이지 이동.
      this.$router.push({ name: "" });
    },
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
