<template lang="html">
  <div id="simple-viewTable">
    <table>
      <thead>
        <tr v-if="useTableHead">
          <th>Name</th>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(header, i) in viewDetail.header"
          :key="'body_tr_' + i"
          v-show="
            hideColumns.length > 0 && !hideColumns.includes(header.column_name)
          "
        >
          <th>{{ header.column_name }}</th>
          <td>{{ viewDetail.body[0][header.column_name] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-viewTable",
  extends: {},
  props: {
    useTableHead: {
      type: Boolean,
      required: false,
      default: false
    },
    viewDetail: {
      type: Object,
      require: true
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
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#simple-viewTable {
  height: 200px;
  overflow: auto;
  border-bottom: solid 1px gray;
  table,
  td,
  th {
    border: 1px solid lightgrey;
  }
  table {
    width: 100%;
    padding: 10px;
    border-collapse: collapse;
    th {
      width: 30%;
      padding: 0 10px;
    }
  }
}
</style>
