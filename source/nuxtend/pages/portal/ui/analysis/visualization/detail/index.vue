<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 시각분석 상세보기</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
    </div>

    <div class="contents">
      <section>
        <article class="contents__board-wrap">
          <group-board-view></group-board-view>
        </article>

        <!-- 데이터 활용사례 -->
        <article class="contents__detail">
          <h3>데이터 활용사례</h3>
          <div class="contents__detail-used">
            <ul>
              <li>
                <!-- badge--mobile / badge--web / badge--etc 3종 -->
                <base-badge class="badge--used badge--mobile">
                  <svg-icon
                    class="badge__icon"
                    name="badge-mobile_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <p>모바일</p>
                </base-badge>
                <strong class="used__title">기상청 중기예보 조회서비스</strong>
                <p class="used__description">
                  중기전망, 중기예보, 중기기온, 중기상예보 정보를 조회하는
                  서비스
                </p>
                <p class="used__date">2022-05-16</p>
                <base-button class="used__button" title="바로가기"
                  >바로가기</base-button
                >
              </li>
              <li>
                <base-badge class="badge--used badge--web">
                  <svg-icon
                    class="badge__icon"
                    name="badge-web_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <p>웹</p>
                </base-badge>
                <strong class="used__title">케이웨더</strong>
                <p class="used__description">날씨 정보를 제공하는 서비스</p>
                <p class="used__date">2022-05-16</p>
                <base-button class="used__button" title="바로가기"
                  >바로가기</base-button
                >
              </li>
              <li>
                <base-badge class="badge--used badge--etc">
                  <svg-icon
                    class="badge__icon"
                    name="badge-document_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <p>기타</p>
                </base-badge>
                <strong class="used__title">날씨와 미세먼지</strong>
                <p class="used__description">
                  날씨와 미세먼지 발생 연관성 조사 서비스
                </p>
                <p class="used__date">2022-05-16</p>
                <base-button class="used__button" title="바로가기"
                  >바로가기</base-button
                >
              </li>
              <li>
                <base-badge class="badge--used badge--mobile">
                  <svg-icon
                    class="badge__icon"
                    name="badge-mobile_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <p>모바일</p>
                </base-badge>
                <strong class="used__title">기상청 중기예보 조회서비스</strong>
                <p class="used__description">
                  중기전망, 중기예보, 중기기온, 중기상예보 정보를 조회하는
                  서비스
                </p>
                <p class="used__date">2022-05-16</p>
                <base-button class="used__button" title="바로가기"
                  >바로가기</base-button
                >
              </li>
              <li>
                <base-badge class="badge--used badge--web">
                  <svg-icon
                    class="badge__icon"
                    name="badge-web_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <p>웹</p>
                </base-badge>
                <strong class="used__title">케이웨더</strong>
                <p class="used__description">날씨 정보를 제공하는 서비스</p>
                <p class="used__date">2022-05-16</p>
                <base-button class="used__button" title="바로가기"
                  >바로가기</base-button
                >
              </li>
            </ul>
          </div>
        </article>
        <!-- // 데이터 활용사례 -->

        <!-- 버튼그룹 -->
        <div class="page__button">
          <div class="button__left">
          </div>
          <div class="button__center">
            <base-button class="button--2xl button--tertiary">목록</base-button>
          </div>
          <div class="button__right">
          </div>
        </div>
        <!-- // 버튼그룹 -->
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";
import GroupBreadcrumb from "@common/molecules/group-breadcrumb/group-breadcrumb";
import GroupBoardView from "@common/molecules/group-board-view/group-board-view";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    BaseButton,
    GroupBreadcrumb,
    GroupBoardView
  },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
