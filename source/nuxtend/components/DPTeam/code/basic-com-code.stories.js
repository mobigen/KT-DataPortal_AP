import BasicComCode from "./basic-com-code.vue";
import {action} from "@storybook/addon-actions";

export default {
  title: "DPTeam/Basic-Com-Code",
  component: BasicComCode,
  args: {
    title: "제목 입니다",
    content: "<b>강조표시</b>원투쓰리포파이브씩수",
    type: "default"
  },
  argTypes: {
    type: {
      type: "string",
      description: "Input 또는 Select 타입을 지정 합니다.",
      control: {
        type: "select",
        options: ["select", "checkbox", "radio"]
      }
    },
    codeId: {
      type: "string",
      description: "공통 코드의 ID 값을 지정 합니다."
    },
    dataList: {
      type: "string",
      description: "공통 코드 목록 데이터값을 지정 합니다."
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<BasicComCode @onChanged="onChanged"/>'
      },
      iframeHeight: 300
    }
  }
};

export const Normal = (args, { argTypes }) => {
  return {
    components: { BasicComCode },
    template: `
      <div>
        <BasicComCode
          @onChanged="onChanged"
          :type="type"
          :codeId="codeId"
          :dataList="dataList"
        />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
<!--        <button @click="onModal"> Modal Example </button>-->
      </div>
    `,
    computed: {
      type() {
        return args.type;
      },
      codeId() {
        return args.codeId;
      },
      dataList() {
        return args.dataList;
      }
    },
    methods: {
      onChanged(p) {
        action("close")(p);
      }
    }
  };
};
