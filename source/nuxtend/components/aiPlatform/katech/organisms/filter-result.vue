<template lang="html">
  <div>
    <!--    <basic-button-->
    <!--      class="filter-reset-button"-->
    <!--      componentId=""-->
    <!--      buttonCss="text-button"-->
    <!--      :underline="false"-->
    <!--      :hoverColor="false"-->
    <!--      @click="selectFilterReset"-->
    <!--      >선택 필터 초기화</basic-button-->
    <!--    >-->

    <!--        <div v-for="(obj, key) in filterObj">-->
    <!--          <basic-label forProperty="">{{ obj.label }}</basic-label>-->
    <!--          <basic-tag-list-->
    <!--            :tagKey="key"-->
    <!--            :tag-list="getTagList(obj.componentType, key)"-->
    <!--            :tag-type="obj.componentType"-->
    <!--            :previousText="previousText"-->
    <!--            :useCancelButton="useCancelButton"-->
    <!--            :cursorPointer="cursorPointer"-->
    <!--            @tagCancel="filterTagCancel"-->
    <!--            @tagClick="filterClick"-->
    <!--          />-->
    <!--        </div>-->

    <ul :class="isDetailOpen ? 'detail_open' : ''">
<!--      tree Component-->
      <li>
        <h4>카테고리</h4>
        <div class="search-detail__items">
          <a href="#none">
            미래자동차 핵심기술
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            자동차제조
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            화물운송
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            자율주행자동차
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
        </div>
      </li>
      <li>
        <h4>제공기관</h4>
        <div class="search-detail__items">
          <a href="#none">
            국토교통부
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            도로교통공단
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            행정안전부
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
        </div>
      </li>
      <li>
        <h4>데이터 타입</h4>
        <div class="search-detail__items">
          <a href="#none">
            데이터셋(파일)
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            링크
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
        </div>
      </li>
      <li>
        <h4>키워드</h4>
        <div class="search-detail__items">
          <a href="#none">
            EV
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            견적
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            부품
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            정비
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
          <a href="#none">
            데이터
            <base-button class="detail__delete-button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
        </div>
      </li>
      <li>
        <base-button class="detail__reset-button" @click="selectFilterReset">검색조건 초기화</base-button>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
// import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
// import BasicLabel from "@component/aiPlatform/basic/basic-label.vue";
// import BasicTagList from "@component/aiPlatform/basic/basic-tag-list";
import { mapActions, mapGetters } from "vuex";
import BaseButton from "@project/katech/atoms/base-button/base-button";

export default {
  name: "select-filter-list",
  extends: {},
  props: {
    filterObj: {
      type: Object,
      require: true
    },
    treeObj: {
      type: Object,
      require: true
    },
    isDetailOpen: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      previousText: "",
      useCancelButton: true,
      cursorPointer: false
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/tree", ["categoryObjectForTag", "selectedNodeList"]),
    ...mapGetters("meta/search/search", {
      selectFilterData: "selectSearchFilterList"
    })
  },
  components: {
    // BasicTagList, BasicButton, BasicLabel,
    BaseButton
  },
  watch: {},
  methods: {
    ...mapActions("meta/search/search", [
      "changeSearchFilterList",
      "resetSearchFilterList",
      "changeSearchFilterSingle"
    ]),
    ...mapActions("module/tree", [
      "setSelectedNodeList",
      "resetSelectedNodeList"
    ]),
    filterClick(tagObj) {
      // TODO : when filter clicked, use this method.
    },
    filterTagCancel({ key, itemId, type }) {
      // checkbox와 tree의 vuex가 다르기 때문에 여기서 처리를 따로 해준다.
      if (type === this.CONSTANTS.FILTER.TYPE.CHECKBOX) {
        this.changeSearchFilterSingle({ key: key, itemId: itemId });
      } else {
        this.setSelectedNodeList({
          componentKey: this.treeObj.componentKey,
          key: itemId,
          bool: false
        });
      }
    },
    selectFilterReset() {
      console.log('filterReset')
      // checkbox reset
      this.resetSearchFilterList();
      // tree reset
      this.resetSelectedNodeList(this.treeObj.componentKey);
    },
    getTagList(componentType, key) {
      if (componentType === this.CONSTANTS.FILTER.TYPE.CHECKBOX) {
        return this.selectFilterData[key];
      } else {
        /**
         * search-tag 에 전달되어야 하는 데이터 형태는 아래와 같음.
         * [{
         *  itemId : '',
         *  itemName : ''
         * }]
         *
         * tree는 위의 형태를 고려하지 않고 만든것이기 때문에 (독자적으로)
         * 변환해주는 코드가 필요함.
         * 그걸 vuex에 getter로 지정해두었으며,
         * tree vuex를 부르기 위한 식별자 'key' 와,
         * itemName에 대칭하여 쓸 columnName이 필요함.
         * - complex-tree.vue에서 요구하는 parameter인 "treeKey"의 "nodeName"값이 필요하다.
         * treeKey는 treeObj에 들어있기 때문에 사용 할 수 있다.
         */
        return this.categoryObjectForTag(
          this.treeObj.componentKey,
          this.treeObj.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_NM]
        );
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
</style>
