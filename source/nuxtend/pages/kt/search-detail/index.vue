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
                      <span class="badge__label">모바일</span
                      ><!-- 카테고리구분 -->
                    </base-badge>
                    <base-badge class="badge--provider">
                      <span class="badge__label">D-Ocean</span
                      ><!-- 벤더 -->
                    </base-badge>
                  </div>
                </div>
                <div class="data-box__content">
                  <strong class="data-box__title">
                    제목<mark>검색어</mark>
                    <!-- 검색어에 mark 태그 적용 -->
                  </strong>
                  <p class="data-box__description">고객 혜택 수신을 위한 마케팅 동의 및 영리목적 광고성 정보 수신 동의를 받은 광고ID에 대해 당사의 특정 서비스에 관한 앱 푸쉬, 온라인 배너 등으로 광고하는 것은 가능할 것임.
- 당사가 광고 및 마케팅 수신동의를 받지 않은 KT 멤버쉽 고객을 대상으로 하여 생일쿠폰 혜택 관련 앱 푸쉬를 발송하였다가 당사에 민원 제기 및 KISA에 위반사실 확인을 요청한 사례 있음 (기검토 21-CL03886, 21-CL03458)</p>
                </div>
                <div class="data-box__bottom-content">
                  <div class="data-box__details">
                    <!-- 수정일,등록일 -->
                    <div class="data-box__details-group">
                      <dl>
                        <dt><span>수정일</span></dt>
                        <dd>2022-06-17</dd>
                      </dl>
                      <dl>
                        <dt><span>등록일</span></dt>
                        <dd>2022-06-16</dd>
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
                <base-button class="button--primary">
                  <span class="button__text">바로활용</span>
                </base-button>
                <base-button class="button--primary-line">
                  <span class="button__text">담아두기</span>
                </base-button>
                <div class="favorite-cnt">
                  <base-button
                    class="favorite-cnt__button"
                    :class="isToggle ? 'favorite-cnt__button--selected' : ''"
                    @click="toggleBtn"
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
            <div class="heading-group">
              <h3 class="heading-group__title">기본정보</h3>
            </div>
            <table class="formbox">
              <colgroup>
                <col style="width: 180px" />
                <col style="width: auto" />
                <col style="width: 180px" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">담당부서</th>
                  <td>데이터 융복합팀</td>
                  <th scope="row">담당자 (관리자)</th>
                  <td>김하빈</td>
                </tr>
                <tr>
                  <th scope="row">참조부서</th>
                  <td>-</td>
                  <th scope="row">참조자 (요청자)</th>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </article>
          <!-- // 기본정보 -->
          <!-- 데이터 속성 및 관리 -->
          <article class="contents__detail">
            <div class="heading-group">
              <h3 class="heading-group__title">데이터 속성 및 관리</h3>
            </div>
            <table class="formbox">
              <colgroup>
                <col style="width: 180px" />
                <col style="width: auto" />
                <col style="width: 180px" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">카테고리 (분류)</th>
                  <td>모바일</td>
                  <th scope="row">데이터 형태</th>
                  <td>파일</td>
                </tr>
                <tr>
                  <th scope="row">등록일</th>
                  <td>2022.06.01</td>
                  <th scope="row">데이터 갱신주기</th>
                  <td>1일</td>
                </tr>
                <tr>
                  <th scope="row">최신 수정일</th>
                  <td>2022.06.30</td>
                  <th scope="row">갱신 예정일</th>
                  <td>2022.07.01</td>
                </tr>
                <tr>
                  <th scope="row">제공방식</th>
                  <td>엑셀 다운로드</td>
                  <th scope="row">법률검토 필요여부</th>
                  <td>Y</td>
                </tr>
                <tr>
                  <th scope="row">파일용량</th>
                  <td>1.0GB</td>
                  <th scope="row">보안성검토 필요여부</th>
                  <td>Y</td>
                </tr>
                <tr>
                  <th scope="row">공개범위</th>
                  <td colspan="3">-</td>
                </tr>
              </tbody>
            </table>
            <table class="formbox">
              <colgroup>
                <col style="width: 180px" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">원천시스템</th>
                  <td>KDAP</td>
                </tr>
                <tr>
                  <th scope="row">원천 URL</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">키워드</th>
                  <td>
                    <div class="tags">
                      <base-tag class="tag--sm" href="#"
                        ><span class="tag__label">#트래픽</span></base-tag
                      >
                      <base-tag class="tag--sm" href="#"
                        ><span class="tag__label">#URL</span></base-tag
                      >
                      <base-tag class="tag--sm" href="#"
                        ><span class="tag__label">#관심</span></base-tag
                      >
                      <base-tag class="tag--sm" href="#"
                        ><span class="tag__label">#프로파일</span></base-tag
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
          <!-- // 데이터 속성 및 관리 -->
          <!--탭 -->
          <div class="tab tab--horizontal">
            <ul class="tab__bar">
              <li
                class="tab__item"
                v-for="(item, index) in tabList"
                :class="currentTabIdx === index ? 'tab__item--selected' : ''"
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
                    {{ item.title }}
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
                  <div class="chart__graph"></div>
                  <div class="chart__information">
                    <strong class="chart__title">적시성</strong>
                    <p class="chart__description">
                      전체건수, 그룹건수, 최대값, 최소값, 중복건수, 오류건수
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph"></div>
                  <div class="chart__information">
                    <strong class="chart__title">유효성</strong>
                    <p class="chart__description">
                      데이터 형식(도메인)과 데이터 값의 일치 여부 확인
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph"></div>
                  <div class="chart__information">
                    <strong class="chart__title">완전성</strong>
                    <p class="chart__description">
                      Null건수, 공백건수, 컬럼내 그룹건수 등 업무규칙(BR) 반영
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph"></div>
                  <div class="chart__information">
                    <strong class="chart__title">유용성</strong>
                    <p class="chart__description">
                      사용빈도, 주기 등 사용량 통계
                    </p>
                  </div>
                </li>
                <li>
                  <div class="chart__graph"></div>
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
                <table class="table table--data">
                  <caption class="hidden">
                    샘플데이터 상세정보 안내표
                  </caption>
                  <colgroup>
                    <col style="width: 150px" />
                    <col style="width: 230px" />
                    <col style="width: auto" span="11" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">cust_pty_sbt_id</th>
                      <th scope="col">svc_cont_id</th>
                      <th scope="col">conn_date</th>
                      <th scope="col">timezn_div_cd</th>
                      <th scope="col">app_nm</th>
                      <th scope="col">app_cmpn_nm</th>
                      <th scope="col">ctgry_nm</th>
                      <th scope="col">ctgry_dtl_nm</th>
                      <th scope="col">svc_nm</th>
                      <th scope="col">log_cascnt</th>
                      <th scope="col">byte_size</th>
                      <th scope="col">etl_dt</th>
                      <th scope="col">base_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1271665706</td>
                      <td>KEn/ygDs3q3VQ4HCCWUg9A==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>mF6QV7SwMKjpauEOb0Hg8g==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>IT/통신</td>
                      <td>포털서비스</td>
                      <td>카카오</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>FaQM3GdzPJRrD5KVkq/vhw==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>IT/통신</td>
                      <td>포털서비스</td>
                      <td>카카오</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>lqXdr5QSSCvxnYkPqAheLw==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>wlXAwzcuNSRmPSgdRVFh/w==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>sEz/OcHT6ge88gJ3XFzkWw==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>KEn/ygDs3q3VQ4HCCWUg9A==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>KEn/ygDs3q3VQ4HCCWUg9A==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                    <tr>
                      <td>1271665706</td>
                      <td>KEn/ygDs3q3VQ4HCCWUg9A==</td>
                      <td>20220608</td>
                      <td>C_0600_1000</td>
                      <td></td>
                      <td></td>
                      <td>종합쇼핑</td>
                      <td>해외/구매대행</td>
                      <td>AMAZON</td>
                      <td>2</td>
                      <td>25262</td>
                      <td>20220610080034</td>
                      <td>20220608</td>
                    </tr>
                  </tbody>
                </table>
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
                <base-button class="button--primary">
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
                      <span class="ellipsis-end">고객 서비스 사용 일일 내역</span>
                    </p>
                    <base-button
                      class="button--sm filedata__button-preview"
                      :class="isPreview ? 'filedata__button-close' : ''"
                      @click="togglePreview"
                    >
                      <span class="button__text">{{ toggleButtonText }}</span>
                    </base-button>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon class="svg-icon" name="download-light"></svg-icon>
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
                      <span class="ellipsis-end">고객 서비스 사용 일일 내역</span>
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon class="svg-icon" name="download-light"></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end">고객 서비스 사용 일일 내역</span>
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon class="svg-icon" name="download-light"></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end">고객 서비스 사용 일일 내역</span>
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon class="svg-icon" name="download-light"></svg-icon>
                      <span class="button__text">다운로드</span>
                    </base-button>
                  </div>
                </li>
                <li>
                  <div class="filedata__item">
                    <p class="filedata__item-title">
                      <span class="ellipsis-end">고객 서비스 사용 일일 내역</span>
                    </p>
                    <base-button class="button--sm filedata__button-download">
                      <svg-icon class="svg-icon" name="download-light"></svg-icon>
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
                        name="lock"
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

      <!-- Dialog : 문의하기  -->
      <Dialog
        dialog-name="inquiryDialog"
        :width="'970px'"
        :title="'데이터 문의하기'"
      >
        <div slot="body" class="modal__body">
          <!-- formbox -->
          <table class="formbox">
            <caption class="hidden">
              데이터 문의하기 게시판
            </caption>
            <colgroup>
              <col style="width: 140px" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">신청유형</th>
                <td>
                  <div
                    class="select"
                    role="select"
                    :class="isSelectOpen ? 'select--open' : ''"
                    @click="isSelectOpen = !isSelectOpen"
                  >
                    <div
                      class="select-selector"
                      aria-expanded="false"
                      aria-controls="select-01"
                    >
                      <button class="select-selector__button" type="button">
                        <slot name="title">
                          <span class="select-selector__title"
                            >데이터 문의</span
                          >
                        </slot>
                        <svg-icon
                          class="svg-icon select-selector__icon"
                          name="chevron-down-medium"
                          aria-hidden="true"
                        ></svg-icon>
                      </button>
                    </div>
                    <div
                      class="select-container"
                      id="select-01"
                      aria-haspopup="true"
                    >
                      <ul class="select-container__list">
                        <slot name="list">
                          <!-- 선택 된 객체에 select-container__item--selected 클래스 추가 -->
                          <li
                            class="select-container__item select-container__item--selected"
                          >
                            <button
                              class="select-container__button"
                              type="button"
                              role="option"
                            >
                              <span class="select-container__text"
                                >데이터 문의</span
                              >
                            </button>
                          </li>
                          <li class="select-container__item">
                            <button
                              class="select-container__button"
                              type="button"
                              role="option"
                            >
                              <span class="select-container__text">일반</span>
                            </button>
                          </li>
                          <li class="select-container__item">
                            <button
                              class="select-container__button"
                              type="button"
                              role="option"
                            >
                              <span class="select-container__text">시스템</span>
                            </button>
                          </li>
                          <li class="select-container__item">
                            <button
                              class="select-container__button"
                              type="button"
                              role="option"
                            >
                              <span class="select-container__text">기타</span>
                            </button>
                          </li>
                        </slot>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">데이터명</th>
                <td>테이터명이 자동으로 들어갑니다.</td>
              </tr>
              <tr>
                <th scope="row">제목<strong class="required">필수</strong></th>
                <td>
                  <base-input
                    type="text"
                    placeholder="제목을 입력하세요."
                  ></base-input>
                </td>
              </tr>
              <tr>
                <th scope="row">내용<strong class="required">필수</strong></th>
                <td>
                  <base-textarea :rows="10"></base-textarea>
                </td>
              </tr>
              <tr>
                <th scope="row">비밀글여부</th>
                <td>
                  <base-switch
                    ><label for="toggleSwitch1" class="toggle-switch__label"
                      >공개</label
                    ></base-switch
                  >
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
      </Dialog>
      <!-- // Dialog -->
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseBadge from "@component/common/atoms/base-badge/base-badge.vue";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox.vue";
import BaseRadio from "@component/common/atoms/base-radio/base-radio";
import BaseTag from "@component/common/atoms/base-tag/base-tag";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseInput from "@component/common/atoms/base-input/base-input";
import BaseSelet from "@component/common/atoms/base-select/base-select";
import BaseSwitch from "@component/common/atoms/base-switch/base-switch";
import BaseTextarea from "@component/common/atoms/base-textarea/base-textarea.vue";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupFileAttach from "@component/common/molecules/group-file-attach/group-file-attach";
import Dialog from "@functional/dialog/dialog.vue";
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
      toggleButtonText :"미리보기",
      isToggle: false,
      isSelectOpen: false,
      tabList: [
        { ref: "articleChart", title: "데이터 상세정보"},
        { ref: "articleSample", title: "샘플 데이터"},
        { ref: "articleDiagram", title: "활용사례"},
        { ref: "articleRule", title: "법률검토 및 규정안내"},
        { ref: "articleInquiry", title: "데이터 문의" }
      ],
      currentTabIdx: 0,
    };
  },
  methods: {
    togglePreview: function () {
      this.isPreview = !this.isPreview;
      this.toggleButtonText = this.toggleButtonText == "닫기" ? "미리보기" : "닫기";
    },
    toggleBtn: function () {
      this.isToggle = !this.isToggle;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    }
  },
  components: {
    BaseBadge,
    BaseCheckbox,
    BaseRadio,
    BaseTag,
    BaseButton,
    BaseInput,
    BaseSelet,
    BaseSwitch,
    BaseTextarea,
    GroupBreadcrumb,
    GroupPagination,
    GroupFileAttach,
    Dialog
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
