<template>
  <div>
    <katech-header />
    <main class="main">
      <nuxt :key="$route.fullPath"/>
    </main>
    <katech-footer />
  </div>
</template>

<script type="text/javascript">
import KatechHeader from "./header/header.vue";
import KatechFooter from "./footer/footer.vue";

export default {
  name: "KatechLayer",
  components: {
    KatechHeader,
    KatechFooter
  }
};
</script>
