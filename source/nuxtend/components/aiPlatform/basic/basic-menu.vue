<template lang="html">
  <div>
    <ul>
      <template v-for="(data, i) in menuList">
        <li :key="'menu_' + i">
          <router-link :to="data['url']">
            <span v-if="textPreviousIcon">{{ textPreviousIcon[i] }}</span>
            {{ data["menuName"] }}
            <span v-if="textNextIcon">{{ textNextIcon[i] }}</span>
          </router-link>
        </li>
        <span v-if="separatorUse && menuList.length !== i + 1">{{
          separator
        }}</span>
      </template>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-menu",
  extends: {},
  props: {
    menuList: {
      type: Array,
      require: true
    },
    separatorUse: {
      type: Boolean,
      require: false,
      default: false
    },
    separator: {
      type: String,
      require: false
    },
    textPreviousIcon: {
      type: Array,
      require: false
    },
    textNextIcon: {
      type: Array,
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  display: flex;
  li {
    a {
      text-decoration: none;
      padding: 0px 10px;
      color: black;
    }
    a:hover {
      text-decoration: underline;
      color: red;
    }
  }
}
</style>
