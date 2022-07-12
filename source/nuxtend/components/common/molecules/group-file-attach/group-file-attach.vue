<template lang="html">
  <div class="file-attach-group">
    <div class="file-attach-list">
      <div class="file-attach">
        <div class="file-attach__text-input">
          <input type="text" id="file-name" class="file-attach__input" placeholder="파일을 첨부해주세요." readonly="readonly" title="첨부파일 경로" />
        </div>
        <div class="file-attach__file-input">
          <base-button class="button--md button--secondary-line" for="file-find">파일선택</base-button>
          <input type="file" id="file-find" class="file-attach__hidden-input" onchange="javascript: document.getElementById('file-name').value = this.value" title="첨부파일찾기" />
        </div>
        <!---
        <base-button class="button--lg button--tertiary button--icon"> <svg-icon class="svg-icon" name="minus" aria-hidden="true"></svg-icon><span class="hidden">파일찾기 행삭제</span> </base-button>
        ---->
      </div>
    </div>
    <!-- TODO: 컴포넌트 추가 : 첨부파일 리스트 -->
    <div class="attached-file__list scrollCustomize">
      <ul>
        <li class="attached-file__item">
          <!--이미지첨부의 경우 썸네일 보이기-->
          <div class="attached-file__item-thumbnail">
            <img src="@/assets/style-product/images/common/thumbnail_analysisregist_linearea.png" alt="영역차트이미지">
          </div>
          <div class="attached-file__item-title">
            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
            GUI_Visual_Concept_0520.ppt
          </div>
          <div class="attached-file__item-volume">1,208KB</div>
          <base-button class="button--link button--sm">
            <svg-icon name="close" class="svg-icon"></svg-icon>
            <span class="hidden">첨부파일삭제</span>
          </base-button>
        </li>
        <li class="attached-file__item">
          <div class="attached-file__item-title">
            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
            한자연_Visual_Concept_0520.ppt
          </div>
          <div class="attached-file__item-volume">208KB</div>
          <base-button class="button--link button--sm">
            <svg-icon name="close" class="svg-icon"></svg-icon>
            <span class="hidden">첨부파일삭제</span>
          </base-button>
        </li>
        <li class="attached-file__item">
          <div class="attached-file__item-title">
            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
            데이터포털_Concept_0520.ppt
          </div>
          <div class="attached-file__item-volume">1,208KB</div>
          <base-button class="button--link button--sm">
            <svg-icon name="close" class="svg-icon"></svg-icon>
            <span class="hidden">첨부파일삭제</span>
          </base-button>
        </li>
      </ul>
    </div>
    <!-- // TODO: 컴포넌트 추가 : 첨부된 파일 리스트 -->
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";

export default {
  name: "GroupFileAttach",
  components: {
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
@import "./group-file-attach";
</style>
