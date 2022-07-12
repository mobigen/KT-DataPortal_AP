<template lang="html">
  <div id="requestForm">
    <div class="title">요청 modal</div>

    <div class="empNum-wrap">
      <basic-label forProperty="">사원번호</basic-label>
      <text-input
        placeholder=""
        labelName="empNum"
        :inputData="empNum"
        :disabled="false"
        :readonly="false"
        @input="changeData"
      ></text-input>
    </div>

    <div class="userName-wrap">
      <basic-label forProperty="">이름</basic-label>
      <text-input
        placeholder=""
        labelName="userName"
        :inputData="userName"
        :disabled="false"
        :readonly="false"
        @input="changeData"
      ></text-input>
    </div>

    <div class="purposeUse-wrap">
      <basic-label forProperty="">활용목적</basic-label>
      <basic-textarea
        inputData=""
        labelName="purposeUse"
        placeholder="내용을 입력해주세요"
        :disabled="false"
        :readonly="false"
        maxlength=""
        @input="changeData"
      ></basic-textarea>
    </div>

    <div class="button-wrap">
      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="cancel"
        >취소</basic-button
      >
      <basic-button
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="request"
        >요청</basic-button
      >
    </div>
  </div>
</template>

<script type="text/javascript">
import textInput from "@common/atoms/text-input";
import BasicTextarea from "@common/atoms/basic-textarea";
import BasicLabel from "@common/atoms/basic-label";
import BasicButton from "@common/atoms/basic-button";

export default {
  name: "app-search-full-request-form",
  extends: {},
  props: {},
  data() {
    return {
      empNum: "",
      userName: "",
      purposeUse: ""
    };
  },
  computed: {},
  components: { textInput, BasicTextarea, BasicLabel, BasicButton },
  watch: {},
  methods: {
    changeData({ label, input }) {
      if (label === "empNum") {
        this.empNum = input;
      } else if (label === "userName") {
        this.userName = input;
      } else if (label === "purposeUse") {
        this.purposeUse = input;
      }
    },
    cancel() {
      this.$router.push({
        path: "/portal/ui/meta/search/fullSearch/detail",
        query: { postId: this.$route.query.postId }
      });
    },
    request() {
      let obj = {};
      obj.postId = Number(this.$route.query.postId);
      obj.empNum = this.empNum;
      obj.userName = this.userName;
      obj.purposeUse = this.purposeUse;

      console.log(obj);
      alert("요청");
    }
  },
  created() {
    this.empNum = "20220101";
    this.userName = "홍길동";
  }
};
</script>

<style lang="scss" scoped>
#requestForm {
  width: 50%;
  margin: auto;
  border: solid 1px lightgray;
  padding: 25px;
  .title {
    font-size: 1.3rem;
    font-weight: bold;
  }
  > div:not(:last-child) {
    margin-bottom: 15px;
  }
  .empNum-wrap,
  .userName-wrap,
  .purposeUse-wrap {
    display: flex;
    #basicLabel {
      padding: 0;
      width: 100px;
    }
    #BasicTextarea {
      flex: 1;
    }
  }
  .button-wrap {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
