<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "index-sample",
  created() {
    console.log(process.env.NODE_ENV);
  }
};
</script>
