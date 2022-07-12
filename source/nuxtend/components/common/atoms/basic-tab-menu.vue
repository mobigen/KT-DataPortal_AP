<template lang="html">
  <div class="tab-menu-wrap">
    <ul>
      <li
        v-for="(data, i) in menuList"
        :key="'nav_' + i"
        :style="cssVariable"
        :class="{ isActive: currentTab === i }"
        @click="changeCurrentTab(i, data['menuId'])"
      >
        <span>{{ data["menuName"] }}</span>
        <span v-if="data['numberOfPosts'] !== null">
          <slot name="numberOfposts">({{ data["numberOfPosts"] }})</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-tab-menu",
  extends: {},
  props: {
    menuList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      currentTab: 0
    };
  },
  computed: {
    cssVariable() {
      return {
        "--width": `${100 / this.menuList.length}%`
      };
    }
  },
  components: {},
  watch: {},
  methods: {
    changeCurrentTab(index, menuId) {
      this.currentTab = index;
      this.$emit("tabMenuClick", menuId);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.isActive {
  background-color: black;
  color: white;
}
.tab-menu-wrap {
  width: 50%;
  ul {
    display: flex;
    padding: 0px;
    border: solid 1px black;
    list-style: none;
    li {
      width: var(--width);
      border: solid 1px black;
      padding: 5px;
      span {
        display: block;
        text-align: center;
      }
    }
    li:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
