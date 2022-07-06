<template lang="html">
  <div class="lnb">
    <h2 class="lnb__title">
      {{ title }}
    </h2>
    <ul class="lnb__list">
      <li class="lnb__item" v-for="(item, index) in list" :key="index" :class="item.isSelected ? 'lnb__item--selected' : ''">
        <a href="#" class="lnb__link">
          {{item.title}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "GroupLnb",
  extends: {},
  props: {

  },
  data() {
    return {
      title : "마이페이지",
      list: [
        {id: '1',title: '대시보드', isSelected: false},
        {id: '2',title: '관심데이터', isSelected: false},
        {id: '3',title: '내 활용내역', isSelected: true},
        {id: '4',title: '내 활용사례', isSelected: false},
        {id: '5',title: '내 문의내역', isSelected: false},
        {id: '4',title: '프로젝트 관리', isSelected: false},
        {id: '5',title: '개인정보 관리', isSelected: false},
      ]
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "group-lnb";
</style>
