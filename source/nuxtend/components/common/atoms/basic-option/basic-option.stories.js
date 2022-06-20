import BasicOption from "./basic-option.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "AiPlatform/Atoms/[PIFC] sort 옵션 리스트 ",
  components: BasicOption,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) Basic-Option (통합검색 sort option) </h2><story /></div>'
    })
  ],

  args: {
    optionList: [
      { label: "정확도순", option: "accuracy" },
      { label: "수정일순", option: "updateDate" },
      { label: "조회순", option: "view" }
    ]
  },
  argTypes: {
    optionList: {
      type: "array",
      control: {
        type: "object"
      }
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { BasicOption },
  template: `<basic-option radioClass="radio--check" :optionList="optionList" type="text" name="radio-sort" @checkOption="sortOptionChange" /> `,
  computed: {
    optionList() {
      return args.optionList;
    }
  },
  methods: {
    sortOptionChange(p) {
      action("checkOption")(p);
    }
  }
});
