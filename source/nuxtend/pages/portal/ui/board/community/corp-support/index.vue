<template>
  <div>
    <h1>기업지원</h1>
    <p>자동차분야의 중소,벤처기업의 효율적,체계적 성장지원을 위한 데이터 분석 및 컨설팅을 지원합니다.</p>

    <basic-button @click="goApply">
      <slot>
        <span>지원신청서 작성</span>
      </slot>
    </basic-button>
  </div>
</template>

<script>
import BasicButton from "@common/atoms/basic-button"

export default {
  name: "community-corp-support",
  components: {BasicButton},
  data() {
    return {}
  },
  methods: {
    goApply() {
      this.$router.push({append: true, path: "register"})
    }
  }
}
</script>

<style scoped>

</style>
