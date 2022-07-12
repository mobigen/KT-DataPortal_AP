<template lang="html">
  <div class="lnb">
    <h2 class="lnb__title">
      {{ title }}
    </h2>
    <ul class="lnb__list">
      <li
        class="lnb__item"
        v-for="(item, index) in list"
        :key="index"
        :class="item.isSelected ? 'lnb__item--selected' : ''"
      >
        <!-- 내 활용내역 외 다른 메뉴 disable 처리 위해 임시로 class 설정-->
        <a
          href="#"
          class="lnb__link"
          :class="disabledMenuIdList.includes(item.id) ? 'disabled' : ''"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "GroupLnb",
  extends: {},
  props: {},
  data() {
    return {
      title: "마이페이지",
      list: [
        { id: "1", title: "대시보드", isSelected: false },
        { id: "2", title: "관심데이터", isSelected: false },
        { id: "3", title: "내 활용내역", isSelected: true },
        { id: "4", title: "내 활용사례", isSelected: false },
        { id: "5", title: "내 문의내역", isSelected: false },
        { id: "6", title: "프로젝트 관리", isSelected: false },
        { id: "7", title: "개인정보 관리", isSelected: false }
      ],
      disabledMenuIdList: ["1", "2", "4", "5", "6", "7"]
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "group-lnb";
// 안쓰는 메뉴 disabled 처리 위해 임시로 추가
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
