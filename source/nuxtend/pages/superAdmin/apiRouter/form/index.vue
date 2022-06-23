<template lang="html">
  <div id="api-router-wrapper">
    <!-- apiRouter용 하드코딩-->
    <div class="api-router-row">
      <basic-label forProperty="">{{
        $t("header." + CONSTANTS.API_ROUTER.PARAM.API_NM)
      }}</basic-label>

      <basic-label v-if="apiName" forProperty="">{{
        apiObj[CONSTANTS.API_ROUTER.PARAM.API_NM]
      }}</basic-label>
      <basic-input
        v-else
        formInputType="text"
        :labelName="CONSTANTS.API_ROUTER.PARAM.API_NM"
        :inputData="apiObj[CONSTANTS.API_ROUTER.PARAM.API_NM]"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">{{
        $t("header." + CONSTANTS.API_ROUTER.PARAM.CTGRY)
      }}</basic-label>
      <base-select
        select-id="select-01"
        :labelName="CONSTANTS.API_ROUTER.PARAM.CTGRY"
        :select-list="categoryList"
        :selected-key="apiObj[CONSTANTS.API_ROUTER.PARAM.CTGRY]"
        placeholder-text="선택해주세요"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">{{
        $t("header." + CONSTANTS.API_ROUTER.PARAM.ROUTE_URL)
      }}</basic-label>
      <basic-input
        formInputType="text"
        :labelName="CONSTANTS.API_ROUTER.PARAM.ROUTE_URL"
        :inputData="apiObj[CONSTANTS.API_ROUTER.PARAM.ROUTE_URL]"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">{{
        $t("header." + CONSTANTS.API_ROUTER.PARAM.MODE)
      }}</basic-label>

      <radio-button
        :radioButtonList="modeRadioOptions"
        :labelName="CONSTANTS.API_ROUTER.PARAM.MODE"
        :defaultValue="getModeDefaultValue()"
        @changeValue="changeData"
      />
    </div>

    <template>
      <!--      v-if="apiObj['MODE'] === null || apiObj['MODE'] === 'MESSAGE PASSING'"-->
      <div class="api-router-row" v-show="!openParam">
        <!-- message passing-->
        <basic-label forProperty="">{{
          $t("header." + CONSTANTS.API_ROUTER.PARAM.URL)
        }}</basic-label>
        <basic-input
          formInputType="text"
          :labelName="CONSTANTS.API_ROUTER.PARAM.URL"
          :inputData="apiObj[CONSTANTS.API_ROUTER.PARAM.URL]"
          @changeData="changeData"
        />
      </div>

      <div class="api-router-row" v-show="!openParam">
        <basic-label forProperty="">{{
          $t("header." + CONSTANTS.API_ROUTER.PARAM.METH)
        }}</basic-label>
        <radio-button
          :radioButtonList="methRadioOptions"
          :labelName="CONSTANTS.API_ROUTER.PARAM.METH"
          :defaultValue="getMethDefaultValue()"
          @changeValue="changeData"
        />
      </div>
    </template>

    <template>
      <!-- remote call -->

      <div class="api-router-row" v-show="openParam">
        <basic-label forProperty="">{{
          $t("header." + CONSTANTS.API_ROUTER.PARAM.CMD)
        }}</basic-label>
        <basic-input
          formInputType="text"
          :labelName="CONSTANTS.API_ROUTER.PARAM.CMD"
          :inputData="apiObj[CONSTANTS.API_ROUTER.PARAM.CMD]"
          @changeData="changeData"
        />
      </div>
      <div class="param-table-wrap" v-show="openParam">
        <h5>{{ $t("header." + CONSTANTS.API_ROUTER.PARAM.PARAMS) }}</h5>
        <basic-table
          componentId=""
          :headerList="apiParams.header"
          :dataList="apiParams.body"
          :headerLocale="$t('param_header')"
          :rowKey="CONSTANTS.API_ROUTER.PARAM.NM"
          :useSerialNum="true"
          serialNumText="No."
          :useTableButton="true"
          :tableButtonText="this.buttonList"
          @buttonAction="tableButtonClick"
          @columnAction=""
          :keyActionText="{}"
          @keyAction=""
          :hide-columns="hideColumns"
        />

        <div class="param-add-wrap">
          <h5>params 등록</h5>
          <div>
            <div class="api-router-row">
              <basic-label forProperty="">{{
                $t("param_header." + CONSTANTS.API_ROUTER.PARAM.NM)
              }}</basic-label>
              <basic-input
                formInputType="text"
                :labelName="CONSTANTS.API_ROUTER.PARAM.NM"
                :inputData="apiParamObj[CONSTANTS.API_ROUTER.PARAM.NM]"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">{{
                $t("param_header." + CONSTANTS.API_ROUTER.PARAM.DATA_TYPE)
              }}</basic-label>
              <base-select
                select-id="select-02"
                :labelName="CONSTANTS.API_ROUTER.PARAM.DATA_TYPE"
                :select-list="dataTypeList"
                :selected-key="
                  apiParamObj[CONSTANTS.API_ROUTER.PARAM.DATA_TYPE]
                "
                placeholder-text="선택해주세요"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">{{
                $t("param_header." + CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL)
              }}</basic-label>
              <basic-input
                formInputType="text"
                :labelName="CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL"
                :inputData="apiParamObj[CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL]"
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

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import BasicInput from "@/components/aiPlatform/basic/basic-input.vue";
import BaseSelect from "@/components/common/atoms/base-select/base-select";
import RadioButton from "@/components/aiPlatform/basic/radio-button.vue";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import { mapGetters } from "vuex";
import { successAlert, errorAlert } from "@functional/alert/alert-default";

