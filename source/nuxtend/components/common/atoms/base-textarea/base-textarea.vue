<template lang="html">
  <div>
    <textarea
      type="text"
      class="text-area text-area--fixed scrollCustomize"
      @input="input = $event.target.value"
      :value="value"
      :rows="rows"
      @keydown="$emit('keydown', $event)"
    ></textarea>
    <!-- 텍스트 길이(byte) 표시 -->
    <div v-if="useCheckByte" class="text-area__byte">
      <strong>{{ byte }}</strong> / {{ maxByte }} bytes
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "BaseTextarea",
  extends: {},
  props: {
    id: {
      type: String,
      required: false
    },
    rows: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    useCheckByte: {
      type: Boolean,
      required: false,
      default: false
    },
    maxByte: {
      type: String,
      required: false,
      default: "1000"
    },
    inputData: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      byte: 0,
      value: ""
    };
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.value = newValue;

        if (this.useCheckByte) {
          this.checkByte(newValue);
        }

        this.$emit("input", { id: this.id, input: this.value });
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    checkByte(text) {
      let count = 0;
      this.byte = text
        .split("")
        .map((s) => s.charCodeAt(0))
        .reduce((prev, unicodeDecimalValue) => {
          const rByte = prev + this.getByteLength(unicodeDecimalValue);
          if (rByte <= this.maxByte) {
            count++;
          }
          return rByte;
        }, 0);

      if (this.byte > this.maxByte) {
        alert("maxByte 초과");
        this.input = text.substr(0, count);
      }
    },
    getByteLength(decimal) {
      return decimal >> 7 ? 2 : 1;
    }
  },
  created() {
    this.value = this.inputData;
    if (this.useCheckByte && this.value !== "") {
      this.checkByte(this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "base-textarea";
</style>
