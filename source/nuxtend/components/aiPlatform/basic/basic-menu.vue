<template lang="html">
  <div id="basicMenu">
    <ul>
      <template v-for="(data, i) in menuList">
        <li :key="'menu_' + i">
          <router-link :to="data['url']">
            <basic-icon-label
              forProperty=""
              :textPreviousIcon="textPreviousIcon[i]"
              :textNextIcon="textNextIcon[i]"
            >
              {{ data["menuName"] }}
            </basic-icon-label>
          </router-link>
        </li>
        <span v-if="useSeparator && menuList.length !== i + 1">{{
          separator
        }}</span>
      </template>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicIconLabel from "@/components/aiPlatform/basic/basic-icon-label.vue";

export default {
  name: "basic-menu",
  extends: {},
  props: {
    menuList: {
      type: Array,
      require: true
    },
    useSeparator: {
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
  components: { BasicIconLabel },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
#basicMenu {
  ul {
    list-style: none;
    display: flex;
    li {
      a {
        display: flex;
        text-decoration: none;
        padding: 0 10px;
        color: black;
        #basicIconLabel {
          label {
            cursor: pointer;
          }
        }
      }
      a:hover {
        text-decoration: underline;
        color: red;
      }
    }
  }
}
</style>
