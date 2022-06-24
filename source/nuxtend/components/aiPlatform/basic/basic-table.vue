<template lang="html">
  <div id="simpleTable">
    <table>
      <thead v-if="useHeader">
        <tr>
          <th v-if="useSerialNum">{{ serialNumText }}</th>
          <th
            v-for="(h, hi) in headerList"
            :key="'header_' + hi"
            v-show="!hideColumns.includes(h['column_name'])"
          >
            {{ getHeaderLocale(h["column_name"]) }}
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
          v-for="(data, i) in dataList"
          :key="'table_body_' + i"
          @click="rowClick(data[rowKey], data)"
        >
          <td v-if="useSerialNum">{{ i + 1 }}</td>

          <td v-if="useTagList">
            <template v-for="data in data['tagList']">
              <basic-single-tag
                :tagName="data"
                previousText=""
                :cursorPointer="false"
                @tagClick=""
              ></basic-single-tag>
            </template>
          </td>

          <td
            v-for="(h, hi) in headerList"
            :key="'header_' + hi"
            v-show="!hideColumns.includes(h['column_name'])"
          >
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
                >{{ getBodyLocale(h["column_name"], data) }}</basic-button
              >
            </template>
            <template v-else>{{
              getBodyLocale(h["column_name"], data)
            }}</template>
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
    <!--    {{ tableButtonText }}-->
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicSingleTag from "@component/aiPlatform/basic/basic-single-tag.vue";

export default {
  name: "basic-table",
  extends: {},
  props: {
    headerList: {
      type: Array,
      require: true
    },
    dataList: {
      type: Array,
      require: true
    },
    headerLocale: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    },
    bodyLocale: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    },
    useSerialNum: {
      type: Boolean,
      require: false,
      default: false
    },
    serialNumText: {
      type: String,
      require: false,
      default: ""
    },
    useTableButton: {
      type: Boolean,
      require: false,
      default: false
    },
    tableButtonText: {
      type: Object,
      require: false
    },
    componentId: {
      type: String,
      require: false
    },
    rowKey: {
      type: String,
      require: true
    },
    keyActionText: {
      type: Object,
      require: false
    },
    useHeader: {
      type: Boolean,
      require: false,
      default: true
    },
    useTagList: {
      type: Boolean,
      require: false
    },
    hideColumns: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  components: { BasicButton, BasicSingleTag },
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
      return Object.prototype.hasOwnProperty.call(
        this.headerLocale,
        headerEngNm
      )
        ? this.headerLocale[headerEngNm]
        : headerEngNm;
    },
    getBodyLocale(key, data) {
      return Object.prototype.hasOwnProperty.call(this.bodyLocale, key)
        ? this.bodyLocale[key][data[key]]
        : data[key];
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#simpleTable {
  //height: 200px;
  overflow: auto;
  border-bottom: solid 1px gray;
  table {
    width: 100%;
    text-align: center;
    thead {
      th {
        background-color: lightgray;
        border-bottom: solid 1px rgb(192, 190, 190);
        position: sticky;
        top: 0px;
      }
    }
    tbody {
      tr,
      td {
        border-bottom: 1px solid lightgray !important;
      }
      tr:nth-child(1) {
        td {
          border-top: solid 1px rgb(192, 190, 190);
        }
      }
      tr:hover {
        background-color: rgba(250, 240, 240, 0.952);
      }
    }
  }
}
</style>
