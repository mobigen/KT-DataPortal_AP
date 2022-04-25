<template>
  <div>
    <h3>user-app (사용자)</h3>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "app-app",
  created() {
    console.log("user-app created");
  },
  layout: "layout-app"
};
</script>
