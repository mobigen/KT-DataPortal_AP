<template lang="html">
  <div class="search-filter">
    <div class="search-filter__head">
      <base-checkbox
        :name="filterId"
        :checkbox-id="filterId"
        :checked="titleCheckValue"
        @changeData="changeAllCheckboxData"
      >
        <template v-slot:label>
          <span>{{ filterTitle }}</span>
        </template>
      </base-checkbox>
    </div>
    <div class="search-filter__body">
      <ul class="search-filter__list">
        <li v-for="(obj, i) in filterList" class="search-filter__item" :key="i">
          <base-checkbox
            class="checkbox--aside"
            :name="filterId + '_' + obj.itemId"
            :checkbox-id="filterId + obj.itemId"
            :checked="getCheckboxChecked(obj.itemId)"
            @changeData="changeCheckboxData"
          >
            <template v-slot:label>{{ obj.itemName }}</template>
          </base-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";

export default {
  name: "checkbox-filter-list",
  extends: {},
  props: {
    filterId: {
      type: String,
      required: true
    },
    useExpandButton: {
      type: Boolean,
      required: false,
      default: false
    },
    filterTitle: {
      type: String,
      required: true
    },
    filterList: {
      type: Array,
      required: true
    },
    selectCheckboxList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    titleCheckValue: {
      type: Boolean,
      required: false,
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
    changeAllCheckboxData(checked) {
      let newCheckedList = [];

      if (checked) {
        // check all
        // this.filterList.forEach((fl) => {
        //   // newCheckedList.push({
        //   //   itemId: fl.itemId,
        //   //   itemName: fl.itemName
        //   // });
        // });
        this.selectedCheckbox = this.filterList;
      } else {
        // uncheck all
        this.selectedCheckbox = [];
      }
    },
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
    getCheckboxChecked(itemId) {
      const selectedIndex = this.selectCheckboxList.findIndex((el) => {
        return el.itemId === itemId;
      });
      return selectedIndex > -1;
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "./checkbox-filter-list.scss";
</style>
