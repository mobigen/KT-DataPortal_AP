<template lang="html">
  <div class="json-viwer">
    <basic-button
      componentId="jsonViwer"
      @click="buttonOk"
      buttonCss="text-button"
      >{{ jsonViewerShow ? "JSON 숨김" : "JSON 표시" }}</basic-button
    >
    <pre v-show="jsonViewerShow" v-if="isDevMode">{{ devJsonObject }}</pre>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import BasicButton from "@/components/basic/basic-button.vue";

export default {
  name: "basic-jsonViewer",
  extends: {},
  data() {
    return {
      isDevMode: false,
      jsonViewerShow: false
    };
  },
  props: {},
  computed: {
    ...mapGetters("common", ["devJsonObject"])
  },
  components: { BasicButton },
  watch: {},
  methods: {
    buttonOk() {
      this.jsonViewerShow = !this.jsonViewerShow;
    }
  },
  created() {
    this.isDevMode = process.env.NODE_ENV === "development";
  }
};
</script>

<style lang="scss" scoped>
.json-viwer {
  border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
}
pre {
  font-size: 11px;
}
</style>
