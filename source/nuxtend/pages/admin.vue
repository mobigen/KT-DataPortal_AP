<template>
  <div>
    <h3>admin-index</h3>
    <nuxt-child />
    <json-viwer />
  </div>
</template>

<script>
export default {
  name: "index-admin",

  created() {
    // console.log(process.env.NODE_ENV);
  }
};
</script>
