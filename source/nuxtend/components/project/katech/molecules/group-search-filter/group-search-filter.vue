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
          <div class="search-filter__item-group">
          <base-checkbox class="checkbox--aside" name="searchFilter" :checkbox-id="item.checkboxId">
            <template v-slot:label>{{ item.title }}</template>
          </base-checkbox>
          </div>
          <div class="search-filter__next">
            <ul class="search-filter__list">
              <li class="search-filter__item" v-for="(nextItem, index) in item.nextSearchFilterList" :key="index">
                <base-checkbox class="checkbox--aside" name="NextSearchFilter" :checkbox-id="nextItem.checkboxId">
                  <template v-slot:label>{{ nextItem.title }}</template>
                </base-checkbox>
                <div class="depth-3">
                  <ul>
                    <li v-for="(lastItem, index) in nextItem.lastSearchFilterList" :key="index">
                      <span>{{ lastItem.title }}</span>
                    </li>
                  </ul>
                </div>
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
import BaseCheckbox from "@component/project/katech/atoms/base-checkbox/base-checkbox";

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
          title: "필터 타이틀 1",
          nextSearchFilterList: [
            {
              checkboxId: '2depth-1',
              title: "2 Depth 필터 타이틀 1",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },
                {
                  checkboxId: '3depth-3',
                  title: "3 Depth 필터 타이틀 3"
                },
              ]
            },
            {
              checkboxId: '2depth-2',
              title: "2 Depth 필터 타이틀 2",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },
              ]
            },
            {
              checkboxId: '2depth-3',
              title: "2 Depth 필터 타이틀 3",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },

                {
                  checkboxId: '3depth-2',
                  title: "3 Depth 필터 타이틀 2"
                },
                {
                  checkboxId: '3depth-3',
                  title: "3 Depth 필터 타이틀 3"
                },
              ]
            }
          ]
        },
        {
          checkboxId: '2',
          title: "필터 타이틀 2 ",
          nextSearchFilterList: [
            {
              checkboxId: '2depth2-1',
              title: "2 Depth 필터 타이틀 1",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },

                {
                  checkboxId: '3depth-2',
                  title: "3 Depth 필터 타이틀 2"
                },
                {
                  checkboxId: '3depth-3',
                  title: "3 Depth 필터 타이틀 3"
                },
              ]
            }
          ]
        },
        {
          checkboxId: '3',
          title: "필터 타이틀 3 "
        },
        {
          checkboxId: '4',
          title: "필터 타이틀 4 ",
          nextSearchFilterList: [
            {
              checkboxId: '2depth4-1',
              title: "2 Depth 필터 타이틀 1"
            },
            {
              checkboxId: '2depth4-2',
              title: "2 Depth 필터 타이틀 2",

              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },

                {
                  checkboxId: '3depth-2',
                  title: "3 Depth 필터 타이틀 2"
                },
                {
                  checkboxId: '3depth-3',
                  title: "3 Depth 필터 타이틀 3"
                },
              ]
            },
            {
              checkboxId: '2depth4-3',
              title: "2 Depth 필터 타이틀 3"
            }
          ]
        },
        {
          checkboxId: '5',
          title: "필터 타이틀 5 ",
          nextSearchFilterList: [
            {
              checkboxId: '2depth5-1',
              title: "2 Depth 필터 타이틀 1"
            },
            {
              checkboxId: '2depth5-2',
              title: "2 Depth 필터 타이틀 2"
            },
            {
              checkboxId: '2depth5-3',
              title: "2 Depth 필터 타이틀 3",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },

                {
                  checkboxId: '3depth-2',
                  title: "3 Depth 필터 타이틀 2"
                }
              ]
            }
          ]
        },
        {
          checkboxId: '6',
          title: "필터 타이틀 6 ",
          nextSearchFilterList: [
            {
              checkboxId: '2depth6-1',
              title: "2 Depth 필터 타이틀 1"
            },
            {
              checkboxId: '2depth6-2',
              title: "2 Depth 필터 타이틀 2",
              lastSearchFilterList: [
                {
                  checkboxId: '3depth-1',
                  title: "3 Depth 필터 타이틀 1"
                },
                {
                  checkboxId: '3depth-2',
                  title: "3 Depth 필터 타이틀 2"
                }
                ]
              },
            {
              checkboxId: '2depth6-3',
              title: "2 Depth 필터 타이틀 3"
            }
          ]
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./group-search-filter.scss";
</style>
