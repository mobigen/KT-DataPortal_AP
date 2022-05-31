<template>
  <div
    class="select"
    role="select"
    :class="isSelectOpen ? 'select--open' : ''"
    @click="isSelectOpen = !isSelectOpen"
  >
    <div
      class="select-selector"
      aria-expanded="false"
      aria-controls="select-01"
    >
      <button class="select-selector__button" type="button">
        <slot name="title">
          <span class="select-selector__title">
            {{ selectedVal === null ? placeholderText : selectedVal }}
          </span>
        </slot>
        <svg-icon
          class="svg-icon select-selector__icon"
          name="chevron-down-medium"
          aria-hidden="true"
        ></svg-icon>
      </button>
    </div>
    <div class="select-container" id="select-01" aria-haspopup="true">
      <ul class="select-container__list">
        <slot name="list">
          <!-- 선택 된 객체에 select-container__item--selected 클래스 추가 -->
          <template v-for="(obj, i) in newSelectList">
            <li
              :class="[
                'select-container__item',
                {
                  'select-container__item--selected': selectedKey === obj.key
                }
              ]"
              :key="'li_' + i"
            >
              <button
                class="select-container__button"
                type="button"
                role="option"
                @click="changeData(obj.key)"
              >
                <span class="select-container__text">{{ obj.text }}</span>
              </button>
            </li>
          </template>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      isSelectOpen: false,
      selectedVal: null,
      newSelectList: []
    };
  },
  props: {
    labelName: {
      type: String,
      require: true
    },
    selectList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    },
    placeholderText: {
      type: String,
      require: false,
      default: "선택해주세요."
    },
    selectedKey: {
      type: String,
      require: false,
      default: null
    },
    useAllOption: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  watch: {
    selectList() {
      const tempList = JSON.parse(JSON.stringify(this.selectList));
      console.log('here')


      if (this.useAllOption) {
        tempList.unshift({
          key: "all",
          text: "전체"
        });
      }
      this.newSelectList = tempList;
      // console.log(this.newSelectList);
    },
    // changed selection
    selectedKey() {
      const obj = this.newSelectList.find((sl) => {
        return sl.key === this.selectedKey;
      });
      this.selectedVal = obj === undefined ? this.placeholderText : obj.text;
    }
  },
  computed: {},
  methods: {
    changeData(input) {
      // select text에 셋팅하준다.
      // this.selectedVal = input;

      this.$emit("changeData", this.labelName, input);
    }
  },
  beforeCreate() {
    console.log(this);
  },
  created() {}
};
</script>

<style lang="scss">
@import "base-select.scss";
</style>
