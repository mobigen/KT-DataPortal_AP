import BasicTagList from "./basic-tag-list.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "AiPlatform/Atoms/[PIFC] 태그 리스트 ",
  components: BasicTagList,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) 태그 리스트 </h2><story /></div>'
    })
  ],

  args: {
    tagList: [
      { itemId: 1, itemName: "결빙사고" },
      { itemId: 2, itemName: "사고다발지역" },
      { itemId: 3, itemName: "교통체증" },
      { itemId: 4, itemName: "대중교통" },
      { itemId: 5, itemName: "자전거" }
    ],
    useCancelButton: false,
    previousText: "#"
  },
  argTypes: {
    tagList: {
      type: "array",
      control: {
        type: "object"
      }
    },
    useCancelButton: {
      type: "boolean",
      control: {
        type: "radio",
        options: [true, false]
      }
    },
    previousText: {
      type: "string"
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { BasicTagList },
  template: `<basic-tag-list :tagList="tagList" :previousText="previousText" :useCancelButton="useCancelButton" @tagClick="recommendTagClick" />`,
  computed: {
    tagList() {
      return args.tagList;
    },
    useCancelButton() {
      return args.useCancelButton;
    },
    previousText() {
      return args.previousText;
    }
  },
  methods: {
    recommendTagClick(p) {
      action("tagClick")(p);
    }
  }
});
