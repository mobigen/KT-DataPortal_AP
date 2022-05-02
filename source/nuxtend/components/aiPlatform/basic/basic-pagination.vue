<template lang="html">
  <div class="pagination-wrap">
    <div class="pagination">
      <template v-show="showGotoFirst">
        <a @click="gotoFirst">
          <fa icon="angles-left" />
        </a>
      </template>
      <template v-show="showGotoPrev">
        <a @click="gotoPrev">
          <fa icon="angle-left" />
        </a>
      </template>

      <template v-for="vp in paging.visiblePages">
        <a
          @click="gotoPage(getPageNo(vp))"
          :class="{ active: paging.page === getPageNo(vp) }"
          >{{ getPageNo(vp) }}</a
        >
      </template>

      <template v-show="showGotoNext">
        <a @click="gotoNext">
          <fa icon="angle-right" />
        </a>
      </template>
      <template v-show="showGotoEnd">
        <a @click="gotoEnd">
          <fa icon="angles-right" />
        </a>
      </template>
    </div>

    <div v-if="showInfoTable">
      <basic-viewTable
        :useTableHead="false"
        :viewDetail="pagingViewTable"
      ></basic-viewTable>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from "vuex";
import BasicViewTable from "@/components/aiPlatform/basic/basic-viewTable.vue";

export default {
  name: "basic-pagination",
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
    }
  },
  data() {
    return {
      showInfoTable: false,
      pagingViewTable: {
        header: [],
        body: []
      }
    };
  },
  computed: {
    paging: {
      get() {
        const paging =
          this.$store.getters["module/pagination/paging"][this.pagingKey];

        if (this.showInfoTable) {
          let header = Object.keys(paging).map((h) => {
            return { column_name: h };
          });

          this.pagingViewTable = {
            header: header,
            body: [paging]
          };
        }
        return paging;
      }
    }
  },
  components: { BasicViewTable },
  watch: {},
  methods: {
    ...mapActions("module/pagination", ["setPage", "setNewPagination"]),
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
    },
    getPageNo(data) {
      return this.paging.pageSet * this.paging.visiblePages + data;
    }
  },
  created() {
    this.showInfoTable = process.env.NODE_ENV === "development";
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
.pagination-wrap {
  text-align: center;
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  cursor: pointer;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
