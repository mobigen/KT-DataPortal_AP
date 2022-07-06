import SearchInputBoard from "./search-input-Board.vue";

export default {
  title: 'Styled/Organisms/[PCFI] 검색 입력 필드',
  component: SearchInputBoard,
  decorators: [() => ({ template: '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 검색 입력 필드 </h2><story /></div>' })],
};

export const Default = () => ({
  components: { SearchInputBoard },
  template: '<SearchInputBoard></SearchInputBoard>'
});
