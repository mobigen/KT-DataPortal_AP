<template lang="html">
  <div>
    <h3>Dialog test</h3>

    <base-button
      class="button-page__default button-declaration"
      title="오류신고"
      @click="onshowDialog('declarationDialog')"
    >
      <svg-icon
        class="svg-icon"
        name="declaration_katech"
        aria-hidden="true"
      ></svg-icon>
      <p>오류신고</p>
      <small>※ 데이터에 오류가 발견되면 오류신고해 주세요.</small>
    </base-button>

    <Dialog dialog-name="declarationDialog" :width="'700px'">
      <div slot="body">
        <div class="modal__body-head">
          <h3>
            <svg-icon
              class="svg-icon"
              name="declaration_katech"
              aria-hidden="true"
            ></svg-icon
            >오류신고
          </h3>
          <p>
            오류 발생시 관련 내용을 접수해 주세요. 캡쳐한 화면을 첨부해주시면
            보다 빠른 처리가 가능합니다.
          </p>
        </div>
        <div class="modal__body-content">
          <ul>
            <li class="modal__body-item">
              <div class="item__title">이름</div>
              <div class="item__detail">홍길동</div>
            </li>
            <li class="modal__body-item">
              <div class="item__title">이메일</div>
              <div class="item__detail">honghong@gmail.com</div>
            </li>
            <li class="modal__body-item">
              <div class="item__title">오류 데이터명</div>
              <div class="item__detail">
                도로교통공사 결빙 다발지역도로교통공사 결빙 다발지역도로교통공사
                결빙 다발지역도로교통공사 결빙 다발지역도로교통공사 결빙
                다발지역도로교통공사 결빙 다발지역
              </div>
            </li>
            <li class="modal__body-item">
              <div class="item__title">화면 URL</div>
              <div class="item__detail">
                http://abcdefg.com/hijklmnop/qrstuv
              </div>
            </li>
            <li class="modal__body-item">
              <div class="item__title">
                오류내용<span class="blit_essential">*</span>
              </div>
              <div class="item__detail">인풋</div>
            </li>
            <li class="modal__body-item">
              <div class="item__title">파일첨부</div>
              <div class="item__detail">파일첨부, 파일리스트</div>
            </li>
          </ul>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@component/UITeam/project/katech/atoms/base-button/base-button";
import Dialog from "@component/aiPlatform/functional/dialog/dialog.vue";

export default {
  name: "sample-test",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {
      isPreview: false
    };
  },
  computed: {},
  components: { BaseButton, Dialog },
  watch: {},
  methods: {
    togglePreview: function () {
      this.isPreview = !this.isPreview;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
