<template lang="html">
  <!--  검색 리스트 - 리스트형 / 카드형 -->
  <ul class="data-box-list">
    <li class="data-box" v-for="(item, index) in contents" :key="index">
      <a
        href="javascript:;"
        @click="dataBoxClick(item.id)"
        class="data-box__link"
      >
        <div class="data-box__information">
          <div class="data-box__top-content">
            <div class="badges">
              <!-- 제공기관 로고 (카드형일때만 보임) -->
              <div class="badge--provider-logo">
                <img
                  v-if="item.logo !== null && item.logo.length > 0"
                  :src="item.logo"
                  :alt="item.provider"
                />
                <span v-else>{{ item.provider }}</span>
              </div>
              <!-- // 제공기관 로고 -->
              <base-badge class="badge--w-gray">
                <span class="badge__label">{{ item.datatype }}</span>
              </base-badge>
              <base-badge class="badge--w-primary">
                <span class="badge__label">{{ item.category }}</span>
              </base-badge>
              <base-badge class="badge--w-primary badge--provider">
                <span class="badge__label">{{ item.provider }}</span>
              </base-badge>
            </div>
            <div class="data-options" @click.stop>
              <base-checkbox
                class="checkbox--favorite"
                :name="'myFavoriteData' + item.id"
                :checkbox-id="'data-box__check-myfavoritedata' + item.id"
                :checked="myFavoriteDataList.includes(item.id)"
                @changeData="myFavoriteDataClick"
              >
                <template v-slot:label>관심데이터 추가</template>
              </base-checkbox>
            </div>
          </div>
          <div class="data-box__content">
            <strong
              class="data-box__title"
              v-html="searchKeywordHighlight(item.title)"
            >
            </strong>
            <div class="data-filetype">
              <base-badge
                :class="'badge--filetype-0' + (fi + 1)"
                v-for="(fd, fi) in item['filetype']"
                :key="'badge_' + fi"
              >
                <span class="badge__label">{{ fd }}</span>
              </base-badge>
            </div>
          </div>
          <div>
            <p class="data-box__description">
              {{ item.content }}
            </p>
          </div>
          <div class="data-box__bottom-content">
            <div class="data-box__details" @click.stop>
              <!-- tagList에만 버블링 이벤트 막는 방법 찾아서 수정필요 -->
              <basic-tag-list
                :tagList="item.keyword"
                previousText="#"
                :useCancelButton="false"
                @tagClick="keywordClick"
              ></basic-tag-list>

              <div class="data-box__details-group">
                <dl>
                  <dt><span>수정일</span></dt>
                  <dd>{{ item.updateDate }}</dd>
                  <dt><span>조회</span></dt>
                  <dd>{{ item.views }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script type="text/javascript">
import BaseBadge from "@project/katech/atoms/base-badge/base-badge.vue";
import BaseButton from "@project/katech/atoms/base-button/base-button";
import BaseTag from "@project/katech/atoms/base-tag/base-tag.vue";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox.vue";
import BasicTagList from "@common/atoms/basic-tag-list/basic-tag-list";

export default {
  name: "SearchList",
  extends: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      }
    },
    myFavoriteDataList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    searchKeyword: {
      type: String,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {
    contents: function () {
      return this.list;
    }
  },
  components: { BaseBadge, BaseButton, BaseTag, BaseCheckbox, BasicTagList },
  watch: {},
  methods: {
    dataBoxClick(id) {
      this.$emit("dataBoxClick", { postId: id });
    },
    keywordClick(tagObj) {
      this.$emit("keywordClick", tagObj);
    },
    myFavoriteDataClick(bool, name) {
      const postId = name.split("myFavoriteData").pop();
      this.$emit("myFavoriteDataClick", { postId, bool });
    },
    searchKeywordHighlight(title) {
      if (this.searchKeyword === "") {
        return title;
      }

      // 검색어에 mark 태그 적용
      return title.replaceAll(
        this.searchKeyword,
        `<mark>${this.searchKeyword}</mark>`
      );
    }
  }
};
</script>

<style lang="scss">
@import "./search-list";
</style>
