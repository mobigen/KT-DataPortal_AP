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
          <span class="select-selector__title">텍스트 유형</span>
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
          <template v-for="(obj, i) in selectList">
            <li
              class="select-container__item select-container__item--selected"
              :key="'li_' + i"
            >
              <button
                class="select-container__button"
                type="button"
                role="option"
              >
                <span class="select-container__text">{{ obj.NM }}</span>
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
      isSelectOpen: false
    };
  },
  props: {
    selectList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
@import "base-select.scss";
</style>
