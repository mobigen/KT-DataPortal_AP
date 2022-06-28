<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 등록</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
      <div class="subject">
        <h3 class="subject__title">데이터 등록</h3>
        <p class="subject__desc">표준데이터 관리체계를 기반으로 한 단계별 등록을 쉽게 할 수 있습니다.</p>
        <small class="subject__right"><span class="blit_essential">*</span>표시는 필수 입력사항입니다.</small>
      </div>
    </div>

    <div class="contents">
      <section>
        <article class="registraion__wrap">
          <ul>
            <li class="registraion__list">
              <h4 class="item__title">카테고리 (분류)<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-long" readonly></base-input>
                <base-button class="button--md button--secondary-line">카테고리 설정</base-button>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">데이터명 (제목)<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-long" readonly></base-input>
                <base-button class="button--md button--secondary-line">중복조회</base-button>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">데이터 설명<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-wide cols">
                  <BaseTextarea
                    rows="6"
                    class="text-area--fixed scrollCustomize"
                    placeholder="데이터 설명을 입력해주세요 (공백,특수문자를 제외하고 200자 이내)"
                  ></BaseTextarea>
                  <!-- 텍스트 길이(byte) 표시 -->
                  <div class="text-area__byte"><strong>0</strong> / 4000 bytes</div>
                  <!-- // 텍스트 길이(byte) 표시 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">제공기관 (제공처)<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-mid" readonly></base-input>
                <base-button class="button--md button--secondary-line" @click="onshowDialog('providerDialog')"
                  >검색</base-button
                >
                <!-- 제공기관 검색 Dialog Modal -->
                <Dialog dialog-name="providerDialog" :width="'600px'" :height="'638px'">
                  <div slot="body" class="modal__body">
                    <div class="modal__body-head">
                      <h3>제공기관 검색</h3>
                      <div class="modal__body-top">
                        <div class="body-top__left">
                          <!--셀렉트박스 : 제공기관 카테고리 // 기본값 : 전체 -->
                          <div
                            class="select"
                            :class="isProviderOpen ? 'select--open' : ''"
                            @click="isProviderOpen = !isProviderOpen"
                          >
                            <div class="select-selector -md">
                              <button class="select-selector__button -md">
                                <span class="select-selector__title">전체</span>
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
                                  <button class="select-container__button -md" type="button">내부</button>
                                </li>
                                <li class="select-container__item">
                                  <button class="select-container__button -md" type="button">외부</button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <!-- // 셀렉트박스 : 제공기관 카테고리 -->
                        </div>
                        <div class="body-top__center">
                          <base-input class="text-input--md" placeholder="검색어를 입력해주세요."></base-input>
                        </div>
                        <div class="body-top__right">
                          <base-button class="button--md button--secondary">검색</base-button>
                        </div>
                      </div>
                    </div>
                    <div class="modal__body-content">
                      <ul class="modal__provider">
                        <li class="modal__provider-title">
                          <div class="modal__provider-name">기관명</div>
                          <div class="modal__provider-badge">구분</div>
                        </li>
                        <li class="modal__provider-list">
                          <div class="modal__provider-name"><a href="#">CKAN</a></div>
                          <div class="modal__provider-badge">
                            <base-badge class="badge--w-gray">
                              <span class="badge__label">내부</span>
                            </base-badge>
                          </div>
                        </li>
                        <li class="modal__provider-list">
                          <div class="modal__provider-name"><a href="#">도로교통안전공단</a></div>
                          <div class="modal__provider-badge">
                            <base-badge class="badge--w-gray">
                              <span class="badge__label">내부</span>
                            </base-badge>
                          </div>
                        </li>
                        <li class="modal__provider-list">
                          <div class="modal__provider-name"><a href="#">국토교통부</a></div>
                          <div class="modal__provider-badge">
                            <base-badge class="badge--w-gray">
                              <span class="badge__label">외부</span>
                            </base-badge>
                          </div>
                        </li>
                        <li class="modal__provider-list">
                          <div class="modal__provider-name"><a href="#">행정안전부</a></div>
                          <div class="modal__provider-badge">
                            <base-badge class="badge--w-gray">
                              <span class="badge__label">내부</span>
                            </base-badge>
                          </div>
                        </li>
                        <li class="modal__provider-list">
                          <div class="modal__provider-name"><a href="#">도로교통안전공단</a></div>
                          <div class="modal__provider-badge">
                            <base-badge class="badge--w-gray">
                              <span class="badge__label">외부</span>
                            </base-badge>
                          </div>
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
              <h4 class="item__title">관리부서<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input
                  class="text-input--md item__length-mid"
                  placeholder="관리부서명을  입력해주세요."
                ></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">관리부서 전화번호</h4>
              <div class="item__detail">
                <base-input
                  class="text-input--md item__length-mid"
                  placeholder="관리부서 전화번호를  입력해주세요."
                ></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">담당자명</h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-mid" placeholder="담당자명을 입력해주세요."></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">사용언어<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-short">
                  <!--셀렉트박스 : 사용언어 // 기본값 : 한국어 -->
                  <div
                    class="select"
                    :class="isLanguageOpen ? 'select--open' : ''"
                    @click="isLanguageOpen = !isLanguageOpen"
                  >
                    <div class="select-selector -md">
                      <button class="select-selector__button -md">
                        <span class="select-selector__title">한국어</span>
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
                          <button class="select-container__button -md" type="button">한국어</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">영어</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- // 셀렉트박스 : 사용언어 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">데이터 갱신 주기<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-short">
                  <!--셀렉트박스 : 데이터 갱신 주기 // 기본값 : 주별 -->
                  <div class="select" :class="isRenewOpen ? 'select--open' : ''" @click="isRenewOpen = !isRenewOpen">
                    <div class="select-selector -md">
                      <button class="select-selector__button -md">
                        <span class="select-selector__title">주별</span>
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
                          <button class="select-container__button -md" type="button">주별</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">월별</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">분기</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">반기</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">연간</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- // 셀렉트박스 : 데이터 갱신 주기 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">파일유형<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <div class="item__length-short">
                  <!--셀렉트박스 : 파일유형 // 기본값 : 주별 -->
                  <div
                    class="select"
                    :class="isFiletypeOpen ? 'select--open' : ''"
                    @click="isFiletypeOpen = !isFiletypeOpen"
                  >
                    <div class="select-selector -md">
                      <button class="select-selector__button -md">
                        <span class="select-selector__title">CSV</span>
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
                          <button class="select-container__button -md" type="button">CSV</button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button -md" type="button">XML</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- // 셀렉트박스 : 파일유형 -->
                </div>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">등록일</h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-short" readonly></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">수정일</h4>
              <div class="item__detail">데이트피커 컴포넌트(요청중)</div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">차기등록 예정일</h4>
              <div class="item__detail">데이트피커 컴포넌트(요청중)</div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">저작권</h4>
              <div class="item__detail">
                <base-checkbox checkbox-id="copyright01">
                  <template v-slot:label>제3자 권리 포함</template>
                </base-checkbox>
                <base-checkbox checkbox-id="copyright02">
                  <template v-slot:label>공공저작물</template>
                </base-checkbox>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">라이선스</h4>
              <div class="item__detail">
                <base-input
                  class="text-input--md item__length-long"
                  placeholder="라이선스를 입력해주세요."
                ></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">랜딩페이지 URL</h4>
              <div class="item__detail">
                <base-input class="text-input--md item__length-wide" readonly></base-input>
              </div>
            </li>
            <li class="registraion__list">
              <h4 class="item__title">키워드<span class="blit_essential">*</span></h4>
              <div class="item__detail">
                <base-input
                  class="text-input--md item__length-wide"
                  placeholder="데이터관련 키워드를 입력해 주세요. 5개까지 등록 가능합니다. ( ‘ , ’ 로 키워드 구분)"
                ></base-input>
              </div>
            </li>
            <li class="registraion__list authority">
              <h4 class="item__title">파일보기 권한</h4>
              <div class="item__detail">
                <base-checkbox checkbox-id="authority01">
                  <template v-slot:label>전체</template>
                </base-checkbox>
                <base-checkbox checkbox-id="authority02">
                  <template v-slot:label>기관</template>
                </base-checkbox>
                <base-checkbox checkbox-id="authority03">
                  <template v-slot:label>연구원</template>
                </base-checkbox>
              </div>
            </li>
            <li class="registraion__list datatype">
              <h4 class="item__title">데이터 타입</h4>
              <div class="item__detail">
                <div class="item__datatype">
                  <small
                    >※ 파일 데이터의 일부 내용을 미리보기로 제공합니다, 전체 내용이 필요한 경우 해당 파일을 다운로드
                    받으시기 바랍니다.</small
                  >
                  <div class="item__datatype-buttongroup">
                    <base-button class="button--lg button--secondary-line">데이터 (파일) 업로드</base-button>
                    <base-button class="button--lg button--tertiary">마이드라이브 (파일) 업로드</base-button>
                    <base-button class="button--lg button--tertiary">데이터 링크 입력</base-button>
                  </div>
                  <div class="item__datatype-attached">
                    <!-- 첨부파일 리스트 -->
                    <div class="attached-file__title">
                      <h5>첨부파일 목록</h5>
                      <small>샘플데이터는 5MB 이내의 csv, excel 파일만 등록 가능합니다.</small>
                      <base-button class="button--secondary">샘플데이터 추가</base-button>
                    </div>
                    <div class="attached-file__list scrollCustomize">
                      <ul>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            GUI_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            한자연_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            데이터포털_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            GUI_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            한자연_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            데이터포털_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            GUI_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            한자연_Visual_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                        <li class="attached-file__item">
                          <div class="attached-file__item-title">
                            <svg-icon name="file_katech" class="svg-icon"></svg-icon>
                            데이터포털_Concept_0520.ppt
                          </div>
                          <div class="attached-file__item-volume">1,208KB</div>
                          <button class="button button--link button--sm">
                            <svg-icon name="close" class="svg-icon"></svg-icon>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <!-- // 첨부된 파일 리스트 -->
                  </div>
                  <base-input class="text-input--md item__length-wide" placeholder="URL을 입력하세요."></base-input>
                </div>
              </div>
            </li>
            <li class="registraion__list editor-wrap">
              <h4 class="item__title">
                본문정보
                <small>데이터 관련 본문 정보를 입력해 주세요.</small>
              </h4>
              <div class="item__detail">에디터</div>
            </li>
          </ul>
        </article>

        <!-- 버튼그룹 -->
        <div class="page__button">
          <div class="button__left"></div>
          <div class="button__center">
            <base-button class="button--2xl button--tertiary">취소</base-button>
            <base-button class="button--2xl button--secondary">등록</base-button>
          </div>
          <div class="button__right"></div>
        </div>
        <!-- // 버튼그룹 -->
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@component/common/atoms/base-button/base-button";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import BaseInput from "@component/common/atoms/base-input/base-input";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox";
import BaseTextarea from "@component/common/atoms/base-textarea/base-textarea.vue";
import Dialog from "@functional/dialog/dialog.vue";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import { mapGetters } from "vuex";

export default {
  name: "Index",
  layout: "kt/kt",
  async asyncData({ store }) {
    await store.dispatch("kt/keyword-search/getContents");
  },
  computed: {
    ...mapGetters({
      contents: "kt/keyword-search/contents"
    })
  },
  data() {
    return {
      isPreview: false,
      isLanguageOpen: false,
      isRenewOpen: false,
      isFiletypeOpen: false,
      isProviderOpen: false
    };
  },
  methods: {
    togglePreview: function () {
      this.isPreview = !this.isPreview;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    }
  },
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    BaseTextarea,
    GroupBreadcrumb,
    GroupPagination,
    Dialog
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
