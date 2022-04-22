<template lang="html">
  <div>
    <router-link :to="url" :is="routerLinkUse">
      <img :width="width" :height="height" :src="src" :alt="alt" />
      <span class="text-title" v-if="textTitle">{{ textTitle }}</span>
    </router-link>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "biasic-logo",
  extends: {},
  props: {
    url: {
      type: String,
      require: false
    },
    width: {
      type: String,
      require: false
    },
    height: {
      type: String,
      require: false
    },
    src: {
      type: String,
      require: false
    },
    alt: {
      type: String,
      require: false
    },
    textTitle: {
      type: String,
      require: false
    }
  },
  data() {
    return {};
  },
  computed: {
    routerLinkUse() {
      return this.url === undefined || this.url === "" ? "div" : "router-link";
    }
  },
  components: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
.text-title {
  font-size: 2rem;
  vertical-align: top;
  color: black;
}
a:link {
  text-decoration: none;
}
</style>
