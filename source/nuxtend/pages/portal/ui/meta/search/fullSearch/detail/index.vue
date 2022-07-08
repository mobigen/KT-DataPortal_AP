<template>
  <div class="container">
    <div class="contents-subject">
      <h2 class="hidden">데이터 검색 - 상세페이지</h2>
      <group-breadcrumb></group-breadcrumb>
    </div>
    <div class="contents-wrap">
      <div class="contents-group">
        <div class="contents">
          <!-- 데이터 개요 -->
          <article class="contents__summary">
            <div class="data-box">
              <div class="data-box__visual">
                <!-- 카테고리 미정 - 카테고리 분류 별 대표 이미지 노출
                    1. 모바일 : icon_summary_mobile.png
                    2. 웹 : icon_summary_web.png
                    3. 기타 : icon_summary_etc.png
                -->
                <img
                  src="~@/assets/style-product/images/temp/@temp-thumb-databox.jpg"
                  alt="기타"
                />
              </div>
              <div class="data-box__information">
                <div class="data-box__top-content">
                  <div class="badges">
                    <base-badge class="badge--outline badge--rounded">
                      <span class="badge__label">{{ ctgry }}</span
                      ><!-- 카테고리구분 -->
                    </base-badge>
                    <base-badge class="badge--provider">
                      <span class="badge__label"> {{ dataPrvDesk }}</span
                      ><!-- 벤더 -->
                    </base-badge>
                  </div>
                </div>
                <div class="data-box__content">
                  <strong class="data-box__title">
                    {{ dataNm }}
                  </strong>
                  <p class="data-box__description">
                    {{ dataDesc }}
                  </p>
                </div>
                <div class="data-box__bottom-content">
                  <div class="data-box__details">
                    <!-- 수정일,등록일 -->
                    <div class="data-box__details-group">
                      <dl>
                        <dt><span>수정일</span></dt>
                        <dd>{{ ltstAmdDt }}</dd>
                      </dl>
                      <dl>
                        <dt><span>등록일</span></dt>
                        <dd>{{ regDate }}</dd>
                      </dl>
                      <!-- 데이터 관심/조회/다운로드 -->
                      <dl class="data-box__options">
                        <dt>
                          <svg-icon name="heart" class="svg-icon"></svg-icon>
                          <span class="hidden">관심데이터등록수total</span>
                        </dt>
                        <dd>20</dd>
                        <dt>
                          <svg-icon name="eye" class="svg-icon"></svg-icon>
                          <span class="hidden">조회수total</span>
                        </dt>
                        <dd>156</dd>
                        <dt>
                          <svg-icon name="download" class="svg-icon"></svg-icon>
                          <span class="hidden">다운로드수total</span>
                        </dt>
                        <dd>34</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 오른쪽 옵션 구조 추가 -->
              <div class="data-box__buttons">
                <base-button
                  class="button--primary"
                  @click="onshowDialog('requestDialog')"
                >
                  <span class="button__text">바로활용</span>
                </base-button>

                <base-button class="button--primary-line">
                  <span class="button__text">담아두기</span>
                </base-button>
                <div class="favorite-cnt">
                  <base-button
                    class="favorite-cnt__button"
                    :class="
                      myFavoriteData === 'y'
                        ? 'favorite-cnt__button--selected'
                        : ''
                    "
                    @click="
                      myFavoriteDataClick(
                        bizDatasetId,
                        !(myFavoriteData === 'y')
                      )
                    "
                  >
                    <svg-icon
                      class="svg-icon"
                      name="heart_md"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="button__text">관심데이터</span>
                  </base-button>
                </div>
              </div>
            </div>
          </article>
          <!-- // 데이터 개요 -->
          <!-- 기본정보 (내부) -->
          <article class="contents__detail">
            <view-table
              :colgroup-array="['180px', 'auto']"
              table-title="기본정보"
              :header-has-locale="true"
              :view-detail="detail"
              :view-header-list="['data_prv_desk']"
              :td-cnt-in-tr="1"
              :td-colspan="3"
            ></view-table>
            <view-table
              :colgroup-array="['180px', 'auto', '180px', 'auto']"
              :header-has-locale="true"
              :view-detail="detail"
              :view-header-list="['adm_dep', 'admr_nm', 'rqt_dep', 'rqt_nm']"
            ></view-table>
          </article>
          <!-- // 기본정보 -->
          <!-- 데이터 속성 및 관리 -->
          <article class="contents__detail">
            <view-table
              :colgroup-array="['180px', 'auto', '180px', 'auto']"
              table-title="데이터 속성 및 관리"
              :header-has-locale="true"
              :view-detail="detail"
              :view-header-list="[
                'ctgry',
                'data_shap',
                'reg_date',
                'data_updt_cyc',
                'ltst_amd_dt',
                'updt_nxt_date',
                'prv_shap',
                'law_evl_conf_yn',
                'file_size',
                'scrty_evl_conf_yn'
              ]"
            ></view-table>
            <view-table
              :colgroup-array="['180px', 'auto']"
              :header-has-locale="true"
              :view-detail="detail"
              :view-header-list="['open_scope']"
              :td-cnt-in-tr="1"
              :td-colspan="3"
            ></view-table>

            <view-table
              :colgroup-array="['180px', 'auto']"
              :header-has-locale="true"
              :view-detail="detail"
              :view-header-list="['src_sys', 'src_url', 'kywrd']"
              :td-cnt-in-tr="1"
              :td-colspan="3"
              :value-type="{
                src_url: 'link',
                kywrd: 'tag'
              }"
              @tagClick="tagClick"
            ></view-table>
          </article>
          <!-- // 데이터 속성 및 관리 -->
          <!--탭 -->
          <div class="tab tab--horizontal">
            <ul class="tab__bar">
              <li
                class="tab__item"
                v-for="(item, index) in tabList"
                :class="tabSelected === item.id ? 'tab__item--selected' : ''"
                :key="index"
              >
                <button
                  type="button"
                  class="tab__button"
                  role="tab"
                  aria-selected="false"
                  @click="tabGotoClick(item, index, item.ref)"
                >
                  <div class="tab__button-text">
                    {{ $t("tab." + item.id) }}
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <!--//탭 -->
          <!-- 데이터 품질지표 -->
          <article id="articleChart" ref="articleChart" class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">데이터 품질지표</h3>
            </div>
            <div class="contents__detail-chart">
              <ul class="chart">
                <li>
                  <div class="chart__graph">
                    {{ dataQualityScore.timeliness_score }}
                  </div>
                  <div class="chart__information">
                    <strong class="chart__title">적시성 (timeliness)</strong>
                    <p class="chart__description">
                      전체건수, 그룹건수, 최대값, 최소값, 중복건수, 오류건수
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph">
                    {{ dataQualityScore.validation_score }}
                  </div>
                  <div class="chart__information">
                    <strong class="chart__title">유효성 (validation)</strong>
                    <p class="chart__description">
                      데이터 형식(도메인)과 데이터 값의 일치 여부 확인
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph">
                    {{ dataQualityScore.completeness_score }}
                  </div>
                  <div class="chart__information">
                    <strong class="chart__title">완전성 (completeness)</strong>
                    <p class="chart__description">
                      Null건수, 공백건수, 컬럼내 그룹건수 등 업무규칙(BR) 반영
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph">
                    {{ dataQualityScore.usability_score }}
                  </div>
                  <div class="chart__information">
                    <strong class="chart__title">유용성</strong>
                    <p class="chart__description">
                      사용빈도, 주기 등 사용량 통계
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph">
                    {{ dataQualityScore.security_score }}
                  </div>
                  <div class="chart__information">
                    <strong class="chart__title">보안성</strong>
                    <p class="chart__description">
                      민감정보 6개월 보관 기간 준수
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </article>
          <!-- // 데이터 품질지표 -->
          <!-- 샘플 데이터 -->
          <article id="articleSample" ref="articleSample" class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">샘플 데이터</h3>
              <div class="heading-group__options">
                <base-button class="button--primary">
                  <svg-icon class="svg-icon" name="search"></svg-icon>
                  <span class="button__text">상세보기</span>
                </base-button>
              </div>
            </div>
            <div class="contents__detail-sample">
              <div class="table-wrap table-scroll scrollCustomize">
                <basic-table
                  component-id=""
                  table-class="table--data"
                  :use-checkbox="false"
                  :view-detail="sampleData"
                  :header-has-locale="false"
                  :view-header-list="sampleDataViewHeaderList"
                  rowKey="cust_pty_sbt_id"
                  :colgroup-array="['150px', '230px', 'auto:span=11']"
                  @buttonAction=""
                  @columnAction=""
                  @keyAction=""
                />
              </div>
            </div>
          </article>
          <!-- // 샘플 데이터 -->
          <!-- 파일데이터 -->
          <article class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">파일데이터</h3>
              <div class="heading-group__options">
                <div class="heading-group__notice">
                  <p class="bullet bullet--refer">
                    파일 데이터의 일부 내용을 미리보기로 제공합니다, 전체 내용이 필요한 경우 해당 파일을 다운로드 받으시기 바랍니다.
                  </p>
                </div>
                <base-button
                  class="button button--primary"
                  title="전체다운로드"
                >
                  <svg-icon class="svg-icon" name="download"></svg-icon>
                  <span class="button__text">파일 전체 다운로드</span>
                </base-button>
              </div>
            </div>
            <div class="contents__detail-filedata">
              <ul class="filedata__list">
                <li :class="isPreview ? 'open-filedata' : ''">
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end"
                      >고객 서비스 사용 일일 내역</span
                      >
                    </p>
                    <base-button
                      class="button--sm filedata__button-preview"
                      :class="isPreview ? 'filedata__button-close' : ''"
                      @click="togglePreview"
                    >
                      <span class="button__text">{{ toggleButtonText }}</span>
                    </base-button>
                    <base-button
                      class="button--sm filedata__button-download"
                      title="파일다운로드"
                    >
                      <svg-icon
                        class="svg-icon"
                        name="download-light"
                      ></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                  <!-- 파일 미리보기 -->
                  <div class="filedata__content">
                    <div class="table-wrap table-scroll scrollCustomize">
                      <table class="table table--data">
                        <caption class="hidden">
                          데이터 상세내용
                        </caption>
                        <thead>
                        <tr>
                          <th scope="col">항목</th>
                          <th scope="col">설명</th>
                          <th scope="col">데이터타입</th>
                          <th scope="col">데이터길이</th>
                          <th scope="col">소수점</th>
                          <th scope="col">PK</th>
                          <th scope="col">PK POSITION</th>
                          <th scope="col">NULL 여부</th>
                          <th scope="col">코드여부</th>
                          <th scope="col">DEFAULT</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드교통정보코드교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        <tr>
                          <td>교통정보코드</td>
                          <td>사업지구코드</td>
                          <td>VARCHAR2</td>
                          <td>6</td>
                          <td>5</td>
                          <td>Y</td>
                          <td>1</td>
                          <td>Y</td>
                          <td>Y</td>
                          <td>SYSDATE</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- // 파일 미리보기 -->
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end"
                      >고객 서비스 사용 일일 내역</span
                      >
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon
                        class="svg-icon"
                        name="download-light"
                      ></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end"
                      >고객 서비스 사용 일일 내역</span
                      >
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon
                        class="svg-icon"
                        name="download-light"
                      ></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end"
                      >고객 서비스 사용 일일 내역</span
                      >
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon
                        class="svg-icon"
                        name="download-light"
                      ></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end"
                      >고객 서비스 사용 일일 내역</span
                      >
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon
                        class="svg-icon"
                        name="download-light"
                      ></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
              </ul>
            </div>
          </article>
          <!-- // 파일데이터 -->
          <!-- 데이터 연관관계 -->
          <article id="articleDiagram" ref="articleDiagram" class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">데이터 연관관계</h3>
            </div>
            <div class="contents__detail-diagram">
              <img
                src="~@/assets/style-product/images/common/img-data-diagram.jpg"
                alt="데이터 연관관계 설명"
              />
            </div>
          </article>
          <!-- // 데이터 연관관계 -->
          <!-- 활용사례 -->
          <article class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">활용사례</h3>
            </div>
            <div class="contents__detail-used">
              <ul>
                <li>
                  <base-badge class="badge--outline badge--rounded">
                    <span class="badge__label">모바일</span>
                  </base-badge>
                  <strong class="used__title">K-Deal</strong>
                  <p class="used__description">
                    KT 고객 대상 폐쇄형 커머스몰 개인화 추천 문자 마케팅
                  </p>
                  <p class="used__date">수정일 <b>2022-06-27</b></p>
                  <base-button class="button--sm">
                    <svg-icon class="svg-icon" name="external-link"></svg-icon>
                    <span class="button__text">바로가기</span>
                  </base-button>
                </li>
                <li>
                  <base-badge class="badge--outline badge--rounded">
                    <span class="badge__label">웹</span>
                  </base-badge>
                  <strong class="used__title">K-ADs</strong>
                  <p class="used__description">
                    KT 고객 대상 문자형 타겟 광고 마케팅
                  </p>
                  <p class="used__date">수정일 <b>2022-06-27</b></p>
                  <base-button class="button--sm">
                    <svg-icon class="svg-icon" name="external-link"></svg-icon>
                    <span class="button__text">바로가기</span>
                  </base-button>
                </li>
                <li>
                  <base-badge class="badge--outline badge--rounded">
                    <span class="badge__label">기타</span>
                  </base-badge>
                  <strong class="used__title">MVNO이탈방어</strong>
                  <p class="used__description">
                    알뜰폰 요금제 이탈 예상고객 대상 선제적 이탈 방어 활동
                  </p>
                  <p class="used__date">수정일 <b>2022-06-27</b></p>
                  <base-button class="button--sm">
                    <svg-icon class="svg-icon" name="external-link"></svg-icon>
                    <span class="button__text">바로가기</span>
                  </base-button>
                </li>
                <li>
                  <base-badge class="badge--outline badge--rounded">
                    <span class="badge__label">모바일</span>
                  </base-badge>
                  <strong class="used__title">통신신용평가</strong>
                  <p class="used__description">
                    통신 이용 이력정보를 기반으로 생성하는 개인 금융 신용점수
                  </p>
                  <p class="used__date">수정일 <b>2022-06-27</b></p>
                  <base-button class="button--sm">
                    <svg-icon class="svg-icon" name="external-link"></svg-icon>
                    <span class="button__text">바로가기</span>
                  </base-button>
                </li>
                <li>
                  <base-badge class="badge--outline badge--rounded">
                    <span class="badge__label">웹</span>
                  </base-badge>
                  <strong class="used__title">개인화이력플랫폼</strong>
                  <p class="used__description">
                    기가지니 셋탑을 통해 수행되는 개인화 마케팅 추천 엔진
                  </p>
                  <p class="used__date">수정일 <b>2022-06-27</b></p>
                  <base-button class="button--sm">
                    <svg-icon class="svg-icon" name="external-link"></svg-icon>
                    <span class="button__text">바로가기</span>
                  </base-button>
                </li>
              </ul>
            </div>
          </article>
          <!-- // 활용사례 -->
          <!-- 법률검토 및 규정안내 -->
          <article id="articleRule" ref="articleRule" class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">법률검토 및 규정안내</h3>
            </div>
            <div class="contents__detail-rule scrollCustomize">
              ○ 의뢰부서의 설명에 의하면, 질의 1-1의 취지는 전화, 문자를 이용한
              마케팅 시의 고객 피로도를 감안하여 온라인 배너 광고 등의 광고
              채널을 이용하여 당사 서비스 홍보 (예시 - KT 요금제 할인 등 홍보)를
              하고자 하는 것임.<br /><br />○ 고객 혜택 수신을 위한 마케팅 동의
              및 영리목적 광고성 정보 수신 동의를 받은 광고ID에 대해 당사의 특정
              서비스에 관한 앱 푸쉬, 온라인 배너 등으로 광고하는 것은 가능할
              것임.<br />- 당사가 광고 및 마케팅 수신동의를 받지 않은 KT 멤버쉽
              고객을 대상으로 하여 생일쿠폰 혜택 관련 앱 푸쉬를 발송하였다가
              당사에 민원 제기 및 KISA에 위반사실 확인을 요청한 사례 있음
              (기검토 21-CL03886, 21-CL03458)<br /><br />※ 한편, (발송 측면에서)
              당사 개인정보 및 개인위치정보활용동의서(2)면의 고객혜택제공을 위한
              정보수집·이용동의 및 혜택·광고의 수신·위탁 동의 중 후자인 광고의
              수신·위탁 동의의 내용인, “본인이 수집 및 이용에 동의한
              개인정보·신용정보·위치정보를 활용하여, KT 및 제3자의 상품 및
              서비스에 대한 광고·홍보·프로모션·이벤트 제공 및 고객관리와 관련한
              개인정보 처리 업무를 KT의 수탁사에 위탁 하는 것과 전자적
              전공매체(전화, 우편, SMS, LMS, MMS, APP PUSH, 팩스,
              스마트마케팅플랫폼 등 포함)를 통해 정보/광고를 전송하는 데
              동의합니다.”에서, “APP PUSH”가 해당 선택 동의를 한 유무선 서비스와
            </div>
          </article>
          <!-- // 법률검토 및 규정안내 -->
          <!-- 데이터 문의 -->
          <article id="articleInquiry" ref="articleInquiry" class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">데이터 문의</h3>
              <div class="heading-group__options">
                <base-button
                  class="button--primary"
                  @click="onshowDialog('inquiryDialog')"
                >
                  <span class="button__text">문의하기</span>
                </base-button>
              </div>
            </div>
            <div class="contents__detail-inquiry">
              <div class="table-wrap">
                <table class="table table--board">
                <caption class="hidden">
                  번호, 제목, 등록일, 처리현황으로 구성된 데이터 문의 게시판
                </caption>
                <colgroup>
                  <col style="width: 80px" />
                  <col style="width: auto" />
                  <col style="width: 120px" />
                  <col style="width: 120px" />
                </colgroup>
                <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">등록일</th>
                  <th scope="col">처리현황</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1000</td>
                  <td class="text-left">
                    <a href="" class="ellipsis-end"
                    >데이터 활용 문의드립니다.</a
                    >
                    <svg-icon
                      class="svg-icon"
                      name="lock-locked"
                      title="비밀글"
                    ></svg-icon>
                  </td>
                  <td>2022-06-27</td>
                  <td>
                    <base-badge class="badge--primary-outline">
                      <span class="badge__label">처리중</span>
                    </base-badge>
                  </td>
                </tr>
                <tr>
                  <td>999</td>
                  <td class="text-left">
                    <a href="" class="ellipsis-end"
                    >유즈케이스에 사용된 데이터를 구하고 싶습니다.</a
                    >
                  </td>
                  <td>2022-06-27</td>
                  <td>답변완료</td>
                </tr>
                </tbody>
                </table>
              </div>
            </div>
            <group-pagination></group-pagination>
          </article>
          <!-- //데이터 문의 -->
          <div class="button-group justify-content-end">
            <a href="./" class="button button--lg">
              <span class="button__text">목록</span>
            </a>
            <base-button
              class="button--lg button--primary-line"
              @click="onshowDialog('errorDialog')"
            >
              <span class="button__text">데이터 오류신고</span>
            </base-button>
          </div>
        </div>
      </div>

    <!-- 데이터 활용 신청하기 Dialog -->
    <Dialog
      dialog-name="requestDialog"
      :width="'970px'"
      :height="'auto'"
      :title="'데이터 활용 신청하기'"
      confirmButtonText="신청"
      :confirmButtonDisabled="confirmButtonDisabled"
      @confirm="requestConfirmBtnClick"
      @close="resetRequestData"
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
              <ul class="data-name-list">
                <li>
                  {{ dataNm }}
                  <p
                    class="txt-info color--danger"
                    v-if="lawEvlConfYn === 'y'"
                  >
                    <strong class="required">필수</strong>법률검토 필요
                  </p>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">신청자<strong class="required">필수</strong></th>
            <td>
              <base-input id="inp-apyr" @input="setRequestData"></base-input>
              <!--
              TODO: 임시로 신청자 입력하게 해놓음, 추후 수정
              {{ `${requestData.apyr}(${requestData.emp_num})` }}
              -->
            </td>
          </tr>
          <tr>
            <th scope="row">
              신청내용<strong class="required">필수</strong> <br />(활용목적)
            </th>
            <td>
              <BaseTextarea
                id="text-apy_sbst"
                rows="6"
                element-class="text-area--fixed scrollCustomize"
                placeholder="데이터 신청 개요와 활용 목적을 입력하세요."
                :useCheckByte="false"
                @input="setRequestData"
              ></BaseTextarea>
            </td>
          </tr>
          <tr>
            <th scope="row">
              법률검토<strong class="required" v-if="lawEvlConfYn === 'y'"
            >필수</strong
            >
            </th>
            <td>
              <div class="v-group">
                <BaseTextarea
                  id="text-law_evl_conf_dt"
                  rows="6"
                  element-class="text-area--fixed scrollCustomize"
                  placeholder="법률검토 대상 데이터입니다. 법률검토 내용을 입력하거나 파일로첨부하세요. "
                  :useCheckByte="false"
                  @input="setRequestData"
                ></BaseTextarea>
                <GroupFileAttach> </GroupFileAttach>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              기간설정<strong class="required">필수</strong>
            </th>
            <td>
              <Date-picker
                :range="true"
                :endDate="requestData.end_date"
                @change="setDatePicker"
              />
            </td>
          </tr>
          </tbody>
        </table>
        <!-- // formbox -->
      </div>
      </div>
    </Dialog>
    <!-- // Dialog -->




      <!-- Dialog : 오류신고  -->
      <Dialog
        dialog-name="errorDialog"
        :width="'800px'"
        :cancelButtonText="'취소'"
        :confirmButtonText="'신고하기'"
        :title="'데이터 품질 오류신고'"
      >
        <div slot="body" class="modal__body">
          <div class="table-wrap">
            <!-- formbox -->
            <table class="formbox">
              <caption class="hidden">
                데이터 품질 오류신고 게시판
              </caption>
              <colgroup>
                <col style="width: 140px" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
              <tr>
                <th scope="row">이름</th>
                <td>홍길동</td>
              </tr>
              <tr>
                <th scope="row">이메일</th>
                <td>docean@mobigen.com</td>
              </tr>
              <tr>
                <th scope="row">오류데이터명</th>
                <td>정보 자동 노출</td>
              </tr>
              <tr>
                <th scope="row">화면 URL</th>
                <td>https://www.docean.com/portal/ui/meta/search/fullSearch/detail</td>
              </tr>
              <tr>
                <th scope="row">오류 내용<strong class="required">필수</strong></th>
                <td>
                  <base-textarea
                    :rows="10"
                    useCheckByte="true"
                    maxByte="4000"
                  ></base-textarea>
                </td>
              </tr>
              <tr>
                <th scope="row">첨부파일</th>
                <td>
                  <group-file-attach></group-file-attach>
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
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import BaseBadge from "@component/common/atoms/base-badge/base-badge.vue";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox.vue";
import BaseRadio from "@component/common/atoms/base-radio/base-radio";
import BaseTag from "@component/common/atoms/base-tag/base-tag";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseTextarea from "@component/common/atoms/base-textarea/base-textarea.vue";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupFileAttach from "@component/common/molecules/group-file-attach/group-file-attach";
import Dialog from "@functional/dialog/dialog.vue";
import ViewTable from "@component/common/organisms/view-table/view-table";
import BaseInput from "@component/common/atoms/base-input/base-input";
import moment from "moment";
import DatePicker from "@functional/datepicker/date-picker.vue";
import { successAlert, errorAlert } from "@functional/alert/alert-default";
import BasicTable from "@component/common/organisms/basic-table/basic-table.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Index",
  // async asyncData({ store, route }) {
  //   let rowId = route.query.datasetId;
  //   // TODO : asyncData 배포후에 동작 하는거 확인되면 아래 코드 사용
  //   rowId = "01bfea44-5b42-41e7-9901-8fad6997969c";
  //   await store.dispatch("meta/search/search/getDetail", rowId);
  //   const detail = store.getters["meta/search/search/detail"];
  //   return { detail };
  // },
  computed: {
    ...mapGetters({
      CONSTANTS: "defaults/constants/CONSTANTS"
    }),
    sampleData() {
      const vuex = this.$store.getters["meta/search/search/sampleData"];

      if (Object.prototype.hasOwnProperty.call(vuex, "header")) {
        const h = vuex.header;
        this.sampleDataViewHeaderList = h.map((hEl) => {
          return hEl.column_name;
        });
      } else {
        return {
          header: [],
          false: []
        };
      }
      return vuex;
    },
    detail() {
      const vuex = this.$store.getters["meta/search/search/detail"];

      if (Object.prototype.hasOwnProperty.call(vuex, "header")) {
        this.ctgry = vuex.body.ctgry.split(",").pop();
        this.dataPrvDesk = vuex.body.data_prv_desk;
        this.dataNm = vuex.body.data_nm;
        this.dataDesc = vuex.body.data_desc;
        this.ltstAmdDt = vuex.body.ltst_amd_dt;
        this.regDate = vuex.body.reg_date;

        // TODO: css 확인 위해 임시로 y로 설정
        // this.lawEvlConfYn = vuex.body.law_evl_conf_yn;
        this.lawEvlConfYn = "n";

        this.myFavoriteData = "y";
      }
      return vuex;
    },
    dataQualityScore() {
      const vuex = this.$store.getters["meta/search/search/dataQualityScore"];

      if (Object.prototype.hasOwnProperty.call(vuex, "header")) {
        return vuex.body[0];
      }
      return {
        header: [],
        body: []
      };
    }
  },
  data() {
    return {
      isPreview: false,
      tabList: [
        {
          id: "CHART",
          href: "#articleChart"
        },
        {
          id: "SAMPLE",
          href: "#articleSample"
        },
        {
          id: "DIAGRAM",
          href: "#articleDiagram"
        },
        {
          id: "RULE",
          href: "#articleRule"
        },
        {
          id: "INQUIRY",
          href: "#articleInquiry"
        }
      ],
      toggleButtonText: "test",
      bizDatasetId: null,
      ctgry: null,
      dataPrvDesk: null,
      dataNm: null,
      dataDesc: null,
      ltstAmdDt: null,
      regDate: null,
      requestData: {},
      lawEvlConfYn: null,
      confirmButtonDisabled: true,
      myFavoriteData: null,
      sampleDataViewHeaderList: [],
      tabSelected: "CHART"
    };
  },
  methods: {
    ...mapActions("meta/search/search", ["getDetail", "setSearchKeyword"]),
    ...mapActions("meta/search/search", [
      "getSampleData",
      "getDataQualityScore"
    ]),
    togglePreview: function () {
      this.isPreview = !this.isPreview;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    },
    tagClick(tagClickObj) {
      this.setSearchKeyword(tagClickObj.itemName);
      this.$router.push({
        path: "/portal/ui/meta/search/fullSearch"
      });
    },
    resetRequestData() {
      this.requestData = {
        biz_dataset_id: this.bizDatasetId,
        apyr: "", // 신청자
        emp_num: "20161665", //사원번호
        apy_sbst: "", // 신청내용
        law_evl_conf_dt: "", // 법률검토 내용
        start_date: "", // 활용기간 시작일
        end_date: moment().add(1, "Y").format() // 활용기간 종료일
      };

      this.confirmButtonDisabled = this.lawEvlConfYn === "y";
    },
    setRequestData({ id, input }) {
      const key = id.split("-").pop();
      this.requestData[key] = input;

      // TODO: 법률검토 or 파일 입력 안하면 버튼 비활성화, 현재 법률검토만 확인함 추후 수정해야함
      if (this.lawEvlConfYn === "y") {
        this.confirmButtonDisabled = !this.requestData["law_evl_conf_dt"];
      }
    },
    setDatePicker(e) {
      this.requestData["start_date"] = e.at(0);
      this.requestData["end_date"] = e.at(1);
    },
    requestConfirmBtnClick(name) {
      // TODO: 신청자를 입력값으로 받기때문에 체크, 추후 삭제
      if (!(this.requestData.apyr && this.requestData.apy_sbst)) {
        errorAlert({ content: "필수 값들을 입력해주세요" });
        return;
      }

      console.log(this.requestData);

      // TODO: 일단 3개의 데이터만 보냄, 추후 수정
      let data = {};
      data.biz_dataset_id = this.requestData.biz_dataset_id;
      data.apyr = this.requestData.apyr;
      data.apy_sbst = this.requestData.apy_sbst;

      this.$axios
        .post(this.$config.ROUTE_API_META_PREFIX + "/insertUseBoardData", data)
        .then((res) => {
          if (res !== false) {
            successAlert({
              title: "데이터 활용 신청이 완료되었습니다.",
              content:
                "활용신청하신 데이터는 마이페이지 > 내 활용내역에서 확인할 수 있습니다."
            });

            this.resetRequestData();
            // setTimeout(() => this.$modal.hide(name), 3000);
            this.$modal.hide(name);
          }
        });
    },
    myFavoriteDataClick(id, checked) {
      // TODO: myFavoriteData api 호출로 변경 시 수정
      if (checked) {
        this.myFavoriteData = "y";
      } else {
        this.myFavoriteData = "n";
      }
    },
    tabClick(tabId) {
      this.tabSelected = tabId;

      if (tabId === this.CONSTANTS.DETAIL.CHART) {
        // 데이터 상세정보
        this.getDataQualityScore(this.bizDatasetId);
      } else if (tabId === this.CONSTANTS.DETAIL.SAMPLE) {
        // 샘플 데이터
        this.getSampleData(this.bizDatasetId);
      } else if (tabId === this.CONSTANTS.DETAIL.DIAGRAM) {
        // 활용사례
      } else if (tabId === this.CONSTANTS.DETAIL.RULE) {
        // 법률검토 및 규정안내
      } else if (tabId === this.CONSTANTS.DETAIL.INQUIRY) {
        // 데이터 문의
      }
    }
  },
  created() {
    this.bizDatasetId = this.$route.query.datasetId;

    this.getDetail(this.bizDatasetId);

    // 첫번째 tab을 클릭해준다.
    this.tabClick(this.tabList[0].id);
  },
  mounted() {
    this.resetRequestData();
  },
  components: {
    BaseBadge,
    BaseCheckbox,
    BaseRadio,
    BaseTag,
    BaseButton,
    BaseTextarea,
    GroupBreadcrumb,
    GroupPagination,
    GroupFileAttach,
    Dialog,
    ViewTable,
    BaseInput,
    DatePicker,
    BasicTable
  }
};
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
