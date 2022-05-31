export const state = () => ({
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
          edit: {
            buttonType: "icon",
            buttonName: "수정",
            buttonCss: "icon-button",
            iconData: "@icon/minus.svg"
          }
        },
        DELETE_BTN: {
          remove: {
            buttonType: "icon",
            buttonName: "삭제",
            buttonCss: "icon-button",
            iconData: "@icon/minus.svg"
          }
        }
      }
    },
    MSG: {
      PLACEHOLDER: "값을 입력해 주세요."
    },
    TREE: {
      TREE_TYPE: {
        ALL: "ALL",
        LEAF: "LEAF"
      },
      TREE_MODE: {
        VIEW: "VIEW",
        EDITOR: "EDITOR"
      },
      CLICK_MODE: {
        EDIT: "edit",
        ADD_CHILD: "addChild"
      },
      TREE_KEY: {
        NODE_NAME: "node_name",
        NODE_ID: "node_id",
        PARENT_ID: "parent_id"
      },
      OPEN_TYPE: {
        FIRST: "first",
        ALL: "all",
        NONE: "none"
      }
    },
    PAGING: {
      TOTAL_COUNT: "totalCount",
      ITEMS_PER_PAGE: "itemsPerPage",
      VISIBLE_PAGES: "visiblePages",
      PAGE: "page"
    },
    SERIAL: {
      WEB: "web",
      DB: "db"
    },
    FILTER: {
      TYPE: {
        CHECKBOX: "checkbox",
        TREE: "tree"
      }
    },
    API_ROUTER: {
      PARAM: {
        API_NM: "API_NM",
        CMD: "CMD",
        URL: "URL",
        MODE: "MODE",
        METH: "METH",
        CTGRY: "CTGRY",
        PARAMS: "PARAMS",
        NM: "NM",
        DATA_TYPE: "DATA_TYPE",
        DEFLT_VAL: "DEFLT_VAL"
      },
      METH: {
        GET: "GET",
        POST: "POST"
      },
      MODE: {
        REMOTE_CALL: "REMOTE CALL",
        MESSAGE_PASSING: "MESSAGE PASSING"
      }
    }
  })
});

export const getters = {
  CONSTANTS: (state) => {
    return state.constants;
  }
};

export const mutations = {};

export const actions = {};
