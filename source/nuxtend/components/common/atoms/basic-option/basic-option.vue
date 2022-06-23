<template lang="html">
  <div class="radios">
    <base-radio
      v-for="(data, i) in optionList"
      :key="'basic_option_' + i"
      :class="radioClass"
      :name="name"
      :radioId="name + i"
      :checked="i === 0"
      :value="data['option']"
      @checkValue="checkOption"
    >
      <template v-if="type === 'text'" v-slot:label
        ><span :class="i === 0 ? 'radio-check-first' : ''">{{
          data["label"]
        }}</span></template
      >
      <template v-else v-slot:label
        ><svg-icon :name="data['svgIconName']" class="svg-icon" />
        <span class="hidden">{{ data["label"] }}</span></template
      >
    </base-radio>
  </div>
</template>

<script type="text/javascript">
import BaseRadio from "@component/common/atoms/base-radio/base-radio";

export default {
  name: "basic-option",
  extends: {},
  data() {
    return {};
  },
  props: {
    radioClass: {
      type: String,
      require: false
    },
    optionList: {
      type: Array,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: false,
      default: "text"
    }
  },
  computed: {},
  components: { BaseRadio },
  watch: {},
  methods: {
    checkOption({ input }) {
      this.$emit("checkOption", input);
    }
  }
};
</script>

<style lang="scss"></style>
