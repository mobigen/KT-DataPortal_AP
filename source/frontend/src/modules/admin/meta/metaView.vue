<template lang="html">
  <div>
    <h2>admin metaDetail</h2>
    <h1>ADMIN META Detail</h1>
    <div>
      <h3>simple-viewTable</h3>

      <basic-viewTable
        componentId="metaDetail"
        :viewDetail="bizMetaDetail"
      ></basic-viewTable>

      <div class="add-button">
        <basic-button
          componentId="metaViewBtn"
          @click="buttonOk"
          buttonCss="text-button"
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
  name: "admin-metaView",
  extends: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["bizMetaDetail"])
  },
  components: {
    BasicViewTable,
    BasicButton
  },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getBizMetaDetail"]),
    buttonOk() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getBizMetaDetail(this.$route.params.rowKey);
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
