<template>
  <div>
    <h3>sample페이지</h3>
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
