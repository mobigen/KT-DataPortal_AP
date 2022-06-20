import BasicTree from "./basic-tree.vue";

export default {
  title: "AiPlatform/Atoms/[PIFC] 트리",
  components: BasicTree,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 40px; font-size: 20px; color: #212121;">(예시) Tree (vuex와 연동되어있어서, 테스트 불가, view만 가능) </h2><story /></div>'
    })
  ],

  args: {
    categoryObj: {
      NODE_NM: "ROOT",
      PRNTS_ID: "0_0_0",
      NODE_ID: "0_0_0",
      children: [
        {
          NODE_NM: "컴퓨터",
          PRNTS_ID: "0_0_0",
          NODE_ID: "cfeba9ad-5bf4-493e-a317-ffa517b7b0d9",
          children: [
            {
              NODE_NM: "마우스",
              PRNTS_ID: "cfeba9ad-5bf4-493e-a317-ffa517b7b0d9",
              NODE_ID: "dce0e45a-8645-4d35-918f-615c850fbec9"
            },
            {
              NODE_NM: "키보드",
              PRNTS_ID: "cfeba9ad-5bf4-493e-a317-ffa517b7b0d9",
              NODE_ID: "78c0f8b1-989c-4902-97ad-6657eeeef14e"
            },
            {
              NODE_NM: "모니터",
              PRNTS_ID: "cfeba9ad-5bf4-493e-a317-ffa517b7b0d9",
              NODE_ID: "66c9b96a-3f42-45d6-b68b-beb4dbf27b99"
            }
          ]
        },
        {
          NODE_NM: "가구",
          PRNTS_ID: "0_0_0",
          NODE_ID: "7a65736c-69d8-4709-b5ee-4b37cf23551b"
        },
        {
          NODE_NM: "게임",
          PRNTS_ID: "0_0_0",
          NODE_ID: "19cd1e47-c54d-4432-87f1-0b056b50ef55",
          children: [
            {
              NODE_NM: "RPG",
              PRNTS_ID: "19cd1e47-c54d-4432-87f1-0b056b50ef55",
              NODE_ID: "cc7b53a7-46cf-4ee5-b17d-ab47f7c94005",
              children: [
                {
                  NODE_NM: "창세기전",
                  PRNTS_ID: "cc7b53a7-46cf-4ee5-b17d-ab47f7c94005",
                  NODE_ID: "cdb38874-e7a0-4f55-9cac-71a7128234db"
                },
                {
                  NODE_NM: "디아블로",
                  PRNTS_ID: "cc7b53a7-46cf-4ee5-b17d-ab47f7c94005",
                  NODE_ID: "6820f3e3-08dc-4cae-b46f-d83685f5be83"
                }
              ]
            },
            {
              NODE_NM: "FPS",
              PRNTS_ID: "19cd1e47-c54d-4432-87f1-0b056b50ef55",
              NODE_ID: "8fb0a77f-61ce-4369-b801-ebdc0ccbe8a6",
              children: [
                {
                  NODE_NM: "오버워치",
                  PRNTS_ID: "8fb0a77f-61ce-4369-b801-ebdc0ccbe8a6",
                  NODE_ID: "dcfef5e8-f843-4a02-954e-6a92e2ca232e"
                },
                {
                  NODE_NM: "doom",
                  PRNTS_ID: "8fb0a77f-61ce-4369-b801-ebdc0ccbe8a6",
                  NODE_ID: "af1016a6-3485-4a9c-a709-866cc6f96ae2"
                },
                {
                  NODE_NM: "배틀필드",
                  PRNTS_ID: "8fb0a77f-61ce-4369-b801-ebdc0ccbe8a6",
                  NODE_ID: "851bec9e-02c0-49aa-b189-b92b3dc56d74"
                }
              ]
            },
            {
              NODE_NM: "MMORPG",
              PRNTS_ID: "19cd1e47-c54d-4432-87f1-0b056b50ef55",
              NODE_ID: "088249f3-0778-4dcf-b51e-828706c6f818"
            }
          ]
        }
      ]
    }
  },
  argTypes: {
    categoryObj: {
      type: "object",
      control: {
        type: "object"
      }
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { BasicTree },
  template: `<basic-tree :component-key="treeObj.componentKey" :tree-data="categoryObj" :tree-key="treeObj.treeKey" @selectionChange="selectionChange"   />`,
  data() {
    return {
      treeObj: {
        componentKey: "storyBookTestKey",
        treeKey: {
          NODE_NM: "NODE_NM", // node title
          NODE_ID: "NODE_ID", // node key
          PRNTS_ID: "PRNTS_ID" // parent key
        }
      }
    };
  },
  computed: {
    categoryObj() {
      return args.categoryObj;
    }
  }
});
