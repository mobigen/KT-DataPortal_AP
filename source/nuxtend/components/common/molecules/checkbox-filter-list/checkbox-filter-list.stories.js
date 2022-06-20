import CheckboxFilterList from "./checkbox-filter-list.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "AiPlatform/Atoms/[PIFC] 체크박스 필터",
  components: CheckboxFilterList,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 체크박스 필터 </h2><story /></div>'
    })
  ],

  args: {
    useExpandButton: false,
    filterTitle: "제공기관",
    filterList: [
      { itemId: "b7", itemName: "도로교통공단" },
      { itemId: "b8", itemName: "한국지질자원연구원" },
      { itemId: "b9", itemName: "한국과학기술정보연구원" },
      { itemId: "b10", itemName: "국토교통부" },
      { itemId: "b11", itemName: "한국지질자원연구원" },
      { itemId: "b12", itemName: "도로교통공단1" },
      { itemId: "b13", itemName: "한국지질자원연구원2" },
      { itemId: "b14", itemName: "한국과학기술정보연구원3" },
      { itemId: "b15", itemName: "도로교통공단4" },
      { itemId: "b16", itemName: "한국지질자원연구원5" }
    ],
    selectCheckboxList: []
  },
  argTypes: {
    useExpandButton: {
      type: "boolean",
      control: {
        type: "radio",
        options: [true, false]
      }
    },
    filterTitle: {
      type: "string"
    },
    selectCheckboxList: {
      type: "array",
      control: {
        type: "object"
      }
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { CheckboxFilterList },
  template: `
    <checkbox-filter-list
      :use-expand-button="useExpandButton"
      filter-id="provider"
      :filter-title="filterTitle"
      :filter-list="filterList"
      :select-checkbox-list="selectCheckboxList"
      @changeCheckboxList="changeCheckboxList"
    />
  `,

  computed: {
    useExpandButton() {
      return args.useExpandButton;
    },
    filterTitle() {
      return args.filterTitle;
    },
    filterList() {
      return args.filterList;
    },
    selectCheckboxList() {
      return args.selectCheckboxList;
    }
  },
  methods: {
    changeCheckboxList(p) {
      action("changeCheckboxList")(p);
    }
  }
});
