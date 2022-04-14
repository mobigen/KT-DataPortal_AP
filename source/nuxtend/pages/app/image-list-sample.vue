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
    <template v-if="userPhotoList.data !== undefined"
      ><img
        v-for="image in userPhotoList.data.data"
        :src="image.src"
        :key="image.id"
        @click="clickImage(image.src)"
      />
    </template>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ImageListSample",
  extends: {},
  props: {},
  data: function () {
    return {
      count: 5
    };
  },
  computed: {
    ...mapGetters("sample", ["userPhotoList"])
  },
  components: {},
  watch: {},
  methods: {
    ...mapActions("sample", ["getUserPhotos"]),
    ...mapMutations("sample", ["setPhoto"]),
    getImages(e) {
      e.preventDefault();
      this.getUserPhotos(this.count);
    },
    clickImage(src) {
      this.setPhoto(src);
    }
  }
};
</script>
