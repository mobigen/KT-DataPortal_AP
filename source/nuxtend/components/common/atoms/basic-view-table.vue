<template lang="html">
  <div id="basicViewTable">
    <table :style="cssVariable">
      <tbody v-for="(data, i) in headerList">
        <tr>
          <th>{{ getHeaderLocale(data["column_name"]) }}</th>
          <td v-if="Array.isArray(dataObj[data['column_name']])">
            <template v-for="(ldata, li) in dataObj[data['column_name']]">
              <basic-single-tag
                v-if="useTagList"
                :tagName="ldata"
                :previousText="tagPreviousText"
                :cursorPointer="tagCursorPointer"
                @tagClick="tagClick"
              ></basic-single-tag>

              <span v-else-if="useSeparator">
                {{ ldata }}
                <template v-if="dataObj[data['column_name']].length !== li + 1">
                  {{ separator }}
                </template>
              </span>
            </template>
          </td>

          <td v-else>
            {{ dataObj[data["column_name"]] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import BasicSingleTag from "@common/atoms/basic-single-tag.vue";

export default {
  name: "basic-view-table",
  extends: {},
  data() {
    return {};
  },
  props: {
    headerList: {
      type: Array,
      require: true
    },
    dataObj: {
      type: Object,
      require: false
    },
    headerLocale: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
    },
    viewTableColumnCount: {
      type: String,
      require: false,
      default: 1
    },
    useTagList: {
      type: Boolean,
      require: false
    },
    tagPreviousText: {
      type: String,
      require: false
    },
    tagCursorPointer: {
      type: Boolean,
      require: false
    },
    useSeparator: {
      type: Boolean,
      require: false,
      default: true
    },
    separator: {
      type: String,
      require: false,
      default: ","
    }
  },
  computed: {
    cssVariable() {
      return {
        "--grid-template-columns": `repeat(${this.viewTableColumnCount}, 1fr)`
      };
    }
  },
  components: { BasicSingleTag },
  watch: {},
  methods: {
    tagClick({ tagName }) {
      this.$emit("tagClick", { tagName });
    },
    getHeaderLocale(headerEngNm) {
      return Object.prototype.hasOwnProperty.call(
        this.headerLocale,
        headerEngNm
      )
        ? this.headerLocale[headerEngNm]
        : headerEngNm;
    }
  },
  created() {}
};
</script>

<style lang="scss">
#basicViewTable {
  table {
    width: 100%;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    tbody {
      border: solid rgb(220, 220, 220) 1px;
      margin-top: -1px;
      margin-left: -1px;
      tr {
        th {
          width: 220px;
          padding: 10px;
          background-color: rgba(211, 211, 211, 0.305);
          text-align: left;
        }
        td {
          display: flex;
          padding: 10px;
        }
      }
    }
  }
}
</style>
