<template lang="html">
  <div id="basicViewTable">
    <table :style="cssVariable">
      <tbody v-for="(data, i) in headerList">
        <tr>
          <th>{{ data["column_name"] }}</th>
          <td>{{ dataObj[data["column_name"]] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
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
    viewTableColumnCount: {
      type: String,
      require: false,
      default: 1
    }
  },
  computed: {
    cssVariable() {
      return {
        "--grid-template-columns": `repeat(${this.viewTableColumnCount}, 1fr)`
      };
    }
  },
  components: {},
  watch: {},
  methods: {},
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
          padding: 10px;
        }
      }
    }
  }
}
</style>
