<template lang="html">
  <div>
    <h2>super admin metaDetail</h2>
    <h1>META Detail</h1>
    <div>
      <h3>simple-viewTable</h3>

      <basic-viewTable
        :useTableHead="false"
        :viewDetail="metaNameDetail"
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
import BasicButton from "@/components/basic/basic-button.vue";
import BasicViewTable from "@/components/basic/basic-viewTable.vue";

export default {
  name: "super-admin-metaView",
  extends: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["metaNameDetail"])
  },
  components: {
    BasicViewTable,
    BasicButton
  },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getMetaNameDetail"]),
    buttonOk() {
      this.$router.push({ path: "/superAdmin/meta/metaList" });
    }
  },
  created() {
    this.getMetaNameDetail(this.$route.query.metaNameId);
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
