<template lang="html">
  <div>
    <h1>{{ $t('index.hello-world') }}</h1>
    <div>
      MAIN PAGE
    </div>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
  import RSA from "rsajs";

  export default {
    name: "Index",
    mounted() {
    },
    methods: {
    }
  };
</script>
