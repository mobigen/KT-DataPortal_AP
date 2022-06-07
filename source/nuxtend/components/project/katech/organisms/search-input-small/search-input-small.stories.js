import SearchInputSmall from "./search-input-small.vue";

export default {
  title: 'Styled/Organisms/[PCFI] 검색 입력 필드',
  component: SearchInputSmall,
  decorators: [() => ({ template: '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 검색 입력 필드 </h2><story /></div>' })],
};

export const Default = () => ({
  components: { SearchInputSmall },
  template: '<SearchInputSmall></SearchInputSmall>'
});
