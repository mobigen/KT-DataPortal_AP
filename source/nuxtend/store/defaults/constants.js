export const state = () => ({
  constants: Object.freeze({
    TITLE: "KT_DATA_PORTAL",
    DEFAULT_NAME_COLUMN: "KOR_NM",
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
            iconData: "pen"
          }
        },
        DELETE_BTN: {
          remove: {
            buttonType: "icon",
            buttonName: "삭제",
            buttonCss: "icon-button",
            iconData: "minus"
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
        NODE_NM: "NODE_NM",
        NODE_ID: "NODE_ID",
        PRNTS_ID: "PRNTS_ID"
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
      },
      KEYS: {
        PROVIDER: "provider",
        TYPE: "type",
        KEYWORD: "keyword"
      }
    },
    API_ROUTER: {
      PARAM: {
        NO: "no",
        API_NM: "api_nm",
        CMD: "cmd",
        URL: "url",
        MODE: "mode",
        METH: "meth",
        CTGRY: "ctgry",
        ROUTE_URL: "route_url",
        PARAMS: "params",
        NM: "nm",
        DATA_TYPE: "data_type",
        DEFLT_VAL: "deflt_val",
        API_INFO: "api_info",
        API_PARAMS: "api_params",
        HEADER: "header"
      },
      METH: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT"
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
