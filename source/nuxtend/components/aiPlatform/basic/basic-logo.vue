<template lang="html">
  <div>
    <router-link :to="url" :is="useRouterLink ? 'router-link' : 'div'">
      <img :width="width" :height="height" :src="src" :alt="alt" />
      <span class="text-title" v-if="textTitle">{{ textTitle }}</span>
    </router-link>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-logo",
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
    },
    useRouterLink: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
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
