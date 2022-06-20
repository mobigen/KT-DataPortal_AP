import SearchResultBox from "./search-result-box.vue";

export default {
  title: "AiPlatform/Atoms/[PIFC] 검색 결과",
  components: SearchResultBox,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 검색 결과 </h2><story /></div>'
    })
  ],

  args: {
    showSearchResultBox: false,
    searchResultSuccess: false,
    searchKeywordList: ["결빙", "사고"],
    searchKeyword: "",
    numOfSearchResult: 0
  },
  argTypes: {
    showSearchResultBox: {
      type: "boolean",
      control: {
        type: "radio",
        options: [true, false]
      }
    },
    searchResultSuccess: {
      type: "boolean",
      control: {
        type: "radio",
        options: [true, false]
      }
    },
    searchKeywordList: {
      type: "array",
      control: {
        type: "object",
        options: ["결빙", "사고"]
      }
    },
    searchKeyword: {
      type: "string"
    },
    numOfSearchResult: {
      type: "number"
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { SearchResultBox },
  template: `
    <search-result-box
      class="contents-search-result"
      :showSearchResultBox="showSearchResultBox"
      :searchResultSuccess="searchResultSuccess"
    >
    <template
      v-if="searchKeywordList.length < 2"
      v-slot:resultSuccessTrueText
    >
      <strong>'{{ searchKeyword }}'</strong>에 대한 검색결과 총
      <strong>{{ numOfSearchResult }}</strong> 건이 검색되었습니다.
    </template>

    <template v-else v-slot:resultSuccessTrueText>
      <strong
        v-for="(item, index) in searchKeywordList"
        :key="'searchKeyword_' + index"
      >'{{ item }}'
        <template v-if="searchKeywordList.length - 1 !== index"
        ><sapn style="color: black">&</sapn></template
        >
      </strong>
      검색 결과, 총 <strong>{{ numOfSearchResult }}</strong> 건 입니다.
    </template>
    </search-result-box>
  `,

  computed: {
    showSearchResultBox() {
      return args.showSearchResultBox;
    },
    searchResultSuccess() {
      return args.searchResultSuccess;
    },
    searchKeywordList() {
      return args.searchKeywordList;
    },
    searchKeyword() {
      return args.searchKeyword;
    },
    numOfSearchResult() {
      return args.numOfSearchResult;
    }
  },
  methods: {}
});
