<template lang="html">
  <div>
    <basic-button
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="reload"
      >viewReload</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/basic/basic-button.vue";
import { mapActions } from "vuex";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {};
  },
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["viewReload"]),
    reload() {
      this.viewReload();
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
