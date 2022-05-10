<template lang="html">
  <div class="tag-item">
    <span v-if="previousText" class="prev-text">{{ previousText }}</span>
    <span>{{ tagName }}</span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-single-tag",
  extends: {},
  props: {
    tagName: {
      type: String,
      require: true
    },
    previousText: {
      type: String,
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
.tag-item {
  display: flex;
  height: 30px;
  background-color: lightgray;
  padding: 0px 10px;
  margin-right: 10px;
  .prev-text {
    padding: 4px 10px;
    margin-right: -15px;
  }
  span {
    padding: 4px 10px;
  }
}
</style>
