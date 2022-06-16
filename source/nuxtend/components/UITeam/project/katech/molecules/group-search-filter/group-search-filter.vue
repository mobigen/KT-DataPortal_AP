<template lang="html">
  <div class="search-filter">
    <div class="search-filter__head">
      <base-checkbox class="checkbox--aside" name="searchFilterAll" checkbox-id="searchFilterAll1">
        <template v-slot:label>전체선택</template>
      </base-checkbox>
    </div>
    <div class="search-filter__body">
      <ul class="search-filter__list">
        <li class="search-filter__item" v-for="(item, index) in searchFilterList" :key="index">
          <!--1depth-->
          <div class="search-filter__item-group">
          <base-checkbox class="checkbox--aside" name="searchFilter" :checkbox-id="item.checkboxId">
            <template v-slot:label>{{ item.title }}</template>
          </base-checkbox>
          </div>
          <!--2depth-->
          <div class="search-filter__next">
            <ul class="search-filter__list">
              <li class="search-filter__item" v-for="(nextItem, index) in item.nextSearchFilterList" :key="index">
                <base-checkbox class="checkbox--aside" name="NextSearchFilter" :checkbox-id="nextItem.checkboxId">
                  <template v-slot:label>{{ nextItem.title }}</template>
                </base-checkbox>
                <!--3depth-->
                <div class="search-filter__last">
                  <ul>
                    <li v-for="(lastItem, index) in nextItem.lastSearchFilterList" :key="index">
                      <base-checkbox class="checkbox--aside" name="LastSearchFilter" :checkbox-id="lastItem.checkboxId">
                        <template v-slot:label>{{ lastItem.title }}</template>
                      </base-checkbox>
                    </li>
                  </ul>
                </div>
                <!-- // 3depth-->
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <base-button class="search-filter__button-reset">검색조건 초기화</base-button>
  </div>
</template>

<script type="text/javascript">
import BaseCheckbox from "@katech/atoms/base-checkbox/base-checkbox";

export default {
  name: "GroupSearchFilter",
  props:{
  },
  components: {
    BaseCheckbox
  },
  data() {
    return {
      searchFilterList: [
        {
          checkboxId: '1',
          title: "자동차 부품 제조 산업",
          nextSearchFilterList: [
            {
              checkboxId: '1-1',
              title: "샤시"
            },
            {
              checkboxId: '1-2',
              title: "바디"
            },
            {
              checkboxId: '1-3',
              title: "전장",
              lastSearchFilterList: [
                {
                  checkboxId: '1-3-1',
                  title: "자율차센서"
                }
              ]
            },
            {
              checkboxId: '1-4',
              title: "구동계",
              lastSearchFilterList: [
                {
                  checkboxId: '1-4-1',
                  title: "xEV 파워트레인"
                },
                {
                  checkboxId: '1-4-2',
                  title: "내연파워트레인"
                }
              ]
            }
          ]
        },
        {
          checkboxId: '2',
          title: "자동차 제조 산업(부품제외)",
          nextSearchFilterList: [
            {
              checkboxId: '2-1',
              title: "스마트팩토리 운영 데이터"
            },
            {
              checkboxId: '2-2',
              title: "조립공정 운영 데이터"
            }
          ]
        },
        {
          checkboxId: '3',
          title: "자동차 판매/정비 서비스",
          nextSearchFilterList: [
            {
              checkboxId: '3-1',
              title: "자동차 판매"
            },
            {
              checkboxId: '3-2',
              title: "자동차 부품 판매"
            },
            {
              checkboxId: '3-3',
              title: "자동차 용품 판매"
            },
            {
              checkboxId: '3-4',
              title: "자동차 정비"
            }
          ]
        },
        {
          checkboxId: '4',
          title: "자동차 이용 산업",
          nextSearchFilterList: [
            {
              checkboxId: '4-1',
              title: "여객 운송"
            },
            {
              checkboxId: '4-2',
              title: "화물 운송"
            },
            {
              checkboxId: '4-3',
              title: "자동차 임대/리스",
              lastSearchFilterList: [
                {
                  checkboxId: '4-3-1',
                  title: "SK렌터카"
                }
              ]
            },
            {
              checkboxId: '4-4',
              title: "주차장"
            }
          ]
        },
        {
          checkboxId: '5',
          title: "관제/사고 관련 서비스 산업",
          nextSearchFilterList: [
            {
              checkboxId: '5-1',
              title: "도로 관제"
            },
            {
              checkboxId: '5-2',
              title: "사고 관제"
            }
          ]
        },
        {
          checkboxId: '6',
          title: "미래차 산업",
          nextSearchFilterList: [
            {
              checkboxId: '6-1',
              title: "자율주행차"
            },
            {
              checkboxId: '6-2',
              title: "전기차"
            }
          ]
        },
        {
          checkboxId: '7',
          title: "기타",
          nextSearchFilterList: [
            {
              checkboxId: '7-1',
              title: "정유, 윤활유, 주유소, 충전소"
            },
            {
              checkboxId: '7-2',
              title: "보험, 금융",
              lastSearchFilterList: [
                {
                  checkboxId: '7-2-1',
                  title: "보험사 데이터"
                }
              ]
            },
            {
              checkboxId: '7-3',
              title: "운전교습"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./group-search-filter.scss";
</style>
