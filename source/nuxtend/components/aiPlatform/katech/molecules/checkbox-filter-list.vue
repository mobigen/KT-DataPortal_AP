<template lang="html">
  <div
    :class="
      (isExpand ? 'aside__' + filterId + '-expand' : '') + ' aside__' + filterId
    "
  >
    <h4 class="aside__title">{{ filterTitle }}</h4>
    <base-button
      v-show="useExpandButton"
      class="aside__button-down"
      :class="isExpand ? 'aside__button-up' : ''"
      @click="toggleExpand"
    ></base-button>
    <ul>
      <li v-for="(obj, i) in filterList">
        <base-checkbox
          class="checkbox--aside"
          :name="filterId + '_' + obj.itemId"
          :checkbox-id="filterId + obj.itemId"
          @changeData="changeCheckboxData"
        >
          <template v-slot:label>{{ obj.itemName }}</template>
        </base-checkbox>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@component/UITeam/project/katech/atoms/base-button/base-button";
import BaseCheckbox from "@component/aiPlatform/katech/atoms/base-checkbox/base-checkbox";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "checkbox-filter-list",
  extends: {},
  props: {
    filterId: {
      type: String,
      require: true
    },
    useExpandButton: {
      type: Boolean,
      require: false,
      default: false
    },
    filterTitle: {
      type: String,
      require: true
    },
    filterList: {
      type: Array,
      require: true
    },
    selectCheckboxList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isExpand: false
    };
  },
  computed: {
    selectedCheckbox: {
      get() {
        return JSON.parse(JSON.stringify(this.selectCheckboxList));
      },
      set(newValue) {
        this.$emit("changeCheckboxList", {
          checkboxKey: this.filterId,
          changeList: newValue
        });
      }
    }
  },
  components: { BaseButton, BaseCheckbox },
  watch: {},
  methods: {
    changeCheckboxData(checked, labelName) {
      const itemId = labelName.split("_").pop();

      if (checked) {
        const itemName = this.filterList.find(
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
    toggleExpand() {
      this.isExpand = !this.isExpand;
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
