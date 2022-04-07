<template lang="html">
  <div>
    <button :class="buttonCss" type="button" @click="buttonClick">
      <slot></slot>
    </button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-button",
  extends: {},
  props: {
    buttonCss: {
      type: String
    },
    componentId: {
      type: String,
      require: false
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    buttonClick() {
      this.$emit("click", this.componentId);
    }
  },
  created() {}
};
</script>

<style lang="scss">
.icon-button {
  border: none;
  padding: 0;
  margin: 2px;
}
.text-button {
  margin: 0px 5px;
}
button:hover {
  cursor: pointer;
}
</style>
