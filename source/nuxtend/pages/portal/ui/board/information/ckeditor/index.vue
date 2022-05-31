<template>
  <div>
    <ckeditor4
      v-model="content"
    ></ckeditor4>
    <button @click="click">컨텐츠 내용 alert</button>
  </div>
</template>

<script>

import Ckeditor4 from "@component/DPTeam/ckeditor4";
export default {
  name: "ckeditor",
  components: {Ckeditor4},
  data() {
    return {
      content: ""
    }
  },
  methods: {
    click() {
      alert(this.content)

    }
  },
}
</script>

<style scoped>
</style>
