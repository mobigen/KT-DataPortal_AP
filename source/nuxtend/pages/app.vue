<template>
  <div>
    <h3>app-index</h3>
    <nuxt-child />
    <json-viwer />
  </div>
</template>

<script>
export default {
  name: "index-app",
  layout: "app",
  created() {
    // console.log(process.env.NODE_ENV);
  }
};
</script>
