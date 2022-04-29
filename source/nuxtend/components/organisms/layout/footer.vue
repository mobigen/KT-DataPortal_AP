<template lang="html">
  <div>
    <div><img :src="$t('footer.company-logo')" /></div>
    <div>{{ $t("footer.company-copyright") }}</div>
    <div>{{ $t("footer.company-title") }}</div>
    <div>{{ $t("footer.company-sub-title") }}</div>
  </div>
</template>

<i18n src="./footer.json"></i18n>

<script type="text/javascript">
export default {
  name: "Footer"
};
</script>
