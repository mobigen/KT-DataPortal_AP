<template lang="html">
  <div class="subject">
    <div class="subject__wrap">
      <div class="subject__title-wrap">
        <h3 v-if="useTitle" class="subject__title">
          <slot name="title"></slot>
        </h3>
        <p v-if="useDescription" class="subject__desc">
          <slot name="description"></slot>
        </p>
        <!-- <ul class="subject__list">
          <li class="subject__list-item">support-explain</li>
          <li class="subject__list-item">문의 주신 내용은 충분한 검토 및 확인 후 답변 드리겠습니다.</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Subject",
  extends: {},
  props: {
    useTitle: {
      type: Boolean,
      default: true
    },
    useDescription: {
      type: Boolean,
      default: true
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./subject.scss";
</style>
