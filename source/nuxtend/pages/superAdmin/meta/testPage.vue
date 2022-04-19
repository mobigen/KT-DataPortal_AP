<template>
  <div>
    <basic-button
      componentId=""
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="test"
      >TEST</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicButton from "@/components/basic/basic-button.vue";

export default {
  name: "super-admin-testPage",
  extends: {},
  props: {},
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getTestData"]),
    test() {
      this.getTestData();
    }
  }
};
</script>
