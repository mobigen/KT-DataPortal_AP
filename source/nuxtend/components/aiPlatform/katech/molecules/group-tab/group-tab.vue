<template lang="html">
  <div class="tab tab--horizontal tab--search">
    <ul class="tab__bar">
      <li
        class="tab__item"
        v-for="(item, index) in tabList"
        :class="currentTab === index ? 'tab__item--selected' : ''"
        :key="index"
      >
        <button
          type="button"
          class="tab__button"
          role="tab"
          aria-selected="false"
          @click="tabClick(item, index)"
        >
          <div class="tab__button-text">
            {{ item.title }}
            <template v-if="useTabNum">
              <p class="tab__button-subtext">{{ item.num }}</p>
            </template>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "GroupTab",
  components: {},
  props: {
    tabList: {
      type: Array,
      require: true
    },
    useTabNum: {
      type: Boolean,
      require: false
    }
  },
  data() {
    return {
      currentTab: 0
    };
  },
  methods: {
    tabClick(tabObj, index) {
      this.currentTab = index;
      this.$emit("tabClick", { tabObj });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./group-tab.scss";
</style>
