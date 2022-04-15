<template>
  <!-- div에 id를 지정하면, 그 root page의 아래로 layout이 잡힌다.-->
  <!-- <div id="admin"> 으로 할 경우, admin 페이지 아래로 경로가 잡힘.-->
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "./layout/header.vue";
export default {
  name: "",
  components: {
    Header
  }
};
</script>