import ViewTable from "./view-table.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "AiPlatform/organisms/[PIFC] 상세 테이블 ",
  components: ViewTable,
  decorators: [
    () => ({
      template: `<div style="margin: 1em;">
          <h2 style="margin-bottom: 20px; font-size: 20px; color: #212121;">(예시) 상세 테이블 </h2>
          <h5 style="margin-bottom: 40px; font-size: 15px; color: #212121;">
            * td row 에 적용할 수 있는 component : 'link', 'tag'
          </h5>
          <story />
        </div>`
    })
  ],

  args: {
    colGroupArray: ["200px", "auto", "200px", "auto"],
    tableTitle: "제공기관",
    tdCntInTr: 1,
    tdColspan: 3,
    valueTypeObj: {
      korea: "link",
      postman2: "tag"
    },
    viewHeaderList: [
      "BIZ_DATASET_ID",
      "access_auth",
      "category",
      "region",
      "korea",
      "postman2"
    ],
    viewDetail_body: [
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
    viewDetail_header: [
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
  },
  argTypes: {
    colGroupArray: {
      type: "array",
      control: {
        type: "object"
      }
    },
    tableTitle: {
      type: "string"
    },
    viewDetail_body: {
      type: "array",
      control: {
        type: "object"
      }
    },
    viewDetail_header: {
      type: "array",
      control: {
        type: "object"
      }
    },
    viewHeaderList: {
      type: "array",
      control: {
        type: "object"
      }
    },
    tdCntInTr: {
      type: "number"
    },
    tdColspan: {
      type: "number"
    },
    valueTypeObj: {
      type: "object",
      control: {
        type: "object"
      }
    }
  }
};

export const Default = (args, { argTypes }) => ({
  components: { ViewTable },
  template: `
    <article class="contents__detail">
      <view-table
      :colgroup-array="colGroupArray"
      :table-title="tableTitle"
      :header-has-locale="true"
      :view-detail="{
        body : viewDetail_body, header : viewDetail_header
      }"
      :view-header-list="viewHeaderList"
      :td-cnt-in-tr="tdCntInTr"
      :td-colspan="tdColspan"
      :value-type="valueTypeObj"
      @tagClick="tagClick"
      />
    </article>`,
  computed: {
    colGroupArray() {
      return args.colGroupArray;
    },
    tableTitle() {
      return args.tableTitle;
    },
    viewDetail_body() {
      return args.viewDetail_body;
    },
    viewDetail_header() {
      return args.viewDetail_header;
    },
    tdCntInTr() {
      return args.tdCntInTr;
    },
    tdColspan() {
      return args.tdColspan;
    },
    valueTypeObj() {
      return args.valueTypeObj;
    },
    viewHeaderList() {
      return args.viewHeaderList;
    }
  },
  methods: {
    tagClick(p) {
      action("tagClick")(p);
    }
  }
});
