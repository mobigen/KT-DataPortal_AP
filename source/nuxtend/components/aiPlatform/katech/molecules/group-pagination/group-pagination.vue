<template lang="html">
  <div class="ui-template">
    <!-- pagination -->
    <div class="pagination pc-only">
      <template v-show="showGotoFirst">
        <base-button class="button--link pagination__button" @click="gotoFirst">
          <svg-icon
            class="svg-icon"
            name="chevron-double-left-medium"
            aria-hidden="true"
          ></svg-icon>
          <span class="hidden">맨 처음으로 이동</span>
        </base-button>
      </template>
      <template v-show="showGotoPrev">
        <base-button class="button--link pagination__button" @click="gotoPrev">
          <svg-icon
            class="svg-icon"
            name="chevron-left-medium"
            aria-hidden="true"
          ></svg-icon>
          <span class="hidden">이전 페이지로 이동</span>
        </base-button>
      </template>

      <ul class="pagination__list">
        <li class="pagination__item" v-for="vp in paging.totalPage">
          <a
            class="pagination__link"
            @click="gotoPage(getPageNo(vp))"
            :key="vp"
            :class="
              paging.page === getPageNo(vp) ? 'pagination__link--selected' : ''
            "
            >{{ getPageNo(vp) }}</a
          >
        </li>
      </ul>

      <template v-show="showGotoNext">
        <base-button class="button--link pagination__button" @click="gotoNext">
          <svg-icon
            class="svg-icon"
            name="chevron-right-medium"
            aria-hidden="true"
          ></svg-icon>
          <span class="hidden">다음 페이지로 이동</span>
        </base-button>
      </template>
      <template v-show="showGotoEnd">
        <base-button class="button--link pagination__button" @click="gotoEnd">
          <svg-icon
            class="svg-icon"
            name="chevron-double-right-medium"
            aria-hidden="true"
          ></svg-icon>
          <span class="hidden">맨 마지막으로 이동</span>
        </base-button>
      </template>
    </div>

    <div class="pagination-more mobile-only">
      <button
        type="button"
        class="pagination-more__button pagination-more__button--bg-none"
        title="해당내용 더보기"
      >
        <span class="pagination-more__paging"
          >더보기
          <span class="hidden">현재</span>
          <em class="pagination-more__text-accent">{{ paging.page }}</em>
          <span class="pagination-more__total-num"
            >/<span class="hidden">전체</span>{{ paging.totalPage }}</span
          ></span
        >
        <svg-icon
          class="svg-icon pagination-more__icon"
          name="chevron-down"
          aria-hidden="true"
        ></svg-icon>
      </button>
    </div>

    <basic-view-table
      :headerList="pagingViewTable.header"
      :dataObj="pagingViewTable.body"
      viewTableColumnCount="1"
    ></basic-view-table>
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
import BaseButton from "@component/UITeam/project/katech/atoms/base-button/base-button.vue";
import BasicViewTable from "@component/aiPlatform/basic/basic-view-table";

export default {
  name: "GroupPagination",
  extends: {},
  props: {
    pagingKey: {
      type: String,
      require: true,
      defaults: "pagingKey"
    },
    showGotoFirst: {
      type: Boolean,
      require: false,
      defaults: true
    },
    showGotoEnd: {
      type: Boolean,
      require: false,
      defaults: true
    },
    showGotoPrev: {
      type: Boolean,
      require: false,
      defaults: true
    },
    showGotoNext: {
      type: Boolean,
      require: false,
      defaults: true
    },
    pagingObject: {
      type: Object,
      require: false
    },
    showTestTable: {
      type: Boolean,
      require: false,
      defaults: false
    }
  },
  data() {
    return {
      pagingViewTable: {
        header: [],
        body: {}
      }
    };
  },
  computed: {
    paging() {
      const paging =
        this.$store.getters["module/pagination/paging"][this.pagingKey];

      if (this.showTestTable) {
        let header = Object.keys(paging).map((h) => {
          return { column_name: h };
        });

        this.pagingViewTable = {
          header: header,
          body: paging
        };
      }
      return paging;
    }
  },
  components: { BaseButton, BasicViewTable },
  watch: {},
  methods: {
    ...mapActions("module/pagination", ["setNewPagination", "setPage"]),
    gotoFirst() {
      // firstPage : 1
      this.goto(1);
    },
    gotoEnd() {
      this.goto(this.paging.totalPage);
    },
    gotoPrev() {
      let prevPage = this.paging.page - 1;
      if (prevPage < 1) {
        prevPage = 1;
      }
      this.goto(prevPage);
    },
    gotoNext() {
      // 다음 페이지 번호가 마지막 페이지값보다 클 경우, 마지막 페이지를 가리킨다.
      let nextPage = this.paging.page + 1;
      const totalPage = this.paging.totalPage;
      if (nextPage > totalPage) {
        nextPage = totalPage;
      }
      this.goto(nextPage);
    },
    gotoPage(page) {
      // page 번호를 눌렀을때
      this.goto(page);
    },
    goto(page) {
      // vuex에 값을 셋팅한다.
      this.setPage({
        key: this.pagingKey,
        page: page
      });

      /**
       * paging을 눌렀을때 grid 목록도 리로드 할수 있게
       * 부모 component로 Noty를 준다.
       */
      this.$emit("pagingEvent");
    },
    getPageNo(data) {
      return this.paging.pageSet * this.paging.visiblePages + data;
    },
    pagingEvent() {}
  },
  created() {
    /**
     * pagination Component 를 불러올때, 초기화 한다.
     * 각각의 페이지 정보를 하나의 vuex가 관리하고 있기 때문에 pageKey로 관리한다.
     */
    this.setNewPagination({
      key: this.pagingKey,
      data: this.pagingObject
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./group-pagination.scss";
</style>
