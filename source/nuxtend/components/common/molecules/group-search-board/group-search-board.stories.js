import GroupSearchBoard from './group-search-borad.vue';

export default {
  title: 'Styled/Molecules/[PCFI] 검색',
  components: GroupSearchBoard,
  decorators: [() => ({ template: '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 데이터 검색 </h2><story /></div>' })],
};

export const Default = () => ({
  components: { GroupSearchBoard },
  template: '<GroupSearchBoard></GroupSearchBoard>'
});
