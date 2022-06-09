<template lang="html">
  <div id="api-router-wrapper">
    <p v-show="apiName">API_NM : 수정불가 (삭제 후 재등록)</p>

    <!-- apiRouter용 하드코딩-->
    <div class="api-router-row">
      <basic-label forProperty="">API_NM</basic-label>

      <basic-label v-if="apiName" forProperty="">{{
        apiObj["API_NM"]
      }}</basic-label>
      <basic-input
        v-else
        formInputType="text"
        labelName="API_NM"
        :inputData="apiObj['API_NM']"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">CTGRY</basic-label>
      <base-select
        labelName="CTGRY"
        :select-list="categoryList"
        :selected-key="apiObj['CTGRY']"
        placeholder-text="선택해주세요"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">MODE</basic-label>

      <radio-button
        :radioButtonList="modeRadioOptions"
        labelName="MODE"
        :defaultValue="getModeDefaultValue()"
        @changeValue="changeData"
      />
    </div>

    <template v-if="openParam">
      <!--      v-if="apiObj['MODE'] === null || apiObj['MODE'] === 'MESSAGE PASSING'"-->
      <div class="api-router-row">
        <!-- message passing-->
        <basic-label forProperty="">URL</basic-label>
        <basic-input
          formInputType="text"
          labelName="URL"
          :inputData="apiObj['URL']"
          @changeData="changeData"
        />
      </div>

      <div class="api-router-row">
        <basic-label forProperty="">METH</basic-label>
        <radio-button
          :radioButtonList="methRadioOptions"
          labelName="METH"
          :defaultValue="getMethDefaultValue()"
          @changeValue="changeData"
        />
      </div>
    </template>

    <template v-if="!openParam">
      <!-- remote call -->

      <div class="api-router-row">
        <basic-label forProperty="">CMD</basic-label>
        <basic-input
          formInputType="text"
          labelName="CMD"
          :inputData="apiObj['CMD']"
          @changeData="changeData"
        />
      </div>
      <div class="param-table-wrap">
        <h5>params</h5>

        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addParam"
          >param추가</basic-button
        >
        <basic-table
          componentId=""
          :headerList="apiParams.header"
          :dataList="apiParams.body"
          rowKey="API_NM"
          :useSerialNum="true"
          serialNumText="No."
          :useTableButton="true"
          :tableButtonText="this.buttonList"
          @buttonAction="tableButtonClick"
          @columnAction=""
          :keyActionText="{}"
          @keyAction=""
        />

        <div v-if="showAddParam" class="param-add-wrap">
          <h5>params 등록</h5>
          <div>
            <div class="api-router-row">
              <basic-label forProperty="">API_NM</basic-label>
              <basic-input
                formInputType="text"
                labelName="API_NM"
                :inputData="apiParamObj['API_NM']"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">NM</basic-label>
              <basic-input
                formInputType="text"
                labelName="NM"
                :inputData="apiParamObj['NM']"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">DATA_TYPE</basic-label>
              <base-select
                labelName="DATA_TYPE"
                :select-list="dataTypeList"
                :selected-key="apiParamObj['DATA_TYPE']"
                placeholder-text="선택해주세요"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">DEFLT_VAL</basic-label>
              <basic-input
                formInputType="text"
                labelName="DEFLT_VAL"
                :inputData="apiParamObj['DEFLT_VAL']"
                @changeData="changeDataParam"
              />
            </div>

            <basic-button
              componentId=""
              buttonCss="text-button"
              :underline="false"
              :hoverColor="false"
              @click="addParamObj"
              >param저장</basic-button
            >
          </div>
        </div>
      </div>
    </template>

    <basic-button
      componentId=""
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="addObject"
      >저장</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import BasicInput from "@/components/aiPlatform/basic/basic-input.vue";
import BaseSelect from "@/components/aiPlatform/basic/base-select/base-select.vue";
import RadioButton from "@/components/aiPlatform/basic/radio-button.vue";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import { mapGetters } from "vuex";
import {
  successAlert,
  errorAlert
} from "@/components/aiPlatform/basic/alert/alert-default";

