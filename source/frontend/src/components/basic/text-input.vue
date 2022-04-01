<template lang="html">
  <div>
    <input
      type="text"
      class="text-input text-input--sm"
      :placeholder="placeholder"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "text-input",
  extends: {},
  props: {
    placeholder: {
      type: String
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
