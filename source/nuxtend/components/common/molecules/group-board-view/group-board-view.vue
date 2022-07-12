<template lang="html">
  <div class="board-view">
    <div class="board-view__head">
      <div class="board-view__head-options">
        <div class="badges">
          <base-badge class="badge--w-gray">
            <span class="badge__label">내부</span>
          </base-badge>
          <base-badge class="badge--w-primary">
            <span class="badge__label">관제/사고 관련서비스</span>
          </base-badge>
        </div>
        <!-- 제공기관 로고 -->
        <div class="provider">
          <!-- 로고 이미지 있는경우 이미지 출력 -->
          <img src="~@/assets/style-product/images/common/provider_logo01.png" alt="제공기관">
          <!--로고 없는 경우 제공기관명 텍스트 출력 -->
          <!--
          <span>국토교통부</span>
          -->
        </div>
        <!-- // 제공기관 로고 -->
      </div>
      <strong class="board-view__head-title">
        자동차 노면 상태에 따른 주행거리 변화 시각화
      </strong>
      <div class="board-view__head-information">
        <basic-tag-list></basic-tag-list>
        <div class="details">
          <dl>
            <dt>작성자</dt>
            <dd>abcd***</dd>
            <dt>등록일</dt>
            <dd>2022-05-21</dd>
            <dt>조회</dt>
            <dd>1234567</dd>
            <dt>처리상태</dt>
            <dd><BaseBadge class="badge--blue badge--sm">답변완료</BaseBadge></dd>
            <!--
              답변완료 : BaseBadge class="badge--blue badge--sm"
              확인중 : BaseBadge class="badge--sm"
            -->
          </dl>
        </div>
      </div>
    </div>
    <div class="board-view__body">
      <!-- 상세내용 영역 -->
      <div class="board-view__content">
        노면 상태가 ‘서리/결빙’ 인 교통사고에 대한 사고다발지역 정보 반경 200m에서 결빙사고가 3건 이상 일어난 지점으로, 경찰청 최종 선정 결과 안전을 위해 시설 개선이 필요한 지역 자체 선정 등 노면 상태가 ‘서리/결빙’ 인 교통사고에 대한 사고다발지역 정보 반경 200m에서 결빙사고가 3건 이상 일어난 지점으로, 경찰청 최종 선정 결과 안전을 위해 시설 개선이 필요한 지역 자체 선정 등
노면 상태가 ‘서리/결빙’ 인 교통사고에 대한 사고다발지역 정보 반경 200m에서 결빙사고가 3건 이상 일어난 지점으로, 경찰청 최종 선정 결과 안전을 위해 시설 개선이 필요한 지역 자체 선정 등
      </div>
      <!-- // 상세내용 영역 -->
      <!-- 랜딩페이지 iframe 영역 -->
      <div class="board-view__iframe">
        <img src="~@/assets/style-product/images/common/boradview_iframe_ex.png" alt="예시이미지">
      </div>
      <!-- // 랜딩페이지 iframe 영역 -->
      <!-- 첨부파일 리스트 -->
      <div class="board-view__attached-file">
        <h5>첨부파일</h5>
        <div class="attached-file__list">
          <ul>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">GUI_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">한자연_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">데이터포털_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">GUI_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">한자연_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">데이터포털_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">GUI_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">한자연_Visual_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">208KB</div>
            </li>
            <li class="attached-file__item">
              <div class="attached-file__item-title">
                <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                <a href="#" title="첨부파일다운로드">데이터포털_Concept_0520.ppt</a>
              </div>
              <div class="attached-file__item-volume">1,208KB</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- // 첨부파일 리스트 -->
      <!-- 관리자 답변 -->
      <div class="board-view__reply">
        <div class="reply-head">
          <h5><svg-icon name="chat_katech" class="svg-icon"></svg-icon>관리자 답변</h5>
          <p>2022-07-01 15:09</p>
        </div>
        <div class="reply-body">
          안녕하세요.<br>
          한국자동차연구원 데이터포털 운영팀입니다.<br><br>

          요청하신 정보는 국토교통부와 실시간 연계가 되지 않아 현행화 대상으로 작업중에 있습니다.<br>
          번거로우시더라도 최신 정보를 다운로드 받아 활용해 주시기 바랍니다.<br>
          http://www.webwebwebweb.com/content/download
        </div>
      </div>
      <!-- // 관리자 답변 -->
    </div>
    <!-- //board-body-->
  </div>
</template>

<script type="text/javascript">
import BaseBadge from "@common/atoms/base-badge/base-badge";
import BasicTagList from "@common/atoms/basic-tag-list/basic-tag-list";

export default {
  name: "GroupBoardView",
  extends: {},
  components: {
    BaseBadge,
    BasicTagList
  },
  watch: {},

};
</script>

<style lang="scss" scoped>
@import "./group-board-view.scss";
</style>
