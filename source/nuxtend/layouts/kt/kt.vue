<template>
  <div>
    <kt-header />
    <main class="main">
      <nuxt />
    </main>
    <kt-footer />
  </div>
</template>

<script type="text/javascript">
import ktHeader from "./header/header.vue";
import ktFooter from "./footer/footer.vue";

export default {
  name: "ktLayer",
  components: {
    ktHeader,
    ktFooter
  }
};
</script>
