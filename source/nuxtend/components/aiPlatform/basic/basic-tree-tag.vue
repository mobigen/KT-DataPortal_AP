<template lang="html">
  <div>
    <template v-for="(obj, key, i) in selectedNodeList">
      <div
        class="basic-tree-tag"
        :key="'tag_' + i"
        :id="obj[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
      >
        <span>
          {{ obj[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_NAME]] }}
        </span>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  name: "item",
  extends: {},
  props: {
    selectedNodeList: {
      type: Object,
      require: true
    },
    treeKey: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style scoped>
.basic-tree-tag {
  padding: 5px;
}
.basic-tree-tag span {
  padding: 4px 10px;
  background-color: lightgrey;
  border-radius: 10px;
}
</style>
