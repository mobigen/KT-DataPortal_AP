<template lang="html">
  <div id="basicCheckbox">
    <div class="checkbox-title">{{ checkboxTitle }}</div>
    <div class="checkbox-body" :style="cssVariable">
      <template v-for="(data, i) in checkboxData">
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
    }
  },
  data() {
    return {};
  },
  computed: {
    changeCheckboxList: {
      get() {
        return this.selectCheckboxList;
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
  components: { BasicSingleCheckbox },
  watch: {},
  methods: {
    changeCheckboxData(checked, labelName) {
      const itemId = Number(labelName.split("_").pop());

      if (checked) {
        const itemName = this.checkboxData.find(
          (el) => el.itemId === itemId
        ).itemName;

        this.changeCheckboxList.push({ itemId, itemName });
        this.$emit(
          "changeCheckboxList",
          this.checkboxKey,
          this.changeCheckboxList
        );
      } else {
        this.changeCheckboxList = this.changeCheckboxList.filter(
          (el) => el.itemId !== itemId
        );
      }
    },
    checked(itemId) {
      return this.selectCheckboxList.findIndex(
        (obj) => obj.itemId === itemId
      ) >= 0
        ? true
        : false;
    }
  },
  created() {}
};
</script>

<style lang="scss">
#basicCheckbox {
  border: solid lightgrey 1px;
  width: 300px;
  padding: 5px;
  margin-bottom: 20px;
  .checkbox-title {
    font-weight: bold;
    margin: 5px;
    /*  width: var(--width); */
  }
  .checkbox-body {
    display: grid;
    grid-template-columns: var(--grid-template-columns);
  }
}
</style>
