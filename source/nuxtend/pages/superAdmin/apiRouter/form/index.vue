<template lang="html">
  <div id="api-router-wrapper">
    <h3>api-router form</h3>

    <!-- apiRouter용 하드코딩-->
    <div class="api-router-row">
      <basic-label forProperty="">API_NM</basic-label>
      <basic-input
        formInputType="text"
        labelName="API_NM"
        :inputData="apiObj['API_NM']"
        @changeData="changeData"
      />
    </div>

    <div class="api-router-row">
      <basic-label forProperty="">CATGY</basic-label>
      <base-select
        labelName="CATGY"
        :select-list="categoryList"
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
          :keyActionText="{ api_name: 'viewRouterInfo' }"
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
              <basic-input
                formInputType="text"
                labelName="DATA_TYPE"
                :inputData="apiParamObj['DATA_TYPE']"
                @changeData="changeDataParam"
              />
            </div>
            <div class="api-router-row">
              <basic-label forProperty="">DEFLT_VAL</basic-label>
              <basic-input
                formInputType="text"
                labelName="DEFLT_VAL"
                :inputData="apiParamObj['DEVLT_VAL']"
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

export default {
  name: "apiRouter-form",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      openParam: false,
      apiObj: {
        // API_NM: null,
        // CATGY: null,
        // URL: null,
        // METH: null,
        // CMD: null,
        // MODE: null
      },
      apiParamObj: {
        // API_NM: null,
        // NM: null,
        // DATA_TYPE: null,
        // DEFLT_VAL: null
      },
      apiParams: {
        header: [],
        body: []
      },
      categoryList: [],
      modeRadioOptions: [
        { value: "MESSAGE PASSING", label: "MESSAGE PASSING" },
        { value: "REMOTE CALL", label: "REMOTE CALL" }
      ],
      methRadioOptions: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" }
      ],
      buttonList: {
        remove: {
          buttonType: "icon",
          buttonName: "삭제",
          buttonCss: "icon-button",
          iconData: "ban"
        }
      },
      showAddParam: false
    };
  },
  computed: {},
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
            me.apiObj[e.column_name] = null;
          });

          me.apiParams.header = _d["api_params"]["header"];
          _d["api_params"]["header"].forEach((e) => {
            me.apiParamObj[e.column_name] = null;
          });
        });
    },
    async addObject() {
      if (this.apiName) {
        // 수정
        alert("edit not available");
        return;
      }

      const params = JSON.parse(JSON.stringify(this.apiObj));
      params.params.params = this.apiParams.body;

      console.log(params);
      // this.$axios
      //   .post(this.$config.API_ROUTER_PREFIX + "/setApi", this.apiObj)
      //   .then();
    },
    changeData(label, input) {
      if (label === "MODE") {
        this.openParam = input === "REMOTE CALL";
      }
      this.apiObj[label] = input;
    },
    changeDataParam(label, input) {
      this.apiParamObj[label] = input;
    },
    getCategoryList() {
      const me = this;
      this.$axios
        .get(this.$config.API_ROUTER_PREFIX + "/getServerInfoList")
        .then((d) => {
          me.categoryList = d.data["api_server_info"];
        });
    },
    getApi() {
      const me = this;
      this.$axios
        .get(
          this.$config.API_ROUTER_PREFIX + "/getApi?api_name=" + this.apiName
        )
        .then((d) => {
          me.apiObj = d.data["api_info"].body[0];
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
      // 삭제만 처리함.
      // this.removeBizMeta(rowKey);
      console.log(rowKey);
    },
    addParam() {
      this.showAddParam = true;
    },
    addParamObj() {
      this.apiParams.body.push(this.apiParamObj);
    }
  },
  created() {
    this.setApiDefaultColumns();

    this.apiName = this.$route.query.apiName;
    if (this.apiName) {
      // 수정이면
      this.getApi();
    }
    this.getCategoryList();
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
