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
      <base-select :select-list="categoryList" />
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

    <template
      v-if="apiObj['MODE'] === null || apiObj['MODE'] === 'MESSAGE PASSING'"
    >
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

    <template v-else>
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
      <div>params</div>
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

export default {
  name: "apiRouter-form",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null,
      apiObj: {
        API_NM: null,
        CATGY: null,
        URL: null,
        METH: null,
        CMD: null,
        MODE: null,
        params: []
      },
      categoryList: [],
      modeRadioOptions: [
        { value: "MESSAGE PASSING", label: "MESSAGE PASSING" },
        { value: "REMOTE CALL", label: "REMOTE CALL" }
      ],
      methRadioOptions: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" }
      ]
    };
  },
  computed: {},
  components: { BasicButton, BasicLabel, BasicInput, BaseSelect, RadioButton },
  watch: {},
  methods: {
    async addObject() {
      if (this.apiName) {
        // 수정
        this.editApi();
      } else {
        this.addApi();
      }
    },
    addApi() {
      console.log("addApi");
    },
    editApi() {
      console.log("editApi");
    },
    changeData(label, input) {
      console.log(label + ", " + input);
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
          console.log(d);
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
    }
  },
  created() {
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
  padding : 10px;
  border: 1px solid lightgrey;
}

.api-router-row div:nth-child(1) {
  width: 100px;
}
.api-router-row div:nth-child(2) {
  width: 500px;
}
</style>
