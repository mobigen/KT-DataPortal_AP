<template lang="html">
  <div id="app">
    <h1>Hello!! IRIS Web Developement Framework World!!</h1>
    <a href="/sample/logout"> LOG OUT!!! </a>
    <ul>
      <li>
        <router-link to="/app/form-sample">Form Sample</router-link>
      </li>
      <li>
        <router-link to="/app/image-list-sample">Image List Sample</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <axios-interceptor />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "App",
  extends: {},
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>
