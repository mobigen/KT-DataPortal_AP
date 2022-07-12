<template lang="html">
  <div class="json-viwer">
    <basic-button @click="buttonOk" buttonCss="text-button">{{
      jsonViewerShow ? "JSON 숨김" : "JSON 표시"
    }}</basic-button>
    <pre v-if="jsonViewerShow && isDevMode">{{ devJsonObject }}</pre>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import BasicButton from "@common/atoms/basic-button.vue";

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
    ...mapGetters("defaults/common", ["devJsonObject"])
  },
  components: { BasicButton },
  watch: {},
  methods: {
    buttonOk() {
      this.jsonViewerShow = !this.jsonViewerShow;
    }
  },
  created() {
    // local, 개발 버전에서만 표시한다.
    this.isDevMode = process.env.NODE_ENV !== "prod";
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
  z-index: 1;
}
pre {
  font-size: 11px;
}
</style>
