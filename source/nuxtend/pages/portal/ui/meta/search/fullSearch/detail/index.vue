<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 검색 - 상세페이지</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
    </div>
    <div class="contents">
      <!---- 외부 데이터의 경우 : section 태그에 class="outside-data" 추가 ---->
      <section>
        <!-- 데이터 개요 -->
        <article class="contents__summary">
          <!-- 데이터 요약 정보 -->
          <h3 class="hidden">데이터 요약 정보</h3>
          <div class="contents__summary-information">
            <figure>
              <!-- 카테고리 아이콘
                    1. 자동차 부품제조 : icon_summary_parts.png
                    2. 자동차 제조 : icon_summary_manufacture.png
                    3. 자동차 판매/정비 : icon_summary_sale.png
                    4. 자동차 이용 : icon_summary_used.png
                    5. 관제/사고 관련서비스 : icon_summary_accident.png
                    6. 미래차 : icon_summary_future.png
                    7. 기타 : icon_summary_etc.png
             -->
              <img
                src="~@/assets/style-product/images/common/icon_summary_accident.png"
              />
              <figcaption>관제/사고 관련서비스</figcaption>
            </figure>
            <div class="information__data">
              <div class="badges">
                <base-badge class="badge--w-gray">
                  <span class="badge__label">내부</span
                  ><!--데이터 위치 : 내부 or 외부-->
                </base-badge>
                <base-badge class="badge--w-primary">
                  <span class="badge__label">관제/사고 관련서비스</span
                  ><!--카테고리-->
                </base-badge>
              </div>
              <div class="information__data-title">
                도로교통공단_결빙사고 다발지역
              </div>
              <div class="information__data-description">
                노면 상태가 ‘서리/결빙’ 인 교통사고에 대한 사고다발지역 정보
                반경 200m에서 결빙사고가 3건 이상 일어난 지점으로, 경찰청 최종
                선정 결과 안전을 위해 시설 개선이 필요한 지역 자체 선정 등
              </div>
              <div class="information__data-details">
                <dl>
                  <dt>수정일</dt>
                  <dd>2022-05-21</dd>
                  <dt>등록일</dt>
                  <dd>2022-05-21</dd>
                </dl>
                <!-- 외부데이터 날짜 정보-->
                <p>Metadata Updated: November 12, 2020</p>
              </div>
            </div>
          </div>
          <!-- // 데이터 요약 정보 -->
          <!-- 데이터 제공처 -->
          <h3 class="hidden">데이터 제공처</h3>
          <div class="contents__summary-provider">
            <div class="provider__logo">
              <img
                src="~@/assets/style-product/images/common/provider_logo01.png"
                alt="제공기관명"
              />
              <!-- 로고 이미지 있는 경우 로고 이미지 출력 -->
              <!-- 이미지 없는 경우 제공기관명 텍스트 출력--
              <p class="provider__logo-text">국토교통부</p>
              -->
            </div>
            <div class="provider__datainfo">
              <!--조회-->
              <h4 class="hidden">조회수</h4>
              <div class="datainfo-views">
                <p class="amount">1234</p>
                <p class="title">
                  <svg-icon
                    class="svg-icon"
                    name="eye_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <span>조회</span>
                </p>
              </div>
              <!--다운로드-->
              <h4 class="hidden">다운로드수</h4>
              <div class="datainfo-download">
                <p class="amount">567</p>
                <p class="title">
                  <svg-icon
                    class="svg-icon"
                    name="download_katech"
                    aria-hidden="true"
                  ></svg-icon>
                  <span>다운로드</span>
                </p>
              </div>
            </div>
          </div>
          <!-- // 데이터 제공처 -->
        </article>
        <!-- // 데이터 개요 -->
        <!-- 기본정보 (내부) -->
        <article class="contents__detail">
          <!-- View Table Component-->
          <view-table
            :colgroup-array="['200px', 'auto', '200px', 'auto']"
            table-title="제공기관"
            :header-has-locale="true"
            :view-detail="viewDetail"
            :view-header-list="[
              'BIZ_DATASET_ID',
              'access_auth',
              'category',
              'region'
            ]"
          />
        </article>
        <!-- // 기본정보 -->
        <!-- 기본정보 (외부) -->
        <article class="contents-outside__detail">
          <h3>About this Resource</h3>
          <table class="formbox formbox--row">
            <colgroup>
              <col style="width: 200px" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Last updated</th>
                <td>unknown</td>
              </tr>
              <tr>
                <th scope="row">Created</th>
                <td>unknown</td>
              </tr>
              <tr>
                <th scope="row">Name</th>
                <td>View documentation related to this dataset</td>
              </tr>
              <tr>
                <th scope="row">Format</th>
                <td>PDF</td>
              </tr>
              <tr>
                <th scope="row">License</th>
                <td>License not specified</td>
              </tr>
              <tr>
                <th scope="row">Created</th>
                <td>over 1 year ago</td>
              </tr>
              <tr>
                <th scope="row">Media type</th>
                <td>application/pdf</td>
              </tr>
              <tr>
                <th scope="row">id</th>
                <td>0asd123asdf45a6sdf321</td>
              </tr>
              <tr>
                <th scope="row">package id</th>
                <td>0asd123asdf45a6sdf321</td>
              </tr>
              <tr>
                <th scope="row">position</th>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">revision id</th>
                <td>0asd123asdf45a6sdf321</td>
              </tr>
              <tr>
                <th scope="row">state</th>
                <td>active</td>
              </tr>
            </tbody>
          </table>
        </article>
        <!-- // 기본정보 -->
        <!-- 상세정보 -->
        <article class="contents__detail">
          <!-- View Table Component-->
          <view-table
            :colgroup-array="['200px', 'auto', '200px', 'auto']"
            table-title="상세정보"
            :header-has-locale="true"
            :view-detail="viewDetail"
            :view-header-list="[
              'title',
              'description',
              'subcategory',
              'subtitle',
              'datatype',
              'orgin_type',
              'test',
              'testdang',
              'text01',
              'heyehy',
              'hihihi',
              'kikiki'
            ]"
          />

          <!-- View Table Component-->
          <view-table
            :colgroup-array="['200px', 'auto', '200px', 'auto']"
            :header-has-locale="true"
            :view-detail="viewDetail"
            :view-header-list="['korea', 'postman2']"
            :td-cnt-in-tr="1"
            :td-colspan="3"
            :value-type="{
              korea: 'link',
              postman2: 'tag'
            }"
            @tagClick="tagClick"
          />
        </article>
        <!-- // 상세정보 -->
        <!-- 데이터 본문 정보 -->
        <article class="contents__detail">
          <h3>데이터 본문 정보</h3>
          <div class="contents__detail-original scrollCustomize">
            데이터 본문 상세 내용 데이터 본문 상세 내용 데이터 본문 상세 내용
          </div>
        </article>
        <!-- // 데이터 본문 정보 -->
        <!-- 샘플 데이터 미리보기 -->
        <article class="contents__detail">
          <h3>샘플 데이터 미리보기</h3>
          <div class="contents__detail-sample scrollCustomize">
            <table class="formbox formbox--col">
              <tbody>
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
        </article>
        <!-- // 샘플 데이터 미리보기 -->
        <!-- 파일데이터 -->
        <article class="contents__detail">
          <h3>
            파일데이터
            <div class="contents__detail-filedata-option">
              <p>
                ※ 파일 데이터의 일부 내용을 미리보기로 제공합니다, 전체 내용이
                필요한 경우 해당 파일을 다운로드 받으시기 바랍니다.
              </p>
              <base-button
                class="filedata__button-analysis"
                title="바로분석하기"
              >
                <svg-icon
                  class="svg-icon"
                  name="analysis_katech"
                  aria-hidden="true"
                ></svg-icon>
                <span class="button__text">바로 분석하기</span>
              </base-button>
              <base-button
                class="filedata__button-alldownload"
                title="전체다운로드"
              >
                <svg-icon
                  class="svg-icon"
                  name="download_katech"
                  aria-hidden="true"
                ></svg-icon>
                <span class="button__text">전체 다운로드</span>
              </base-button>
            </div>
          </h3>
          <div class="contents__detail-filedata">
            <ul>
              <li
                class="filedata__list"
                :class="isPreview ? 'open-filedata' : ''"
              >
                <div class="filedata__item">
                  <p class="filedata__item-title">
                    시도별 시간대별 교통량 분석 통계정보 .csv
                  </p>
                  <base-button
                    class="filedata__button-preview"
                    :class="isPreview ? 'filedata__button-close' : ''"
                    @click="togglePreview"
                    title="미리보기"
                  ></base-button>
                  <base-button
                    class="filedata__button-download"
                    title="파일다운로드"
                  >
                    <svg-icon
                      class="svg-icon"
                      name="download_katech"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="hidden">파일 다운로드</span>
                  </base-button>
                </div>
                <!-- 파일 미리보기 -->
                <div class="filedata__content scrollCustomize">
                  <table class="formbox formbox--col">
                    <tbody>
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
                <!-- // 파일 미리보기 -->
              </li>
              <li class="filedata__list">
                <div class="filedata__item">
                  <p class="filedata__item-title">
                    시도별 시간대별 교통량 분석 통계정보 .csv
                  </p>
                  <base-button
                    class="filedata__button-preview"
                    title="미리보기"
                  ></base-button>
                  <base-button
                    class="filedata__button-download"
                    title="파일다운로드"
                  >
                    <svg-icon
                      class="svg-icon"
                      name="download_katech"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="hidden">파일 다운로드</span>
                  </base-button>
                </div>
              </li>
              <li class="filedata__list">
                <div class="filedata__item">
                  <p class="filedata__item-title">
                    시도별 시간대별 교통량 분석 통계정보 .csv
                  </p>
                  <base-button
                    class="filedata__button-preview"
                    title="미리보기"
                  ></base-button>
                  <base-button
                    class="filedata__button-download"
                    title="파일다운로드"
                  >
                    <svg-icon
                      class="svg-icon"
                      name="download_katech"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="hidden">파일 다운로드</span>
                  </base-button>
                </div>
              </li>
              <li class="filedata__list">
                <div class="filedata__item">
                  <p class="filedata__item-title">
                    시도별 시간대별 교통량 분석 통계정보 .csv
                  </p>
                  <base-button
                    class="filedata__button-preview"
                    title="미리보기"
                  ></base-button>
                  <base-button
                    class="filedata__button-download"
                    title="파일다운로드"
                  >
                    <svg-icon
                      class="svg-icon"
                      name="download_katech"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="hidden">파일 다운로드</span>
                  </base-button>
                </div>
              </li>
              <li class="filedata__list">
                <div class="filedata__item">
                  <p class="filedata__item-title">
                    시도별 시간대별 교통량 분석 통계정보 .csv
                  </p>
                  <base-button
                    class="filedata__button-preview"
                    title="미리보기"
                  ></base-button>
                  <base-button
                    class="filedata__button-download"
                    title="파일다운로드"
                  >
                    <svg-icon
                      class="svg-icon"
                      name="download_katech"
                      aria-hidden="true"
                    ></svg-icon>
                    <span class="hidden">파일 다운로드</span>
                  </base-button>
                </div>
              </li>
            </ul>
          </div>
        </article>
        <!-- // 파일데이터 -->
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
        <!-- 추천 데이터 -->
        <article class="contents__detail">
          <h3>추천 데이터</h3>
          <div class="contents__detail-recommend">
            <!-- 추천 데이터 (카드형) 4개 출력 -->
            <search-list
              :list="contents"
              class="data-box-list--card quarter"
            ></search-list>
          </div>
        </article>
        <!-- // 추천 데이터 -->
        <!-- 버튼그룹 -->
        <div class="page__button">
          <div class="button__left"></div>
          <div class="button__center">
            <base-button class="button--2xl button--tertiary">목록</base-button>
          </div>
          <div class="button__right">
            <base-button
              class="button--2xl button--tertiary button-declaration"
              title="오류신고"
              @click="onshowDialog('declarationDialog')"
            >
              <svg-icon
                class="svg-icon"
                name="declaration_katech"
                aria-hidden="true"
              ></svg-icon>
              오류신고
              <small>※ 데이터에 오류가 발견되면 오류신고해 주세요.</small>
            </base-button>
            <!-- 외부 데이터 경우 제공처 바로가기 버튼 노출 (오류신고 버튼 비노출) -->
            <!--
            <base-button class="button--2xl button--tertiary" title="제공처 바로가기">
              <p>제공처 바로가기</p>
            </base-button>
            -->
          </div>
          <!-- 오류신고 Dialog Modal -->
          <Dialog
            dialog-name="declarationDialog"
            :width="'700px'"
            :height="'740px'"
          >
            <div slot="body" class="modal__body">
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
                  오류 발생시 관련 내용을 접수해 주세요. 캡쳐한 화면을
                  첨부해주시면 보다 빠른 처리가 가능합니다.
                </p>
              </div>
              <div class="modal__body-content">
                <ul class="modal__declaration">
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
                    <div class="item__detail">도로교통공사 결빙 다발지역</div>
                  </li>
                  <li class="modal__body-item">
                    <div class="item__title">화면 URL</div>
                    <div class="item__detail">
                      http://abcdefg.com/hijklmnop/qrstuv
                    </div>
                  </li>
                  <li class="modal__body-item bottom">
                    <div class="item__title">
                      오류내용<span class="blit_essential">*</span>
                    </div>
                    <div class="item__detail">
                      <BaseTextarea
                        rows="6"
                        class="text-area--fixed scrollCustomize"
                        placeholder="오류 내용을 입력해주세요."
                      ></BaseTextarea>
                      <!-- 텍스트 길이(byte) 표시 -->
                      <div class="text-area__byte">
                        <strong>0</strong> / 4000 bytes
                      </div>
                      <!-- // 텍스트 길이(byte) 표시 -->
                    </div>
                  </li>
                  <li class="modal__body-item">
                    <div class="item__title">파일첨부</div>
                    <div class="item__detail">
                      <div>
                        <GroupFileAttach></GroupFileAttach>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Dialog>
          <!-- // 오류신고 Dialog Modal -->
        </div>
        <!-- // 버튼그룹 -->
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseRadio from "@common/atoms/base-radio/base-radio";
import BaseTag from "@common/atoms/base-tag/base-tag";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseTextarea from "@common/atoms/base-textarea/base-textarea.vue";
import GroupBreadcrumb from "@common/molecules/group-breadcrumb/group-breadcrumb";
import GroupFileAttach from "@common/molecules/group-file-attach/group-file-attach";
import SearchList from "@common/organisms/search-list/search-list.vue";
import Dialog from "@functional/dialog/dialog.vue";
import ViewTable from "@common/organisms/view-table/view-table";
import BaseBadge from "@common/atoms/base-badge/base-badge";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Index",
  layout: "katech/katech",
  async asyncData({ store }) {
    await store.dispatch("meta/keyword-search/getContents");
  },
  computed: {
    ...mapGetters({
      contents: "meta/keyword-search/contents"
    })
  },
  data() {
    return {
      isPreview: false,
      viewDetail: {
        body: [
          {
            BIZ_DATASET_ID: "국토교통부",
            access_auth: "데이터융합처",
            category: "홍길동",
            region: "02-345-6789",
            title: "자동차제조 > 스마트팩토리",
            description: "국토교통부",
            subcategory: "국토교통부",
            subtitle: "한국어",
            datatype: "2021-06-01",
            orgin_type: "수시 (1회성 데이터)",
            test: "2021-06-01",
            testdang: "수시 (1회성 데이터)",
            text01: "2022-03-22",
            heyehy: "2023-05-16",
            hihihi: "기관 자체 또는 다운로드",
            kikiki: "-",
            korea: "http://www.openapi.com/123/56789",
            postman2: "결빙사고,사고다발지역,교통체증,대중교통,자전거"
          }
        ],
        header: [
          {
            column_name: "BIZ_DATASET_ID",
            KOR_NAME: "제공기관 (데이터 제공처)"
          },
          {
            column_name: "access_auth",
            KOR_NAME: "관리부서"
          },
          {
            column_name: "category",
            KOR_NAME: "담당자"
          },
          {
            column_name: "region",
            KOR_NAME: "관리부서 전화번호"
          },
          {
            column_name: "title",
            KOR_NAME: "카테고리 (분류)"
          },
          {
            column_name: "description",
            KOR_NAME: "라이선스"
          },
          {
            column_name: "subcategory",
            KOR_NAME: "데이터 유형"
          },
          {
            column_name: "subtitle",
            KOR_NAME: "사용언어"
          },
          {
            column_name: "datatype",
            KOR_NAME: "보유 근거"
          },
          {
            column_name: "orgin_type",
            KOR_NAME: "수집방법"
          },
          {
            column_name: "test",
            KOR_NAME: "등록일"
          },
          {
            column_name: "testdang",
            KOR_NAME: "데이터 갱신주기"
          },
          {
            column_name: "text01",
            KOR_NAME: "최근 수정일"
          },
          {
            column_name: "heyehy",
            KOR_NAME: "차기 등록 예정일"
          },
          {
            column_name: "hihihi",
            KOR_NAME: "제공형태 (유형)"
          },
          {
            column_name: "kikiki",
            KOR_NAME: "분석권한"
          },
          {
            column_name: "korea",
            KOR_NAME: "랜딩페이지 URL"
          },
          {
            column_name: "postman2",
            KOR_NAME: "키워드"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("meta/bizMeta", ["getBizMetaDetail"]),
    togglePreview: function () {
      this.isPreview = !this.isPreview;
    },
    onshowDialog(name) {
      this.$modal.show(name);
    },
    tagClick(tagClickObj) {
      console.log(tagClickObj);
    }
  },
  created() {
    // const rowId = this.$route.query.postId;
    const rowId = "830cc064-62a7-46dc-a5b1-04da598c38c0";
    // TODO :
    // this.getBizMetaDetail(rowId);
  },
  components: {
    BaseRadio,
    BaseButton,
    BaseTag,
    SearchList,
    GroupBreadcrumb,
    Dialog,
    BaseTextarea,
    GroupFileAttach,
    ViewTable,
    BaseBadge
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
