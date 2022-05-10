<template lang="html">
  <div id="basicIconLabel">
    <template v-if="textPreviousIcon"><fa :icon="textPreviousIcon" /></template>
    <label :for="forProperty"><slot></slot></label>
    <template v-if="textNextIcon"><fa :icon="textNextIcon" /></template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-icon-label",
  extends: {},
  props: {
    forProperty: {
      type: String,
      require: false
    },
    textPreviousIcon: {
      type: String,
      require: false
    },
    textNextIcon: {
      type: String,
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style scoped lang="scss">
#basicIconLabel {
  label {
    padding: 0px 10px;
  }
}
</style>
