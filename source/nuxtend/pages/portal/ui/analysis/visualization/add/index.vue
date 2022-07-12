<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 시각분석 등록</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
      <div class="subject_sm">
        <h3 class="subject__title">데이터 시각분석 등록</h3>
        <p></p>
        <small class="subject__right"><span class="blit_essential">*</span>표시는 필수 입력사항입니다.</small>
      </div>
    </div>

    <div class="contents">
      <section>
        <article class="registraion__wrap">
          <ul>
            <li class="registraion__list">
              <h4 class="item__title">제목<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-long" placeholder="제목을 입력해주세요. (50자 내외)"></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">데이터 설명<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-wide cols">
                  <BaseTextarea rows="6" element-class="text-area--fixed scrollCustomize" placeholder="데이터 설명을 입력해주세요 (공백,특수문자를 제외하고 200자 이내)"></BaseTextarea>
                  <!-- 텍스트 길이(byte) 표시 -->
                  <div class="text-area__byte">
                    <strong>0</strong> / 4000 bytes
                  </div>
                  <!-- // 텍스트 길이(byte) 표시 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">썸네일 이미지<span class="blit_essential">*</span></h4>
              <div class="item__detail cols">
                <div class="item__thumbnail-select">
                  <h5>대표 이미지를 선택하세요. (이미지를 직접 첨부할 수 있습니다.)</h5>
                  <div class="item__thumbnail-list">
                    <a href="#" title="막대그래프(가로형)">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_horizontalbar.png" alt="막대그래프(가로형)이미지">
                    </a>
                    <a href="#" title="막대그래프(세로형)">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_barline.png" alt="막대그래프(세로형)이미지">
                    </a>
                    <a href="#" title="원그래프">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_pie.png" alt="원그래프이미지">
                    </a>
                    <a href="#" title="도넛(반)그래프">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_semicircledonut.png" alt="도넛(반)그래프이미지">
                    </a>
                    <a href="#" title="영역차트">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_area.png" alt="영역차트이미지">
                    </a>
                    <a href="#" title="라인그래프">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_line01.png" alt="라인그래프이미지">
                    </a>
                    <a href="#" title="방사형그래프">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_radar.png" alt="방사형그래프이미지">
                    </a>
                    <a href="#" title="레이더차트">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_polar.png" alt="레이더차트이미지">
                    </a>
                    <a href="#" title="막대그래프(세로형)2">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_barnegative.png" alt="막대그래프(세로형)이미지">
                    </a>
                    <a href="#" title="누적막대그래프(세로형)">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_stacked.png" alt="누적막대그래프(세로형)이미지">
                    </a>
                    <a href="#" title="버블차트">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_bubble.png" alt="버블차트이미지">
                    </a>
                    <a href="#" title="막대그래프(가로형)2">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_pyramid.png" alt="막대그래프(가로형)이미지">
                    </a>
                    <a href="#" title="깔때기도표이미지">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_funnel.png" alt="깔때기도표이미지">
                    </a>
                    <a href="#" title="벤다이어그램">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_venndiagram.png" alt="벤다이어그램이미지">
                    </a>
                    <a href="#" title="게이지그래프">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_gauge.png" alt="게이지그래프이미지">
                    </a>
                    <a href="#" title="게이지그래프이미지2">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_solidgauge.png" alt="게이지그래프이미지">
                    </a>
                    <a href="#" title="게이지그래프이미지3">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_activitygauge.png" alt="게이지그래프이미지">
                    </a>
                    <a href="#" title="히트맵">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_heatmap.png" alt="히트맵이미지">
                    </a>
                    <a href="#" title="맵데이터">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_worldmap.png" alt="맵데이터이미지">
                    </a>
                    <a href="#" title="영역차트">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_linearea.png" alt="영역차트이미지">
                    </a>
                    <a href="#" title="라인그래프2">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_line02.png" alt="라인그래프이미지">
                    </a>
                    <a href="#" title="막대차트(세로형)3">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_bar.png" alt="막대차트(세로형)이미지">
                    </a>
                    <a href="#" title="막대차트(가로형)이미지3">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_horizontalbarline.png" alt="막대차트(가로형)이미지">
                    </a>
                    <a href="#" title="라인그래프3">
                      <img src="~@/assets/style-product/images/common/thumbnail_analysisregist_line03.png" alt="라인그래프이미지">
                    </a>
                  </div>
                </div>
                <div class="item__thumbnail-attach">
                  <GroupFileAttach></GroupFileAttach>
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">카테고리<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-short">
                  <!--셀렉트박스 : 카테고리 -->
                  <div class="select" :class="isCategoryOpen ? 'select--open' : ''" @click="isCategoryOpen = !isCategoryOpen">
                    <div class="select-selector -md">
                      <button class="select-selector__button -md">
                        <span class="select-selector__title">자동차 부품</span>
                        <svg-icon
                          class="svg-icon select-selector__icon"
                          name="chevron-down-medium"
                          aria-hidden="true"
                        ></svg-icon>
                      </button>
                    </div>
                    <div class="select-container">
                      <ul class="select-container__list">
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">자동차 부품</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">자동차 제조</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">자동차 정비</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">화물운송</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">관제/사고 관련 서비스</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">미래차 산업</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- // 셀렉트박스 : 카테고리 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">제공기관</h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-mid" readonly></base-input>
                <base-button class="button--md button--secondary-line" @click="onshowDialog('providerDialog')">검색</base-button>
                <!-- 제공기관 검색 Dialog Modal -->
                <Dialog dialog-name="providerDialog" :width="'600px'" :height="'638px'">
                  <div slot="body" class="modal__body">
                    <div class="modal__body-head">
                      <h3>제공기관 검색</h3>
                      <div class="modal__body-top">
                        <div class="body-top__center">
                          <base-input class="text-input--md" placeholder="검색어를 입력해주세요."></base-input>
                        </div>
                        <div class="body-top__right">
                          <base-button class="button--md button--secondary">검색</base-button>
                        </div>
                      </div>
                    </div>
                    <div class="modal__body-content">
                      <ul class="modal__board">
                        <li class="modal__board-title">
                          <div class="modal__board-auto">기관명</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-auto"><a href="#">CKAN</a></div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-auto"><a href="#">도로교통안전공단</a></div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-auto"><a href="#">국토교통부</a></div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-auto"><a href="#">행정안전부</a></div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-auto"><a href="#">도로교통안전공단</a></div>
                        </li>
                      </ul>
                      <div class="modal__pagination">
                        <group-pagination></group-pagination>
                      </div>
                    </div>
                  </div>
                </Dialog>
                <!-- // 제공기관 검색 Dialog Modal -->
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">활용 데이터<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-mid" placeholder="결빙사고 다발지역 외 8건" readonly></base-input>
                <base-button class="button--md button--secondary-line" @click="onshowDialog('dataDialog')">검색</base-button>
                <!-- 데이터 검색 Dialog Modal -->
                <Dialog dialog-name="dataDialog" :width="'600px'" :height="'638px'">
                  <div slot="body" class="modal__body">
                    <div class="modal__body-head">
                      <h3>데이터 검색</h3>
                      <div class="modal__body-top">
                        <div class="body-top__center">
                          <base-input class="text-input--md" placeholder="검색어를 입력해주세요."></base-input>
                        </div>
                        <div class="body-top__right">
                          <base-button class="button--md button--secondary">검색</base-button>
                        </div>
                      </div>
                    </div>
                    <div class="modal__body-content">
                      <ul class="modal__board">
                        <li class="modal__board-title">
                          <div class="modal__board-sm">유형</div>
                          <div class="modal__board-auto">데이터셋</div>
                          <div class="modal__board-md">분류</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-sm">파일</div>
                          <div class="modal__board-auto">겨울철 결빙사고 다발지역 </div>
                          <div class="modal__board-md">자동차 부품산업</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-sm">파일</div>
                          <div class="modal__board-auto">겨울철 결빙사고 다발지역 </div>
                          <div class="modal__board-md">자동차 부품산업</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-sm">파일</div>
                          <div class="modal__board-auto">겨울철 결빙사고 다발지역 </div>
                          <div class="modal__board-md">자동차 부품산업</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-sm">파일</div>
                          <div class="modal__board-auto">겨울철 결빙사고 다발지역 </div>
                          <div class="modal__board-md">자동차 부품산업</div>
                        </li>
                        <li class="modal__board-list">
                          <div class="modal__board-sm">파일</div>
                          <div class="modal__board-auto">겨울철 결빙사고 다발지역 </div>
                          <div class="modal__board-md">자동차 부품산업</div>
                        </li>
                      </ul>
                      <div class="modal__pagination">
                        <group-pagination></group-pagination>
                      </div>
                    </div>
                  </div>
                </Dialog>
                <!-- // 데이터 검색 Dialog Modal -->
                <div class="item__analysisdata-attached">
                  <!-- 첨부파일 리스트 -->
                  <div class="attached-file__list scrollCustomize">
                    <ul>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          GUI_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          한자연_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          데이터포털_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          GUI_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          한자연_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          데이터포털_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          GUI_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          한자연_Visual_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                      <li class="attached-file__item">
                        <div class="attached-file__item-title">
                          <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                          데이터포털_Concept_0520.ppt
                        </div>
                        <div class="attached-file__item-volume">1,208KB</div>
                        <base-button class="button button--link button--sm">
                          <svg-icon name="close" class="svg-icon"></svg-icon>
                        </base-button>
                      </li>
                    </ul>
                  </div>
                  <!-- // 첨부된 파일 리스트 -->

                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">랜딩페이지 URL</h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-wide" placeholder="URL을 입력해 주세요."></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">키워드<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-wide" placeholder="데이터관련 키워드를 입력해 주세요. 5개까지 등록 가능합니다. ( ‘ , ’ 로 키워드 구분)"></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">등록일</h4>
              <div class="item__detail">
                <!-- 데이트피커 date:오늘날짜 -->
                <Date-picker
                  :type="date"
                  :range="false"
                  :confirm="false"
                  :disabled="false"
                  @change="change"
                />
                <!-- // 데이트피커-->
              </div>
            </li>
          </ul>
        </article>

        <!-- 버튼그룹 -->
        <div class="page__button">
          <div class="button__left">
          </div>
          <div class="button__center">
            <base-button class="button--2xl button--tertiary">취소</base-button>
            <base-button class="button--2xl button--secondary">등록</base-button>
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
import BaseInput from "@common/atoms/base-input/base-input";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
import BaseTextarea from "@common/atoms/base-textarea/base-textarea.vue";
import Dialog from "@common/functional/dialog/dialog.vue";
import DatePicker from "@common/functional/datepicker/date-picker";
import GroupPagination from "@common/molecules/group-pagination/group-pagination";
import GroupFileAttach from "@common/molecules/group-file-attach/group-file-attach";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {
      isCategoryOpen: false
    };
  },
  computed: {},
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    BaseTextarea,
    GroupBreadcrumb,
    GroupPagination,
    GroupFileAttach,
    Dialog,
    DatePicker
  },
  watch: {},
  methods: {
    onshowDialog(name) {
      this.$modal.show(name);
    },
    change(val) {
      action("change")(val);
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
