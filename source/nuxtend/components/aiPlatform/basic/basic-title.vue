<template lang="html">
  <div>
    <div class="title">{{ title }}</div>
    <p class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-title",
  extends: {},
  props: {
    title: {
      type: String,
      require: true
    },
    subtitle: {
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

<style lang="scss">
.title {
  font-size: 1.3rem;
  font-weight: bold;
}
.subtitle {
  color: slategray;
}
</style>
