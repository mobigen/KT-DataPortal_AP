<template lang="html">
  <div>
    <ul>
      <template v-for="(data, i) in sortList">
        <li :key="'sort_options_' + i" :class="{ isActive: currentSort === i }">
          <basic-button
            :componentId="data['orderBy'] + '_' + i"
            buttonCss="link-button"
            :hoverColor="true"
            :underline="false"
            @click="buttonClick"
          >
            <basic-icon-label
              forProperty=""
              :textPreviousIcon="textPreviousIcon[i]"
              :textNextIcon="textNextIcon[i]"
            >
              {{ data["sortName"] }}
            </basic-icon-label>
          </basic-button>
        </li>
        <span v-if="useSeparator && sortList.length !== i + 1">{{
          separator
        }}</span>
      </template>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import BasicIconLabel from "@/components/aiPlatform/basic/basic-icon-label.vue";
export default {
  name: "basic-sort-options",
  extends: {},
  props: {
    sortList: {
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
    return {
      currentSort: 0
    };
  },
  computed: {},
  components: { BasicButton, BasicIconLabel },
  watch: {},
  methods: {
    buttonClick(componentId) {
      const orderBy = componentId.split("_").shift();
      const index = componentId.split("_").pop();

      this.currentSort = Number(index);
      this.$emit("sortOptionsClick", orderBy);
    }
  }
};
</script>

<style lang="scss">
ul {
  list-style: none;
  display: flex;
  li {
    padding: 0 10px;
    #basicIconLabel {
      label {
        cursor: pointer;
      }
    }
  }
  .isActive {
    button {
      color: red;
    }
  }
}
</style>
