<template lang="html">
  <div id="basicCheckbox">
    <div class="checkbox-title">
      <span>{{ checkboxTitle }}</span>

      <!-- 모두 보기 버튼 같은 특수한 상황에 사용할 버튼 컴포넌트-->
      <template v-if="useViewButton">
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="checkBoxButton"
          >모두보기</basic-button
        >
      </template>
    </div>
    <div class="checkbox-body" :style="cssVariable">
      <template v-for="(data) in checkboxData">
        <basic-single-checkbox
          :checkboxLabel="data['itemName']"
          :labelName="'ckb_' + data['itemId']"
          :checked="checked(data['itemId'])"
          @changeData="changeCheckboxData"
        ></basic-single-checkbox>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicSingleCheckbox from "@/components/aiPlatform/basic/basic-single-checkbox.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button";

export default {
  name: "basic-checkbox",
  extends: {},
  props: {
    checkboxKey: {
      type: String,
      require: false
    },
    checkboxTitle: {
      type: String,
      require: false
    },
    checkboxData: {
      type: Array,
      require: true
    },
    selectCheckboxList: {
      type: Array,
      require: true,
      default: []
    },
    checkboxColumnCount: {
      type: Number,
      require: false,
      default: "column"
    },
    useViewButton: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    selectedCheckbox: {
      get() {
        return JSON.parse(JSON.stringify(this.selectCheckboxList));
      },
      set(newValue) {
        this.$emit("changeCheckboxList", this.checkboxKey, newValue);
      }
    },
    cssVariable() {
      return {
        "--grid-template-columns": `repeat(${this.checkboxColumnCount}, 1fr)`
      };
    }
  },
  components: { BasicButton, BasicSingleCheckbox },
  watch: {},
  methods: {
    changeCheckboxData(checked, labelName) {
      const itemId = Number(labelName.split("_").pop());

      if (checked) {
        const itemName = this.checkboxData.find(
          (el) => el.itemId === itemId
        ).itemName;

        this.selectedCheckbox.push({ itemId, itemName });
        this.selectedCheckbox = JSON.parse(
          JSON.stringify(this.selectedCheckbox)
        );
      } else {
        this.selectedCheckbox = this.selectedCheckbox.filter(
          (el) => el.itemId !== itemId
        );
      }
    },
    checked(itemId) {
      return (
        this.selectCheckboxList.findIndex((obj) => obj.itemId === itemId) >= 0
      );
    },
    checkBoxButton() {
      console.log("checkBoxButton");
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.checkbox-body {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
}
</style>
