<template lang="html">
  <div class="tab-menu-wrap">
    <ul>
      <li
        v-for="(data, i) in menuList"
        :key="'nav_' + i"
        :style="cssVariable"
        :class="{ isActive: currentTab === i }"
        @click="changeCurrentTab(i, data['data'])"
      >
        <span>{{ data["menuName"] }}</span>
        <span>({{ data["numberOfPosts"] }})</span>
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
    changeCurrentTab(index, data) {
      this.currentTab = index;
      this.$emit("currentTabData", data);
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
