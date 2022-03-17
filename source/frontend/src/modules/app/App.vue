<template lang="html">
  <div id="app">
    <h1>Hello!! IRIS Web Developement Framework World!!</h1>
    <a href="/sample/logout"> LOG OUT!!! </a>
    <br />
    <img :src="userPhoto" />
    <h2>{{ name }}</h2>
    <ul>
      <li>
        <router-link to="/app/form-sample">Form Sample</router-link>
      </li>
      <li>
        <router-link to="/app/image-list-sample">Image List Sample</router-link>
      </li>
      <li>
        <router-link to="/app/search-template">Search Template Sample</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <axios-interceptor />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  name: "App",
  extends: {},
  props: {},
  computed: {
    ...mapGetters("sample", ["userPhoto", "name"])
  },
  components: {},
  watch: {},
  methods: {}
};
</script>
<style>
#app{
  background-color: #f7f9fc;
}
</style>
