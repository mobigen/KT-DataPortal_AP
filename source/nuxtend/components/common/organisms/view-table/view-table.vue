<template lang="html">
  <div>
    <h3>{{ tableTitle }}</h3>
    <table class="formbox formbox--row">
      <colgroup v-for="c in colgroupArray">
        <col :style="'width: ' + c" />
      </colgroup>
      <tbody>
        <template v-for="(h, i) in tableHeader">
          <tr v-if="i % tdCntInTr === 0" :key="'body_tr_' + i">
            <template v-for="tdCnt in tdCntInTr">
              <th scope="row" :key="'tdCnt_th_' + i + '_' + (tdCnt - 1)">
                {{ getHeaderLocale(tableHeader[i + (tdCnt - 1)]) }}
              </th>
              <td
                :key="'tdCnt_td_' + i + '_' + (tdCnt - 1)"
                :colspan="tdColspan"
              >
                <template
                  v-if="
                    Object.prototype.hasOwnProperty.call(
                      valueType,
                      tableHeader[i + (tdCnt - 1)]
                    )
                  "
                >
                  <template
                    v-if="valueType[tableHeader[i + (tdCnt - 1)]] === 'link'"
                  >
                    <a
                      :href="bodyData[tableHeader[i + (tdCnt - 1)]]"
                      target="_blank"
                      title="새창열기"
                      >{{ bodyData[tableHeader[i + (tdCnt - 1)]] }}</a
                    >
                  </template>
                  <template
                    v-else-if="
                      valueType[tableHeader[i + (tdCnt - 1)]] === 'tag'
                    "
                  >
                    <basic-tag-list
                      :tagList="
                        convertTagObj(bodyData[tableHeader[i + (tdCnt - 1)]])
                      "
                      previousText="#"
                      :useCancelButton="false"
                      @tagClick="tagComponentClick"
                    />
                  </template>
                </template>
                <template v-else>
                  {{ bodyData[tableHeader[i + (tdCnt - 1)]] }}
                </template>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import BasicTagList from "@common/atoms/basic-tag-list/basic-tag-list";

export default {
  name: "basic-viewTable",
  extends: {},
  props: {
    headerHasLocale: {
      type: Boolean,
      require: false,
      default: false
    },
    tableTitle: {
      type: String,
      require: true
    },
    colgroupArray: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    viewHeaderList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    viewDetail: {
      type: Object,
      require: true
    },
    headerLocale: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    },
    hideColumns: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    tdCntInTr: {
      type: Number,
      require: false,
      default: 2
    },
    tdColspan: {
      type: Number,
      require: false
    },
    valueType: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    bodyData() {
      /**
       * TODO : view table에 사용할 body 데이터는 object를 권장하나, 개발초기에 array로 처리했던 부분이 있어서 부득이 하게 분기처리.
       */
      return this.viewDetail !== undefined &&
        Object.prototype.hasOwnProperty.call(this.viewDetail, "body")
        ? this.viewDetail.body.length > 0
          ? this.viewDetail.body[0]
          : this.viewDetail.body
        : {};
    },
    tableHeader() {
      let headerList =
        this.viewHeaderList.length > 0
          ? this.viewHeaderList
          : this.viewDetail.header.map((el) => {
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
  components: { BasicTagList },
  watch: {},
  methods: {
    getHeaderLocale(headerEngNm) {
      if (this.headerHasLocale) {
        let headerObj = this.viewDetail.header.find((el) => {
          return el.column_name === headerEngNm;
        });
        if (headerObj === undefined) {
          console.log(headerEngNm);
        } else {
          return headerObj.kor_name;
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
    tagComponentClick(tagObj) {
      this.$emit("tagClick", tagObj);
    },
    convertTagObj(tagString) {
      return tagString.split(",").map((el, i) => {
        return { itemId: i, itemName: el };
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "view-table";
</style>
