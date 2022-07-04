<template lang="html">
  <!--  검색 리스트 - 리스트형 / 카드형 -->
  <ul class="data-box-list">
    <li v-for="(item, index) in contents" :key="'data-box_' + index">
      <div class="data-box">
        <div class="data-box__information">
          <div class="data-box__top-content">
            <div class="badges">
              <base-badge class="badge--outline badge--rounded">
                <span class="badge__label">{{
                  item.ctgry.split(",").pop()
                }}</span
                ><!-- 카테고리구분 -->
              </base-badge>
              <base-badge class="badge--provider">
                <span class="badge__label">{{ item.data_prv_desk }}</span
                ><!-- 벤더 -->
              </base-badge>
            </div>
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
          <div class="data-box__content">
            <a
              href="javascript:;"
              class="data-box__link"
              @click="dataBoxClick(item[rowKey])"
            >
              <strong
                class="data-box__title"
                v-html="searchKeywordHighlight(item.data_nm)"
              >
                <!-- 검색어에 mark 태그 적용 -->
              </strong>
              <p class="data-box__description">
                {{ item.data_desc }}
              </p>
            </a>
          </div>
          <div class="data-box__bottom-content">
            <div class="data-box__details">
              <div class="data-box__details-group">
                <dl v-if="item.ltst_amd_dt">
                  <dt>수정일</dt>
                  <dd>{{ item.ltst_amd_dt }}</dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>{{ item.reg_date }}</dd>
                </dl>
                <dl>
                  <dt>키워드</dt>
                  <dd>
                    <basic-tag-list
                      tagClass="tag--sm"
                      spanClass="tag__label"
                      :tagList="convertTagObj(item.kywrd).slice(0, 5)"
                      previous-text="#"
                      :usecancelButton="false"
                      @tagClick="keywordClick"
                    >
                    </basic-tag-list>
                  </dd>
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
              :class="
                myFavoriteDataList.includes(item[rowKey])
                  ? 'favorite-cnt__button--selected'
                  : ''
              "
              @click="
                myFavoriteDataClick(
                  item[rowKey],
                  myFavoriteDataList.includes(item[rowKey])
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
    </li>
  </ul>
</template>

<script type="text/javascript">
import BaseBadge from "@common/atoms/base-badge/base-badge.vue";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseTag from "@common/atoms/base-tag/base-tag.vue";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox.vue";
import BasicTagList from "@common/atoms/basic-tag-list/basic-tag-list";

export default {
  name: "SearchList",
  extends: {},
  props: {
    rowKey: {
      type: String,
      default: "id"
    },
    list: {
      type: Array,
      default: function () {
        return [];
      }
    },
    searchKeyword: {
      type: String,
      require: true
    },
    searchKeywordList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    myFavoriteDataList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    contents: function () {
      return this.list;
    }
  },
  components: { BaseBadge, BaseButton, BaseTag, BaseCheckbox, BasicTagList },
  watch: {},
  data() {
    return {};
  },
  methods: {
    dataBoxClick(id) {
      this.$emit("dataBoxClick", id);
    },
    searchKeywordHighlight(data) {
      let title = "";

      if (this.searchKeyword === "" && this.searchKeywordList.length === 0) {
        title = data;
      } else if (this.searchKeywordList.length > 0) {
        this.searchKeywordList.forEach((el) => {
          title = data.replaceAll(el, `<mark>${el}</mark>`);
          data = title;
        });
      }

      return title;
    },
    convertTagObj(tagString) {
      return tagString === undefined
        ? []
        : tagString.split(",").map((el, i) => {
            return {
              itemId: i,
              itemName: el
            };
          });
    },
    keywordClick(tagObj) {
      this.$emit("keywordClick", tagObj);
    },
    myFavoriteDataClick(id, checked) {
      this.$emit("myFavoriteDataClick", { id, checked: !checked });
    }
  }
};
</script>

<style lang="scss">
@import "./search-list";
</style>
