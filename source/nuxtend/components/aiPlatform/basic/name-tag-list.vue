<template lang="html">
  <div id="nameTagList" :class="[width]" :style="cssVariable">
    <div class="list-wrap" v-for="data in nameTagList">
      <basic-name-tag
        :nameTagObject="data"
        :width="width"
        @nameTagClick="nameTagClick(data.id)"
        @dataOfInterest="dataOfInterest(data.id)"
        @dataSharing="dataSharing(data.id)"
      >
        <template #header>
          <slot name="header"><div></div></slot>
        </template>
        <template #body-top>
          <slot name="body-top"></slot>
        </template>
        <template #body-middle>
          <slot name="body-middle"></slot>
        </template>
        <template #body-bottom>
          <slot name="body-bottom"></slot>
        </template>
        <template #footer>
          <slot name="body-top"></slot>
        </template>
        <template #left-side>
          <slot name="left-side"><div></div></slot>
        </template>
        <template #right-side>
          <slot name="right-side"><div></div></slot>
        </template>
      </basic-name-tag>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicNameTag from "@/components/aiPlatform/basic/basic-name-tag.vue";

export default {
  name: "name-tag-list",
  template: "",
  extends: {},
  props: {
    nameTagList: {
      type: Array,
      require: true
    },
    width: {
      type: String,
      require: false,
      default: "wide"
    },
    nameTagColumnCount: {
      type: Number,
      require: false,
      default: 4
    }
  },
  data() {
    return {};
  },
  computed: {
    cssVariable() {
      return {
        "--grid-template-columns": `repeat(${this.nameTagColumnCount}, 1fr)`
      };
    }
  },
  components: {
    BasicNameTag
  },
  watch: {},
  methods: {
    dataOfInterest(id) {
      this.$emit("dataOfInterest", id);
    },
    dataSharing(id) {
      this.$emit("dataSharing", id);
    },
    nameTagClick(id) {
      this.$emit("nameTagClick", id);
    }
  },
  created() {}
};
</script>

<style lang="scss">
#nameTagList.wide {
}
#nameTagList.narrow {
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  #atomsNarrowNameTag {
    width: 170px;
    height: 200px;
  }
}
</style>
