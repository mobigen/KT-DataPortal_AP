<template>
  <div class="container">
    <div class="contents-subject"><!-- contents-subject은 나중에 따로 빠질수 있음 -->
      <h2 class="hidden">데이터 활용</h2>
      <group-breadcrumb></group-breadcrumb>
    </div>
    <!-- contents-wrap -->
    <div class="contents-wrap">
      <!-- lnb -->
      <group-lnb></group-lnb>
      <!-- //lnb -->
      <!-- contents-group : subject + contents -->
      <div class="contents-group">
        <subject></subject>
        <div class="contents">
          <!-- heading-group -->
          <div class="heading-group">
            <h4 class="heading-group__title">담아두기 목록</h4>
          </div>
          <!-- // heading-group -->
          <div class="board-wrap">
            <!-- board-head -->
            <div class="board-head">
              <div class="board-head__group">
                <p class="total-number">총<strong>1,000</strong>건</p>
                <div class="board-head__options">
                  <base-button class="button--primary">
                    <svg-icon class="svg-icon" name="check"></svg-icon>
                    <span class="button__text">일괄신청</span>
                  </base-button>
                </div>
              </div>
            </div>
            <div class="board-body">
              <!-- table : 담아두기 -->
              <table class="table table--board">
                <caption class="hidden">
                  담아두기 목록 게시판
                </caption>
                <colgroup>
                  <col style="width: 60px" />
                  <col style="width: auto" />
                  <col style="width: 90px" />
                  <col style="width: 100px" />
                  <col style="width: 100px" />
                  <col style="width: 130px" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="전체선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </th>
                    <th scope="col">데이터명</th>
                    <th scope="col">분류</th>
                    <th scope="col">최근갱신일</th>
                    <th scope="col">법률검토</th>
                    <th scope="col">활용요청일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택" checked>
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button class="button--sm" @click="onshowDialog('applyDialog')" title="새창열림">
                        <span class="button__text">활용신청하기</span>
                      </base-button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button class="button--sm" title="새창열림">
                        <span class="button__text">활용신청하기</span>
                      </base-button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button class="button--sm" title="새창열림">
                        <span class="button__text">활용신청하기</span>
                      </base-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- // table -->
            </div>
            <group-pagination></group-pagination>
          </div>
          <!-- heading-group -->
          <div class="heading-group">
            <h4 class="heading-group__title">데이터 활용 신청내역</h4>
          </div>
          <!-- // heading-group -->
          <ul class="bullet bullet--rect">
            <li>만료된 데이터는 ‘다시 신청’후 담아두기 목록에서 다시 활용신청 할 수 있습니다.</li>
            <li>활용신청이 완료된 데이터는 다운로드할 수 있습니다.</li>
          </ul>
          <div class="board-wrap">
            <!-- board-head -->
            <div class="board-head">
              <!-- board-head__search : 게시물검색용 -->
              <div class="board-head__search">
                <search-input-board></search-input-board>
              </div>
              <div class="board-head__group">
                <p class="total-number">총<strong>1,000</strong>건</p>
                <div class="board-head__options">
                  <div class="options-sort">
                    <span class="label">처리상태</span>
                      <!-- select -->
                      <base-select class="select w-107">
                        <template v-slot:title>
                          <span class="select-selector__title">전체</span>
                        </template>
                        <template v-slot:list>
                          <li class="select-container__item">
                            <button class="select-container__button" type="button" role="option">
                              <span class="select-container__text">처리중</span>
                            </button>
                          </li>
                          <li class="select-container__item">
                            <button class="select-container__button" type="button" role="option">
                              <span class="select-container__text">활용중</span>
                            </button>
                          </li>
                          <li class="select-container__item">
                            <button class="select-container__button" type="button" role="option">
                              <span class="select-container__text">만료</span>
                            </button>
                          </li>
                        </template>
                      </base-select>
                  </div>
                  <base-button class="button--md button--primary">
                    <svg-icon class="svg-icon" name="check"></svg-icon>
                    <span class="button__text">다시신청</span>
                  </base-button>
                </div>
              </div>
            </div>
            <div class="board-body">
              <!-- table : 신청내역 목록 -->
              <table class="table table--board">
                <caption class="hidden">
                  신청내역 목록 게시판
                </caption>
                <colgroup>
                  <col style="width: 60px" />
                  <col style="width: auto" />
                  <col style="width: 90px" />
                  <col style="width: 100px" />
                  <col style="width: 100px" />
                  <col style="width: 80px" />
                  <col style="width: 100px" />
                  <col style="width: 100px" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="전체선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </th>
                    <th scope="col">데이터명</th>
                    <th scope="col">분류</th>
                    <th scope="col">활용시작일</th>
                    <th scope="col">만료일</th>
                    <th scope="col">법률검토</th>
                    <th scope="col">처리상태</th>
                    <th scope="col">활용횟수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>2022-06-23</td>
                    <td><a href="" class="file-download" title="법률검토 첨부파일다운로드">Y</a></td>
                    <td>
                      <base-badge class="badge--primary-outline">
                        <span class="badge__label">처리중</span>
                      </base-badge>
                    </td>
                    <td>1회</td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>2022-06-23</td>
                    <td><a href="" class="file-download" title="법률검토 첨부파일다운로드">Y</a></td>
                    <td>
                      <base-badge class="badge--positive-outline">
                        <span class="badge__label">활용중</span>
                      </base-badge>
                    </td>
                    <td>1회</td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_메타 서비스 도메인 통합 매핑 기본CU2(SGI)_메타 서비스 도메인 통합 매핑 기본</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>2022-06-23</td>
                    <td></td>
                    <td>
                      <base-badge class="badge--negative-outline">
                        <span class="badge__label">만료예정</span>
                      </base-badge>
                    </td>
                    <td>1회</td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox :name="name" :checkboxId="checkboxId1" :class="checkboxClass" title="행선택">
                        <template v-slot:label>
                          <slot name="label1"><span class="hidden">선택</span></slot>
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left"><a href="" class="ellipsis-end">CU2(SGI)_고객서비스 사용 일일 내역</a></td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>2022-06-23</td>
                    <td><a href="" class="file-download" title="법률검토 첨부파일다운로드">Y</a></td>
                    <td>만료
                    </td>
                    <td>1회</td>
                  </tr>
                </tbody>
              </table>
              <!-- // table -->
            </div>
            <group-pagination></group-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- // contents-wrap -->

    <!-- 데이터 활용 신청하기 Dialog -->
    <Dialog
    dialog-name="applyDialog"
    :width="'970px'"
    :height="'auto'"
    :cancelButtonText="'취소'"
    :confirmButtonText="'신청'"
    :title="'데이터 활용 신청하기'"
    :confirmButtonDisabled="confirmButtonDisabled"
    >
      <div slot="body" class="modal__body">
          <!-- formbox -->
          <table class="formbox">
            <caption class="hidden">
              데이터 활용 신청하기 게시판
            </caption>
            <colgroup>
              <col style="width: 140px" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">데이터명</th>
                <td>
                  <ul class="data-name-list">
                    <li>CU2(SGI)_고객 서비스 사용 일일 내역 <p class="txt-info color--danger"><strong class="required">필수</strong>법률검토 필요</p></li>
                    <li>CU2(SGI)_검색 키워드 통계 내역 <p class="txt-info color--danger"><strong class="required">필수</strong>법률검토 필요</p></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">신청자</th>
                <td>홍길동 (12345678)</td>
              </tr>
              <tr>
                <th scope="row">신청내용<strong class="required">필수</strong> <br>(활용목적)</th>
                <td>
                  <BaseTextarea
                    rows="6"
                    element-class="text-area--fixed scrollCustomize"
                    placeholder="활용목적을 입력해주세요."
                    :useCheckByte="false"
                  ></BaseTextarea>
                </td>
              </tr>
              <tr>
                <th scope="row">법률검토<strong class="required">필수</strong></th>
                <td>
                  <div class="v-group">
                    <BaseTextarea
                      rows="6"
                      element-class="text-area--fixed scrollCustomize"
                      placeholder="법률검토 대상 데이터입니다.
