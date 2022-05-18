<template lang="html">
  <div>
    <h2>admin metaDetail</h2>
    <div>
      <h3>simple-viewTable</h3>

      <basic-viewTable
        :useTableHead="false"
        :viewDetail="bizMetaDetail"
      ></basic-viewTable>

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
import BasicViewTable from "@component/aiPlatform/basic/basic-viewTable.vue";

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
      this.$router.push({ path: "/admin/meta/metaList" });
    }
  },
  created() {
    this.getBizMetaDetail(this.$route.query.metaNameId);
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
