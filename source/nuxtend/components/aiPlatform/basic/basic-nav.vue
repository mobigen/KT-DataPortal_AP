<template>
  <nav id="basicNav">
    <ul>
      <li v-for="(data, i) in menuList" :key="'nav_' + i" :style="cssVariable">
        <router-link :to="data['url']">{{ data["menuName"] }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "basic-nav",
  extends: {},
  props: {
    menuList: {
      type: Array,
      require: true
    }
  },
  components: {},
  computed: {
    cssVariable() {
      return {
        "--width": `${100 / this.menuList.length}%`
      };
    }
  },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#basicNav {
  ul {
    display: flex;
    li {
      display: flex;
      width: var(--width);
      a {
        font-size: 1.1rem;
        text-decoration: none;
        text-align: center;
        vertical-align: middle;
        color: inherit;
        width: 100%;
      }
      a:hover {
        color: inherit;
      }
    }
    li:hover {
      background-color: slategrey;
    }
  }
}
</style>
