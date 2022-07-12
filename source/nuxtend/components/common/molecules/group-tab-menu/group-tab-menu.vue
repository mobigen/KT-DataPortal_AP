<template lang="html">
  <div class="tab tab--horizontal tab--search">
    <ul class="tab__bar">
      <li
        class="tab__item"
        v-for="(item, index) in tabList"
        :class="activeTab === item[codeKey] ? 'tab__item--selected' : ''"
        :key="'tab_'+index"
      >
        <button
          type="button"
          class="tab__button"
          role="tab"
          aria-selected="false"
          @click="tabClick(item, index)"
        >
          <div class="tab__button-text">
            {{ item[nameKey] }}
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
  name: "GroupTabMenu",
  components: {},
  props: {
    tabList: {
      type: Array,
      require: true
    },
    useTabNum: {
      type: Boolean,
      require: false
    },
    nameKey: {
      type: String,
      default: "title",
      require: false
    },
    codeKey: {
      type: String,
      default: "id",
      require: false
    },
    activeTab: {
      type: String,
      require: false
    }
  },
  data() {
    return {};
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
@import "group-tab-menu";
</style>
