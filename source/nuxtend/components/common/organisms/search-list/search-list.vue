<template lang="html">
  <!--  검색 리스트 - 리스트형 / 카드형 -->
  <ul class="data-box-list">
    <li class="data-box" v-for="(item, index) in contents" :key="index">
      <a
        href="javascript:;"
        @click="dataBoxClick(item.biz_dataset_id)"
        class="data-box__link"
      >
        <div class="data-box__information">
          <div class="data-box__top-content">
            <div class="badges">
              <!-- 제공기관 로고 (카드형일때만 보임) -->
              <div class="badge--provider-logo">
                <img
                  v-if="
                    item.logo !== null &&
                    item.logo !== undefined &&
                    item.logo.length > 0
                  "
                  :src="item.logo"
                  :alt="item.data_prv_desk"
                />
                <span v-else>{{ item.data_prv_desk }}</span>
              </div>
              <!-- // 제공기관 로고 -->
              <base-badge class="badge--w-gray" v-if="item.data_type">
                <span class="badge__label">{{ item.data_type }}</span>
              </base-badge>
              <base-badge class="badge--w-primary">
                <span class="badge__label">{{
                  item.ctgry.split(",").pop()
                }}</span>
              </base-badge>
              <base-badge class="badge--w-primary badge--provider">
                <span class="badge__label">{{ item.data_prv_desk }}</span>
              </base-badge>
            </div>
            <div class="data-options" @click.stop>
              <base-checkbox
                class="checkbox--favorite"
                :name="'myFavoriteData' + item.biz_dataset_id"
                :checkbox-id="
                  'data-box__check-myfavoritedata' + item.biz_dataset_id
                "
                :checked="myFavoriteDataList.includes(item.biz_dataset_id)"
                @changeData="myFavoriteDataClick"
              >
                <template v-slot:label>관심데이터 추가</template>
              </base-checkbox>
            </div>
          </div>
          <div class="data-box__content">
            <strong
              class="data-box__title"
              v-html="searchKeywordHighlight(item.data_nm)"
            >
            </strong>
            <!-- fileType 제거 -->
          </div>
          <div>
            <p class="data-box__description">
              {{ item.data_desc }}
            </p>
          </div>
          <div class="data-box__bottom-content">
            <div class="data-box__details" @click.stop>
              <!-- tagList에만 버블링 이벤트 막는 방법 찾아서 수정필요 -->
              <basic-tag-list
                :tagList="convertTagObj(item.kywrd)"
                previousText="#"
                :useCancelButton="false"
                @tagClick="keywordClick"
              ></basic-tag-list>

              <div class="data-box__details-group">
                <dl>
                  <dt><span>수정일</span></dt>
                  <dd>{{ item.ltst_amd_dt }}</dd>
                  <dt><span>조회</span></dt>
                  <dd>1,222</dd>
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
import BaseBadge from "@common/atoms/base-badge/base-badge.vue";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseTag from "@common/atoms/base-tag/base-tag.vue";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox.vue";
import BasicTagList from "@common/atoms/basic-tag-list/basic-tag-list";

export default {
  name: "SearchList",
  extends: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    myFavoriteDataList: {
      type: Array,
      default: () => {
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
    searchKeywordHighlight(item) {
      let title = "";

      if (this.searchKeyword === "" && this.searchKeywordList.length === 0) {
        title = item;
      } else if (this.searchKeywordList.length > 0) {
        this.searchKeywordList.forEach((el) => {
          title = item.replaceAll(el, `<mark>${el}</mark>`);
          item = title;
        });
      } else {
        title = item.replaceAll(
          this.searchKeyword,
          `<mark>${this.searchKeyword}</mark>`
        );
      }

      return title;
    },
    convertTagObj(tagString) {
      return tagString.split(",").map((el, i) => {
        return { itemId: i, itemName: el };
      });
    }
  }
};
</script>

<style lang="scss">
@import "./search-list";
</style>
