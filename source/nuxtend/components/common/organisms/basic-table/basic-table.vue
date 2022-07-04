<template lang="html">
  <div>
    <table class="table table--board">
      <caption class="hidden">
        신청내역 목록 게시판
      </caption>

      <colgroup v-for="c in colgroupArray">
        <col :style="'width: ' + c" />
      </colgroup>

      <thead v-if="useHeader">
        <tr>
          <th scope="col" v-if="useSerialNum">{{ serialNumText }}</th>
          <th scope="col" v-if="useCheckbox">
            <base-checkbox
              :name="componentId + '_checkboxId1'"
              :checkboxId="componentId + '_checkboxId1'"
              title="전체선택"
            >
              <template v-slot:label>
                <slot name="label1"><span class="hidden">선택</span></slot>
              </template>
            </base-checkbox>
          </th>
          <th v-for="(h, hi) in tableHeader" :key="'header_' + hi" scope="col">
            {{ getHeaderLocale(h) }}
          </th>
          <template v-if="useTableButton">
            <th
              v-for="(value, key, index) in tableButtonText"
              :key="'header_button_' + key"
            >
              {{ tableButtonText[key]["buttonName"] }}
            </th>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(data, i) in bodyData"
          :key="'table_body_' + i"
          @click="rowClick(data[rowKey], data)"
        >
          <td v-if="useSerialNum">{{ i + 1 }}</td>
          <td v-if="useCheckbox">
            <base-checkbox
              :name="componentId + '_checkboxId1'"
              :checkboxId="componentId + '_checkboxId1'"
              title="전체선택"
            >
              <template v-slot:label>
                <slot name="label1"><span class="hidden">선택</span></slot>
              </template>
            </base-checkbox>
          </td>

          <!--          <td v-if="useTagList">-->
          <!--            <template v-for="data in data['tagList']">-->
          <!--              <basic-single-tag-->
          <!--                :tagName="data"-->
          <!--                previousText=""-->
          <!--                :cursorPointer="false"-->
          <!--                @tagClick=""-->
          <!--              ></basic-single-tag>-->
          <!--            </template>-->
          <!--          </td>-->

          <td v-for="(h, hi) in tableHeader" :key="'header_' + hi">
            <!-- button type 인 경우,-->
            <template
              v-if="
                keyActionText &&
                Object.keys(keyActionText).includes(h['column_name'])
              "
            >
              <basic-button
                buttonCss="link-button"
                underline
                hoverColor
                @click.native.stop="
                  keyClick(data[rowKey], keyActionText[h['column_name']])
                "
                >{{ bodyData[h] }}</basic-button
              >
            </template>

            <template v-else>{{ bodyData[h] }}</template>
          </td>

          <template v-for="(value, key, index) in tableButtonText">
            <td @click.stop v-if="useTableButton" :key="'header_button_' + key">
              <basic-button
                @click="buttonClick(data[rowKey], key)"
                :buttonCss="tableButtonText[key]['buttonCss']"
              >
                <template v-if="tableButtonText[key]['buttonType'] === 'icon'">
                  <fa :icon="tableButtonText[key]['iconData']"></fa>
                </template>

                <template
                  v-else-if="tableButtonText[key]['buttonType'] === 'text'"
                >
                  <template
                    v-if="tableButtonText[key]['textData'].length === 1"
                    >{{ tableButtonText[key]["textData"][0] }}</template
                  >

                  <template v-else>{{
                    tableButtonText[key]["selectButtonList"].includes(
                      data[rowKey]
                    )
                      ? tableButtonText[key]["textData"][0]
                      : tableButtonText[key]["textData"][1]
                  }}</template>
                </template>
              </basic-button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicSingleTag from "@component/aiPlatform/basic/basic-single-tag.vue";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox.vue";

