<!--커뮤니티-->
<template>
  <div>
    <h1>커뮤니티</h1>
    <ul>
      <li>
        <router-link
          :to="{ path: '/portal/ui/board/community/contest' }"
        >경진대회</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "community"
}
</script>

<style scoped>

</style>
