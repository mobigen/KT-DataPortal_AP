const constants = {
  namespaced: true,

  state: {
    constants: Object.freeze({
      TITLE: "KT_DATA_PORTAL",
      DEFAULT_NAME_COLUMN: "kor_name",
      META_TYPE: {
        0: "text",
        1: "integer",
        2: "binary"
      },
      BUTTONS: {
        ACTION_NAME: {
          EDIT: "edit",
          REMOVE: "remove"
        },
        TABLE: {
          EDIT_BTN: {
            buttonName: "수정",
            buttonCss: "icon-button",
            iconData: "@icon/minus.svg",
            buttonAction: "edit"
          },
          DELETE_BTN: {
            buttonName: "삭제",
            buttonCss: "icon-button",
            iconData: "@icon/minus.svg",
            buttonAction: "remove"
          }
        }
      },
      MSG: {
        PLACEHOLDER: "값을 입력해 주세요."
      }
    })
  },
  mutations: {},
  getters: {
    CONSTANTS: (state) => {
      return state.constants;
    }
  },
  actions: {}
};

export default constants;
