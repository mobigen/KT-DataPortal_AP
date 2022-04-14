<template>
  <div>SUPER-MAIN</div>
</template>

<script>
export default {
  name: "IndexPage",
  created() {
    console.log(process.env.NODE_ENV);
  }
};
</script>
