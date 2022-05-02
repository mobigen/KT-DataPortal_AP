<template lang="html">
  <div>
    <button
      :class="[buttonCss, { underline }, { hoverColor }]"
      type="button"
      @click="buttonClick"
    >
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
      type: String,
      require: false,
      default: "text-button"
    },
    componentId: {
      type: String,
      require: false
    },
    underline: {
      type: Boolean,
      require: false,
      default: false
    },
    hoverColor: {
      type: Boolean,
      require: false,
      default: false
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
  margin: 0 5px;
}
.link-button {
  padding: 0;
  border: none;
  background: none;
}
.underline {
  text-decoration: underline;
}
.hoverColor:hover {
  color: red;
}
.link-button {
  padding: 0;
  border: none;
  background: none;
}
.underline {
  text-decoration: underline;
}
.hoverColor:hover {
  color: red;
}
button:hover {
  cursor: pointer;
}
</style>
