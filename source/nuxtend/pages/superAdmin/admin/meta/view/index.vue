<template lang="html">
  <div>
    <h2>admin metaDetail</h2>
    <div>
      <h3>simple-viewTable</h3>

      <basic-view-table
        :headerList="bizMetaDetail.header"
        :dataObj="bizMetaDetail.body"
        viewTableColumnCount="1"
        :useTagList="false"
        tagPreviousText=""
        @tagClick=""
        :tagCursorPointer="false"
        :useSeparator="false"
        separator=""
      ></basic-view-table>

      <div class="add-button">
        <basic-button
          componentId=""
          @click="buttonOk"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          >확인</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table.vue";

export default {
  name: "admin-metaView",
  extends: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters("meta/bizMeta", ["bizMetaDetail"])
  },
  components: {
    BasicViewTable,
    BasicButton
  },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", ["getBizMetaDetail"]),
    buttonOk() {
      this.$router.push({ path: "/mgnt/ui/meta/list" });
    }
  },
  created() {
    this.getBizMetaDetail(this.$route.query.datasetId);
  }
};
</script>

<style lang="scss">
.add-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
