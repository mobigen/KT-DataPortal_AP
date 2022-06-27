<template>
  <!--  최소 단위인 radio Component - 기능 별로 쪼개는 작업 필요-->
  <div class="radio">
    <input
      type="radio"
      class="radio__input"
      :id="radioId"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      @change="
        $emit('checkValue', { label: labelName, input: $event.target.value })
      "
    />
    <label class="radio__label" :for="radioId">
      <slot name="label" class="radio__label">Default Label</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseRadio",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    radioId: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: false
    },
    labelName: {
      type: String,
      required: false
    }
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
@import "base-radio";
</style>
