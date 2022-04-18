<template>
  <div>
    <h3>SUPER-MAIN</h3>
    <div style="border: 1px solid red; width: 100px">
      <icon data="@icon/minus.svg" aria-hidden="true"></icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  created() {
    console.log(process.env.NODE_ENV);
  }
};
</script>
