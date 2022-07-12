<template>
  <div class="container">
    <div class="contents-subject">
      <!-- contents-subject은 나중에 따로 빠질수 있음 -->
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
        <subject v-if="false"></subject>
        <div class="contents">
          <!-- heading-group -->
          <div class="heading-group" v-if="false">
            <h4 class="heading-group__title">담아두기 목록</h4>
          </div>
          <!-- // heading-group -->
          <div class="board-wrap" v-if="false">
            <!-- board-head -->
            <div class="board-head">
              <div class="board-head__group">
                <p class="total-number">총<strong>1,000</strong>건</p>
                <div class="board-head__options">
                  <base-button class="button--md button--primary">
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
                  <col style="width: 120px" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <base-checkbox
                        :name="name"
                        checkboxId="checkboxId1"
                        class="checkboxClass"
                        title="전체선택"
                      >
                        <template v-slot:label>
                          <slot name="label1"
                            ><span class="hidden">선택</span></slot
                          >
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
                      <base-checkbox
                        :name="name"
                        checkboxId="checkboxId1"
                        class="checkboxClass"
                        title="행선택"
                      >
                        <template v-slot:label>
                          <slot name="label1"
                            ><span class="hidden">선택</span></slot
                          >
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left">
                      CU2(SGI)_고객서비스 사용 일일 내역
                    </td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button
                        class="button--sm"
                        @click="onshowDialog('applyDialog')"
                      >
                        <span class="button__text">활용신청하기</span>
                      </base-button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox
                        :name="name"
                        checkboxId="checkboxId1"
                        class="checkboxClass"
                        title="행선택"
                      >
                        <template v-slot:label>
                          <slot name="label1"
                            ><span class="hidden">선택</span></slot
                          >
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left">
                      CU2(SGI)_고객서비스 사용 일일 내역
                    </td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button class="button--sm">
                        <span class="button__text">활용신청하기</span>
                      </base-button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <base-checkbox
                        :name="name"
                        checkboxId="checkboxId1"
                        class="checkboxClass"
                        title="행선택"
                      >
                        <template v-slot:label>
                          <slot name="label1"
                            ><span class="hidden">선택</span></slot
                          >
                        </template>
                      </base-checkbox>
                    </td>
                    <td class="text-left">
                      CU2(SGI)_고객서비스 사용 일일 내역
                    </td>
                    <td>모바일</td>
                    <td>2022-06-23</td>
                    <td>검토대상</td>
                    <td>
                      <base-button class="button--sm">
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
            <li>
              만료된 데이터는 ‘다시 신청’후 담아두기 목록에서 다시 활용신청 할
              수 있습니다.
            </li>
            <li>활용신청이 완료된 데이터는 다운로드할 수 있습니다.</li>
          </ul>
          <div class="board-wrap">
            <!-- board-head -->
            <div class="board-head">
              <!-- board-head__search : 게시물검색용 -->
              <!--
              <div class="board-head__search">
                <search-input-field></search-input-field>
              </div>
              -->
              <div class="board-head__group">
                <p class="total-number">
                  총<strong>{{ requestedTotalCount }}</strong
                  >건
                </p>
                <div class="board-head__options">
                  <div class="options-sort">
                    <span class="label">처리상태</span>
                    <!-- select -->
                    <base-select class="select w-107" :use-select-open="false">
                      <template v-slot:title>
                        <span class="select-selector__title">전체</span>
                      </template>
                      <template v-slot:list>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">처리중</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">활용중</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">만료</span>
                          </button>
                        </li>
                      </template>
                    </base-select>
                  </div>
                  <base-button class="button--md button--primary" disabled>
                    <svg-icon class="svg-icon" name="check"></svg-icon>
                    <span class="button__text">다시신청</span>
                  </base-button>
                </div>
              </div>
            </div>
            <div class="board-body">
              <basic-table
                component-id=""
                :use-checkbox="false"
                :view-detail="requestedData"
                :header-has-locale="true"
                :view-header-list="[
                  'data_nm',
                  'ctgry',
                  'use_st_dt',
                  'exp_date',
                  'law_evl_conf_yn',
                  'trt_sttus',
                  'use_tmscnt'
                ]"
                rowKey="use_dataset_id"
                :colgroup-array="[
                  'auto',
                  '90px',
                  '100px',
                  '100px',
                  '80px',
                  '100px',
                  '100px'
                ]"
                @buttonAction=""
                @columnAction=""
                :value-type="{
                  law_evl_conf_yn: 'valueMatch',
                  trt_sttus: 'badge',
                  use_tmscnt: 'stringFromat'
                }"
                :formatter="{
                  law_evl_conf_yn: {
                    Y: 'Y',
                    N: ''
                  },
                  trt_sttus: {
                    처리중: 'primary',
                    활용중: 'positive',
                    만료예정: 'negative'
                  },
                  use_tmscnt: '{0}회'
                }"
                :keyActionText="{
                  data_nm: 'showDetailDialog'
                }"
                @keyAction="showDetailDialog"
              ></basic-table>
            </div>
            <group-pagination
              :paging-key="requestedPaginationKey"
              :paging-object="{
                [CONSTANTS.PAGING.ITEMS_PER_PAGE]: 5,
                [CONSTANTS.PAGING.VISIBLE_PAGES]: 3,
                [CONSTANTS.PAGING.PAGE]: 1
              }"
              @pagingEvent="getRequestedData"
              :show-test-table="false"
            ></group-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- // contents-wrap -->

    <!-- 데이터 활용 신청하기 Dialog -->
    <Dialog
      dialog-name="applyDialog"
      :width="'970px'"
      :height="'700px'"
      :title="'데이터 활용 신청하기'"
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
                  <li>
                    CU2(SGI)_고객 서비스 사용 일일 내역
                    <p class="txt-info">
                      <strong class="required">필수</strong>법률검토 필요
                    </p>
                  </li>
                  <li>
                    CU2(SGI)_검색 키워드 통계 내역
                    <p class="txt-info">
                      <strong class="required">필수</strong>법률검토 필요
                    </p>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">신청자</th>
              <td>홍길동 (12345678)</td>
            </tr>
            <tr>
              <th scope="row">
                신청내용<strong class="required">필수</strong> <br />(활용목적)
              </th>
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
              <th scope="row">
                법률검토<strong class="required">필수</strong>
              </th>
              <td>
                <div class="v-group">
                  <BaseTextarea
                    rows="6"
                    element-class="text-area--fixed scrollCustomize"
                    placeholder="법률검토 대상 데이터입니다.
