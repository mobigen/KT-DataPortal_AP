<template lang="html">
  <div>
    <h1>Image List Sample</h1>
    <form @submit="getImages">
      <label for="count">Input Random Generate Image Counts </label>
      <input
        type="number"
        id="count"
        v-model="count"
        value="10"
        min="1"
        max="50"
        step="1"
      />
      <button type="submit">Submit</button>
    </form>
    <br />
    <br />
    <img v-for="image in images" :src="image.src" :key="image.id" />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Page2",
  extends: {},
  props: {},
  data: function () {
    return {
      images: [],
      count: 0
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    async getImages() {
      this.images = await this.$api.get(
        "/api/sample-images?count=" + this.count
      );
    }
  }
};
</script>
