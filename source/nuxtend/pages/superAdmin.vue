<template>
  <div>
    <h3>superAdmin-index</h3>
    <axios-interceptor />
    <nuxt-child />
    <json-viwer />
  </div>
</template>

<script>
export default {
  name: "index-super",

  created() {
    // console.log(process.env.NODE_ENV);
  }
};
</script>
