<template>
  <nav id="basicNav">
    <ul class="depth_0">
      <li v-for="(data, i) in menuList" :key="'nav_' + i" :style="cssVariable">
        <router-link :to="data['url']">{{ data["menuName"] }}</router-link>
<!--        <ul v-if="data['children'].length > 0" class="depth_1">-->
<!--          <li v-for="(cdata, ci) in data['children']" :key="'nav_child_' + ci">-->
<!--            <router-link :to="cdata['url']">-->
<!--              {{ cdata["menuName"] }}-->
<!--            </router-link>-->
<!--          </li>-->
<!--        </ul>-->
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

<style scoped lang="scss">
#basicNav {
  .depth_0 {
    margin: auto;
    display: flex;
    > li {
      position: relative;
      width: var(--width);
      padding: 10px;
      a {
        display: block;
        font-size: 1.1rem;
        text-decoration: none;
        text-align: center;
        color: inherit;
      }
      .depth_1 {
        position: absolute;
        top: 100%;
        left: 0;
        display: none;
        width: 100%;
        height: 150px;
        background-color: rgba(119, 136, 153, 0.379);
        li {
          padding: 10px;
        }
      }
    }
    li:hover {
      background-color: slategrey;
    }
    &:hover {
      ul {
        display: block;
        z-index: 999;
      }
    }
  }
}
</style>
