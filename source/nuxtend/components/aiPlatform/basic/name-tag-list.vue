<template lang="html">
  <div id="nameTagList">
    <div class="list-wrap" v-for="data in nameTagList">
      <basic-name-tag
        :nameTagObject="data"
        @nameTagClick="nameTagClick(data.id)"
        @dataOfInterest="dataOfInterest(data.id)"
        @dataSharing="dataSharing(data.id)"
        width="wide"
      >
        <template #header><div></div></template>
        <template #left-side><div></div></template>
        <template #right-side><div></div></template>
      </basic-name-tag>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicNameTag from "@/components/aiPlatform/basic/basic-name-tag.vue";

export default {
  name: "name-tag-list",
  extends: {},
  props: {
    nameTagList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
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
#nameTagList {
}
</style>