export default {
  name: "apiRouter-form",
  extends: {},
  props: {},
  data() {
    return {
      // hideColumns: [],
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

      buttonList: {
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "ban"
        }
      },
      showAddParam: false,
      dataTypeList: []
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    hideColumns() {
      return [this.CONSTANTS.API_ROUTER.PARAM.API_NM];
    },
    methRadioOptions() {
      return [
        {
          value: this.CONSTANTS.API_ROUTER.METH.GET,
          label: this.CONSTANTS.API_ROUTER.METH.GET
        },
        {
          value: this.CONSTANTS.API_ROUTER.METH.POST,
          label: this.CONSTANTS.API_ROUTER.METH.POST
        },
        {
          value: this.CONSTANTS.API_ROUTER.METH.PUT,
          label: this.CONSTANTS.API_ROUTER.METH.PUT
        }
      ];
    }
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
        .get(
          this.$config.API_ROUTER_PREFIX +
            "/getApi?" +
            this.CONSTANTS.API_ROUTER.PARAM.API_NM +
            '=""'
        )
        .then((d) => {
          const _d = d.data;

          _d[this.CONSTANTS.API_ROUTER.PARAM.API_INFO][
            this.CONSTANTS.API_ROUTER.PARAM.HEADER
          ].forEach((e) => {
            let defaultVal = null;
            // default value setting
            if (e.column_name === me.CONSTANTS.API_ROUTER.PARAM.MODE) {
              defaultVal = me.CONSTANTS.API_ROUTER.MODE.MESSAGE_PASSING;
            } else if (e.column_name === me.CONSTANTS.API_ROUTER.PARAM.METH) {
              defaultVal = me.CONSTANTS.API_ROUTER.METH.GET;
            }
            me.apiObj[e.column_name] = defaultVal;
          });

          me.apiParams.header =
            _d[this.CONSTANTS.API_ROUTER.PARAM.API_PARAMS][
              this.CONSTANTS.API_ROUTER.PARAM.HEADER
            ];
          _d[this.CONSTANTS.API_ROUTER.PARAM.API_PARAMS][
            this.CONSTANTS.API_ROUTER.PARAM.HEADER
          ].forEach((e) => {
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

      if (
        this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.MODE] ===
        this.CONSTANTS.API_ROUTER.MODE.REMOTE_CALL
      ) {
        params[this.CONSTANTS.API_ROUTER.PARAM.URL] = "";
        params[this.CONSTANTS.API_ROUTER.PARAM.METH] = "";

        // params가 값이 있는 경우, params object의 api_nm은 apiRouter의 api_nm과 동일하기 때문에 값을 넣어준다.
        params[this.CONSTANTS.API_ROUTER.PARAM.PARAMS] =
          this.apiParams.body.map((el) => {
            return {
              [this.CONSTANTS.API_ROUTER.PARAM.API_NM]:
                this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.API_NM],
              [this.CONSTANTS.API_ROUTER.PARAM.NM]:
                el[this.CONSTANTS.API_ROUTER.PARAM.NM],
              [this.CONSTANTS.API_ROUTER.PARAM.DATA_TYPE]:
                el[this.CONSTANTS.API_ROUTER.PARAM.DATA_TYPE],
              [this.CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL]:
                el[this.CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL],
              [this.CONSTANTS.API_ROUTER.PARAM.ROUTE_URL]:
                el[this.CONSTANTS.API_ROUTER.PARAM.ROUTE_URL]
            };
          }, this);
      } else {
        params[this.CONSTANTS.API_ROUTER.PARAM.PARAMS] = [];
        params[this.CONSTANTS.API_ROUTER.PARAM.CMD] = "";
      }

      // NO parameter는 backend에서 처리되지 않기 때문에 삭제한다.
      delete params[this.CONSTANTS.API_ROUTER.PARAM.NO];

      if (!this.checkValidation(params)) {
        const required = [
          this.$t("header." + CONSTANTS.API_ROUTER.PARAM.API_NM),
          this.$t("header." + CONSTANTS.API_ROUTER.PARAM.ROUTE_URL)
        ];

        let msg = "param 값이 유효하지 않습니다.";
        msg += "<br> * 필수입력 : " + required.join(", ");
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
        params[this.CONSTANTS.API_ROUTER.PARAM.CTGRY] &&
        params[this.CONSTANTS.API_ROUTER.PARAM.ROUTE_URL]
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
              key: el[this.CONSTANTS.API_ROUTER.PARAM.NM],
              text: el[this.CONSTANTS.API_ROUTER.PARAM.NM]
            });
          });
          me.categoryList = arr;

          me.apiObj[this.CONSTANTS.API_ROUTER.PARAM.CTGRY] = arr[0].key;
        });
    },
    getApi() {
      const me = this;
      this.$axios
        .get(
          this.$config.API_ROUTER_PREFIX +
            "/getApi?" +
            this.CONSTANTS.API_ROUTER.PARAM.API_NM +
            "=" +
            this.apiName
        )
        .then((d) => {
          me.apiObj = JSON.parse(JSON.stringify(d.data["api_info"].body[0]));
          me.apiParams.body = JSON.parse(
            JSON.stringify(
              d.data[this.CONSTANTS.API_ROUTER.PARAM.API_PARAMS].body
            )
          );
          me.setOpenParam();
        });
    },
    getModeDefaultValue() {
      return this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.MODE]
        ? this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.MODE]
        : this.modeRadioOptions[0].value;
    },
    getMethDefaultValue() {
      return this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.METH]
        ? this.apiObj[this.CONSTANTS.API_ROUTER.PARAM.METH]
        : this.methRadioOptions[0].value;
    },
    tableButtonClick(rowKey) {
      console.log(rowKey)
      // param remove
      const idx = this.apiParams.body.findIndex((el) => {
        return el[this.CONSTANTS.API_ROUTER.PARAM.NM] === rowKey;
      });

      this.apiParams.body.splice(idx, 1);
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

      const nm = this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.NM];
      if (
        this.isDuplicated(
          this.apiParams,
          this.CONSTANTS.API_ROUTER.PARAM.NM,
          nm
        )
      ) {
        const msg =
          "Param의 " + this.CONSTANTS.API_ROUTER.PARAM.NM + "이 중복됩니다.";
        errorAlert(msg);
        return;
      }

      // 기본값이 공백이면?
      if (!this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL]) {
        this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.DEFLT_VAL] =
          this.apiParamObj[this.CONSTANTS.API_ROUTER.PARAM.DATA_TYPE] ===
          "string"
            ? ""
            : 0;
      }
      this.apiParams.body.push(this.apiParamObj);

      // clean filed.
      this.apiParamObj = JSON.parse(JSON.stringify({}));
    },
    isParamValid() {
      // API_NM, NM, DATA_TYPE은 null일수 없음.
      return (
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
    },
    setParamSelect() {
      this.dataTypeList = [
        {
          key: "string",
          text: "String"
        },
        {
          key: "number",
          text: "Number"
        }
      ];
    }
  },
  async created() {
    this.setApiDefaultColumns();

    this.setModeRadioOption();
    await this.getServerList();

    this.setParamSelect();

    this.apiName = this.$route.query.apiName;
    if (this.apiName) {
      // 수정이면
      this.getApi();
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
  width: 200px;
  min-width: 100px;
}
.api-router-row div:nth-child(2) {
  width: 500px;
}
.param-table-wrap {
  width: 90%;
  padding: 10px;
  margin: 5px;
  border: 1px solid lightgrey;
}
.param-add-wrap {
  width: 90%;
  margin: 10px;
  border: 1px solid lightgrey;
}
</style>
