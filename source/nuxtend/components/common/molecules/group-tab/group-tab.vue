<template lang="html">
  <div class="tab tab--horizontal tab--search">
    <ul class="tab__bar">
      <li
        class="tab__item"
        v-for="(item, index) in tabList"
        :class="currentTab === item[codeKey] ? 'tab__item--selected' : ''"
        :key="index"
      >
        <button
          type="button"
          class="tab__button"
          role="tab"
          aria-selected="false"
          @click="tabClick(item)"
          :class="disabledCodeKeyList.includes(item[codeKey]) ? 'disabled' : ''"
        >
          <div class="tab__button-text">
            {{ item[nameKey] }}
            <template v-if="useTabNum">
              <p class="tab__button-subtext">{{ item[numKey] }}</p>
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
      required: true
    },
    useTabNum: {
      type: Boolean,
      required: false
    },
    nameKey: {
      type: String,
      default: "title",
      required: false
    },
    codeKey: {
      type: String,
      default: "id",
      required: false
    },
    numKey: {
      type: String,
      default: "num",
      required: false
    },
    activeTab: {
      type: String,
      required: false
    },
    disabledCodeKeyList: {
      type: String,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      currentTab: ""
    };
  },
  methods: {
    tabClick(tabObj) {
      this.currentTab = tabObj[this.codeKey];
      this.$emit("tabClick", { tabObj });
    }
  },
  created() {
    this.currentTab = this.activeTab;
  }
};
</script>

<style lang="scss" scoped>
@import "group-tab";
// 안쓰는 tab disabled 처리 위해 임시로 추가
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