법률검토 내용을 입력하거나 파일로첨부하세요. "
                    :useCheckByte="false"
                  ></BaseTextarea>
                  <GroupFileAttach> </GroupFileAttach>
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

    <!-- 데이터 활용 신청하기 Dialog -->
    <Dialog
      dialog-name="viewRequestDetailDialog"
      :width="'970px'"
      :height="'auto'"
      :title="'데이터 활용 신청내역 상세 조회'"
      :confirmButtonDisabled="true"
      cancelButtonText="확인"
    >
      <div slot="body" class="modal__body">
        <div class="table-wrap">
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
                  <p>{{ selectedObj.data_nm }}</p>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  신청자<strong class="required">필수</strong>
                </th>
                <td>
                  <p>{{ selectedObj.apyr }}</p>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  신청내용<strong class="required">필수</strong>
                  <br />(활용목적)
                </th>
                <td>
                  <pre>{{ selectedObj.apy_sbst }}</pre>
                </td>
              </tr>
              <tr>
                <th scope="row">법률검토</th>
                <td>
                  {{ selectedObj.law_evl_conf_yn === "Y" ? "필수" : "" }}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  기간설정<strong class="required">필수</strong>
                </th>
                <td>
                  <Date-picker :range="true" :disabled="true" @change="" />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- // formbox -->
        </div>
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
import SearchInputField from "@component/common/organisms/search-input-field/search-input-field.vue";
import SearchList from "@component/common/organisms/search-list/search-list.vue";
import GroupLnb from "@component/common/molecules/group-lnb/group-lnb.vue";
import Dialog from "@functional/dialog/dialog.vue";
import { mapActions, mapGetters } from "vuex";
import DatePicker from "@functional/datepicker/date-picker.vue";
import BasicTable from "@component/common/organisms/basic-table/basic-table.vue";

export default {
  name: "Index",
  async asyncData({ store }) {
    await store.dispatch("kt/keyword-search/getContents");
  },
  computed: {
    ...mapGetters({
      contents: "kt/keyword-search/contents",
      CONSTANTS: "defaults/constants/CONSTANTS"
    }),
    requestedData() {
      const vuex =
        this.$store.getters["users/requested/requested/requestedData"];

      if (Object.prototype.hasOwnProperty.call(vuex, "header")) {
        this.requestedTotalCount = vuex.totalcount;
      } else {
        return {
          header: [],
          body: []
        };
      }
      return vuex;
    }
  },
  data() {
    return {
      isPreview: false,
      isToggle: false,
      checkboxId1: "",
      date: "date",
      requestedPaginationKey: "requestedDataPagination",
      selectedObj: {},
      requestedTotalCount: 0
    };
  },
  methods: {
    ...mapActions("users/requested/requested", {
      restApiRequestedData: "getRequestedData"
    }),
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
    },

    getRequestedData(paramKey, paramValue) {
      if (paramKey !== undefined) {
        this.searchParam[paramKey] = paramValue;
      }
      this.restApiRequestedData({
        paginationKey: this.requestedPaginationKey,
        searchParam: this.searchParam
      });
    },
    showDetailDialog(rowKey, keyAction) {
      this.selectedObj = this.requestedData.body.find((d) => {
        return d.use_dataset_id === rowKey;
      });
      this.onshowDialog("viewRequestDetailDialog");
    },
    change() {
      console.log("data changed");
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
    SearchInputField,
    GroupLnb,
    DatePicker,
    BasicTable
  },
  mounted() {
    this.getRequestedData();
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