export default {
  name: "basic-table",
  extends: {},
  props: {
    headerHasLocale: {
      type: Boolean,
      required: false,
      default: false
    },
    viewDetail: {
      type: Object,
      require: true,
      default: () => {
        return {
          header: [],
          body: []
        };
      }
    },
    headerLocale: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    bodyLocale: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    useSerialNum: {
      type: Boolean,
      required: false,
      default: false
    },
    serialNumText: {
      type: String,
      required: false,
      default: ""
    },
    useTableButton: {
      type: Boolean,
      required: false,
      default: false
    },
    tableButtonText: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    componentId: {
      type: String,
      required: false,
      default: "basicTableComponent"
    },
    rowKey: {
      type: String,
      required: true
    },
    keyActionText: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    useHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    useTagList: {
      type: Boolean,
      required: false
    },
    hideColumns: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    colgroupArray: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    useCheckbox: {
      type: Boolean,
      required: false,
      default: false
    },
    valueType: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    },
    columnKey: {
      type: String,
      require: false,
      default: "kor_column_name"
    },
    viewHeaderList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    detailData() {
      // viewDetail 값이 없거나, header(or body) 가 없으면, 기본값을 만들어 return 해준다.
      return this.viewDetail === undefined ||
        !Object.prototype.hasOwnProperty.call(this.viewDetail, "header")
        ? {
            header: [],
            body: []
          }
        : this.viewDetail;
    },
    bodyData() {
      /**
       * TODO : view table에 사용할 body 데이터는 object를 권장하나, 개발초기에 array로 처리했던 부분이 있어서 부득이 하게 분기처리.
       */
      return this.detailData !== undefined &&
        Object.prototype.hasOwnProperty.call(this.detailData, "body")
        ? this.detailData.body.length > 0
          ? this.detailData.body[0]
          : this.detailData.body
        : {};
    },
    tableHeader() {
      let headerList =
        this.viewHeaderList.length > 0
          ? this.viewHeaderList
          : this.detailData.header.map((el) => {
              return el.column_name;
            });
      let i = 0;
      this.hideColumns.forEach((hc) => {
        if (headerList.includes(hc)) {
          i = headerList.indexOf(hc);
          headerList.splice(i, 1);
        }
      });

      return headerList;
    }
  },
  components: { BasicButton, BasicSingleTag, BaseCheckbox },
  watch: {},
  methods: {
    buttonClick(rowKey, btnAction) {
      this.$emit("buttonAction", rowKey, btnAction);
    },
    rowClick(rowKey, rowObject) {
      this.$emit("columnAction", rowKey, rowObject);
    },
    keyClick(rowKey, keyAction) {
      this.$emit("keyAction", rowKey, keyAction);
    },
    getHeaderLocale(headerEngNm) {
      if (this.headerHasLocale) {
        if (this.detailData === undefined) {
          return "";
        }
        let headerObj = this.detailData.header.find((el) => {
          return el.column_name === headerEngNm;
        });
        if (headerObj === undefined) {
          return "";
        } else {
          return headerObj[this.columnKey];
        }
      } else {
        return Object.prototype.hasOwnProperty.call(
          this.headerLocale,
          headerEngNm
        )
          ? this.headerLocale[headerEngNm]
          : headerEngNm;
      }
    },
    getTdVal(tdValue) {
      return tdValue ? tdValue : "-";
    }
    // getBodyLocale(key, data) {
    //   return Object.prototype.hasOwnProperty.call(this.bodyLocale, key)
    //     ? this.bodyLocale[key][data[key]]
    //     : data[key];
    // }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
//#simpleTable {
//  //height: 200px;
//  overflow: auto;
//  border-bottom: solid 1px gray;
//  table {
//    width: 100%;
//    text-align: center;
//    thead {
//      th {
//        background-color: lightgray;
//        border-bottom: solid 1px rgb(192, 190, 190);
//        position: sticky;
//        top: 0px;
//      }
//    }
//    tbody {
//      tr,
//      td {
//        border-bottom: 1px solid lightgray !important;
//      }
//      tr:nth-child(1) {
//        td {
//          border-top: solid 1px rgb(192, 190, 190);
//        }
//      }
//      tr:hover {
//        background-color: rgba(250, 240, 240, 0.952);
//      }
//    }
//  }
//}
</style>