export default {
  name: "apiRouter-form",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      openParam: false,
      apiObj: {},
      apiParamObj: {},
      apiParams: {
        header: [],
        body: []
      },
      categoryList: [],
      modeRadioOptions: [],
      methRadioOptions: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" }
      ],
      buttonList: {
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "ban"
        }
      },
      showAddParam: false,
      dataTypeList: [
        {
          key: "STRING",
          text: "String"
        },
        {
          key: "NUMBER",
          text: "Number"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: {
    BasicButton,
    BasicLabel,
    BasicInput,
    BaseSelect,
    RadioButton,
    BasicTable
  },
  watch: {},
  methods: {
    async setApiDefaultColumns() {
      const me = this;

      await this.$axios
        .get(this.$config.API_ROUTER_PREFIX + "/getApi?API_NM=" + '""')
        .then((d) => {
          const _d = d.data;

          _d["api_info"]["header"].forEach((e) => {
            let defaultVal = null;
            // default value setting
            if (e.column_name === me.CONSTANTS.API_ROUTER.PARAM.MODE) {
              defaultVal = me.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING;
            } else if (e.column_name === me.CONSTANTS.API_ROUTER.PARAM.METH) {
              defaultVal = me.CONSTANTS.API_ROUTER.METH.GET;
            }
            me.apiObj[e.column_name] = defaultVal;
          });

          me.apiParams.header = _d["api_params"]["header"];
          _d["api_params"]["header"].forEach((e) => {
            me.apiParamObj[e.column_name] = null;
          });
        });
    },
    async addObject() {
      // 등록, 수정일때 api가 다름.
      let apiUrl = this.apiName ? "/updateApi" : "/setApi";

      let params = JSON.parse(JSON.stringify(this.apiObj));

      // 각 parameter는 null 일수 없음.
      Object.keys(params).forEach((_p) => {
        if (params[_p] === null) {
          params[_p] = "";
        }
      });

      if (this.apiObj.MODE === this.CONSTANTS.API_ROUTER.MODE.REMOTE_CALL) {
        params[this.CONSTANTS.API_ROUTER.PARAM.PARAMS] = [];
        params[this.CONSTANTS.API_ROUTER.PARAM.CMD] = "";
      } else {
        params[this.CONSTANTS.API_ROUTER.PARAM.URL] = "";
        params[this.CONSTANTS.API_ROUTER.PARAM.METH] = "";

        params[this.CONSTANTS.API_ROUTER.PARAM.PARAMS] = this.apiParams.body;
      }

      if (!this.checkValidation(params)) {
        const msg = "param 값이 유효하지 않습니다.";
        errorAlert(msg);
        return;
      }

      const me = this;
      this.$axios
        .post(this.$config.API_ROUTER_PREFIX + apiUrl, params)
        .then((d) => {
          if (d.data.result > 0) {
            // success
            me.apiObj = JSON.parse(JSON.stringify({}));
            me.apiParamObj = JSON.parse(JSON.stringify({}));

            successAlert("저장되었습니다.");
            me.$router.push({ path: "/superAdmin/apiRouter/list" });
          } else {
            const msg = "저장에 실패하였습니다. msg:" + d.data.errorMessage;
            errorAlert(msg);
          }
        });
    },
    checkValidation(params) {
      // API_NM과 CTGRY는 null이 될수 없음.
      return (
        params[this.CONSTANTS.API_ROUTER.PARAM.API_NM] &&
        params[this.CONSTANTS.API_ROUTER.PARAM.CTGRY]
      );
    },
    setOpenParam() {
      this.openParam =
        this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.MODE] ===
        this.CONSTANTS.API_ROUTER.MODE.REMOTE_CALL;
    },
    changeData({ label, input }) {
      this.apiObj[label] = input;
      this.apiObj = JSON.parse(JSON.stringify(this.apiObj));

      this.setOpenParam();
    },
    changeDataParam({ label, input }) {
      this.apiParamObj[label] = input;

      this.apiParamObj = JSON.parse(JSON.stringify(this.apiParamObj));
    },
    async getServerList() {
      const me = this;
      await this.$axios
        .get(this.$config.API_ROUTER_PREFIX + "/getServerInfoList")
        .then((d) => {
          let arr = [];
          d.data["api_server_info"].forEach((el) => {
            arr.push({
              key: el.NM,
              text: el.NM
            });
          });
          me.categoryList = arr;

          me.apiObj.CTGRY = arr[0].key;
        });
    },
    getApi() {
      const me = this;
      this.$axios
        .get(this.$config.API_ROUTER_PREFIX + "/getApi?API_NM=" + this.apiName)
        .then((d) => {
          me.apiObj = JSON.parse(JSON.stringify(d.data["api_info"].body[0]));
          me.setOpenParam();
        });
    },
    getModeDefaultValue() {
      return this.apiObj.MODE
        ? this.apiObj.MODE
        : this.modeRadioOptions[0].value;
    },
    getMethDefaultValue() {
      return this.apiObj.METH
        ? this.apiObj.METH
        : this.methRadioOptions[0].value;
    },
    tableButtonClick(rowKey) {
      // param remove
      const idx = this.apiParams.body.findIndex((el) => {
        return el.API_NM === rowKey;
      });

      this.apiParams.body.splice(idx, 1);
    },
    addParam() {
      this.showAddParam = true;
    },
    isDuplicated(obj, keyText, val) {
      const idx = obj.body.findIndex((el) => {
        return el[keyText] === val;
      });
      return idx > -1;
    },
    addParamObj() {
      if (!this.isParamValid()) {
        const msg = "param 값이 유효하지 않습니다.";
        errorAlert(msg);
        return;
      }

      const apiNm = this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.API_NM];
      if (
        this.isDuplicated(
          this.apiParams,
          this.CONSTANTS.API_ROUTER.PARAM.API_NM,
          apiNm
        )
      ) {
        const msg = "API_NM이 중복됩니다.";
        errorAlert(msg);
        return;
      }

      this.apiParams.body.push(this.apiParamObj);

      // clean filed.
      this.apiParamObj = JSON.parse(JSON.stringify({}));
    },
    isParamValid() {
      // API_NM, NM, DATA_TYPE은 null일수 없음.
      return (
        this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.API_NM] &&
        this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.NM] &&
        this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.DATA_TYPE]
      );
    },
    setModeRadioOption() {
      this.modeRadioOptions.push({
        value: this.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING,
        label: this.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING
      });
      this.modeRadioOptions.push({
        value: this.CONSTANTS.API_ROUTER.MODE.REMOTE_CALL,
        label: this.CONSTANTS.API_ROUTER.MODE.REMOTE_CALL
      });
    }
  },
  async created() {
    this.setModeRadioOption();
    await this.getServerList();

    this.apiName = this.$route.query.apiName;
    if (this.apiName) {
      // 수정이면
      this.getApi();
    } else {
      // 등록이면 column 을 표시하기 위해 column 정보 api를 호출한다.
      this.setApiDefaultColumns();
    }
  }
};
</script>

<style lang="scss" scoped>
// @import ""
#api-router-wrapper input {
}
.api-router-row {
  display: flex;
  margin: 5px;
  padding: 10px;
  border: 1px solid lightgrey;
}
#api-router-wrapper p {
  margin: 10px 0;
  font-size: 13px;
  color: red;
}

.api-router-row div:nth-child(1) {
  width: 100px;
}
.api-router-row div:nth-child(2) {
  width: 500px;
}
.param-table-wrap {
  width: 80%;
  padding: 10px;
  margin: 5px;
  border: 1px solid lightgrey;
}
.param-add-wrap {
  width: 500px;
  margin: 10px;
  border: 1px solid lightgrey;
}
</style>