법률검토 내용을 입력하거나 파일로첨부하세요. "
                      :useCheckByte="false"
                    ></BaseTextarea>
                    <GroupFileAttach></GroupFileAttach>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">기간설정</th>
                <td>
                  <Date-picker
                    :type="date"
                    :range="true"
                    :disabled="false"
                    @change="change"
                    />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- // formbox -->
      </div>
    </Dialog>
    <!-- // Dialog -->
  </div>
</template>

<script type="text/javascript">
import BaseBadge from "@component/common/atoms/base-badge/base-badge.vue";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox.vue";
import BaseRadio from "@component/common/atoms/base-radio/base-radio";
import BaseSelect from "@component/common/atoms/base-select/base-select";
import BaseTag from "@component/common/atoms/base-tag/base-tag";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseTextarea from "@component/common/atoms/base-textarea/base-textarea.vue";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import Subject from "@component/common/organisms/subject/subject.vue";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupFileAttach from "@component/common/molecules/group-file-attach/group-file-attach";
import SearchInputBoard from "@component/common/organisms/search-input-board/search-input-board.vue";
import SearchList from "@component/common/organisms/search-list/search-list.vue";
import GroupLnb from "@component/common/molecules/group-lnb/group-lnb.vue";
import Dialog from "@functional/dialog/dialog.vue";
import { mapGetters } from "vuex";
import DatePicker from '@functional/datepicker/date-picker.vue';

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
      isToggle: false,
      checkboxId1:""
    };
  },
  methods: {
    togglePreview: function () {
      this.isPreview = !this.isPreview;
    },
    toggleBtn: function () {
      this.isToggle = !this.isToggle;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    },
    setRequestData({ id, input }) {
      const key = id.split("-").pop();
      this.requestData[key] = input;
    }
  },
  components: {
    BaseBadge,
    BaseCheckbox,
    BaseRadio,
    BaseSelect,
    BaseButton,
    BaseTag,
    SearchList,
    GroupBreadcrumb,
    Subject,
    GroupPagination,
    Dialog,
    BaseTextarea,
    GroupFileAttach,
    GroupLnb,
    DatePicker,
    SearchInputBoard
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
