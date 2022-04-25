<template lang="html">
  <div class="basic-tag-wrap">
    <template v-for="(obj, key, i) in selectedNodeList">
      <div class="basic-tag" :key="'tag_' + i" :id="obj[nodeIdText]">
        <span>
          {{ obj[nodeTitle] }}
        </span>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "item",
  extends: {},
  props: {
    selectedNodeList: {
      type: Object,
      require: true
    },
    nodeTitle: {
      type: String,
      require: true
    },
    nodeIdText: {
      type: String,
      require: true
    }
  },
  data() {
    return {};
  },
  components: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style scoped>
.basic-tag-wrap {
  /*display: flex;*/
}
.basic-tag {
  padding: 5px;
}
.basic-tag span {
  padding: 4px 10px;
  background-color: lightgrey;
  border-radius: 10px;
}
</style>
