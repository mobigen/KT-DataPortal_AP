<template lang="html">
  <div>
    <ul>
      <li v-for="(data, i) in menuList" :key="'menu_' + i">
        <router-link :to="menuList[i]['url']">
          <span v-if="textPreviousIcon">{{ textPreviousIcon[i] }}</span>
          {{ menuList[i]["menuName"] }}
          <span v-if="textNextIcon">{{ textNextIcon[i] }}</span>
        </router-link>
        <span v-if="separatorUse(menuList.length, i)">{{ separator }}</span>
      </li>
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
  methods: {
    separatorUse(menuListLength, index) {
      let notEmpSeparator = false;
      notEmpSeparator = this.separator !== undefined && this.separator !== "";

      return notEmpSeparator && menuListLength !== index + 1;
    }
  }
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
