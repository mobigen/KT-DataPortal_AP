<template lang="html">
  <div id="simple-table">
    <table>
      <thead>
        <tr>
          <th v-if="numHeaderUse">{{ numHeaderText }}</th>
          <th v-for="(h, hi) in headerList" :key="'header_' + hi">
            {{ h["column_name"] }}
          </th>
          <template v-if="buttonHeaderUse">
            <th
              v-for="(b, bi) in buttonHeaderText"
              :key="'header_button_' + bi"
            >
              {{ buttonHeaderText[bi]["buttonName"] }}
            </th>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(data, i) in dataList"
          :key="'table_body_' + i"
          @click="rowClick(data[rowKey])"
        >
          <td v-if="numHeaderUse">{{ i + 1 }}</td>

          <td v-for="(h, hi) in headerList" :key="'header_' + hi">
            {{ data[h["column_name"]] }}
          </td>
          <template v-for="(b, bi) in buttonHeaderText">
            <td @click.stop v-if="buttonHeaderUse" :key="'header_button_' + bi">
              <basic-button
                @click="
                  buttonClick(
                    data[rowKey],
                    buttonHeaderText[bi]['buttonAction']
                  )
                "
                :buttonCss="buttonHeaderText[bi]['buttonCss']"
                ><icon data="@icon/minus.svg" aria-hidden="true"></icon
              ></basic-button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/basic/basic-button.vue";
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
    numHeaderUse: {
      type: Boolean,
      require: false,
      default: false
    },
    numHeaderText: {
      type: String,
      default: ""
    },
    buttonHeaderUse: {
      type: Boolean,
      require: false,
      default: false
    },
    buttonHeaderText: {
      type: Array
    },
    componentId: {
      type: String,
      require: false
    },
    rowKey: {
      type: String,
      require: true
    }
  },
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    buttonClick(rowKey, btnAction) {
      this.$emit("buttonAction", rowKey, btnAction);
    },
    rowClick(rowKey) {
      this.$emit("columnAction", rowKey);
    }
  },
  created() {}
};
</script>

<style lang="scss">
#simple-table {
  height: 200px;
  overflow: auto;
  border-bottom: solid 1px gray;
  table {
    width: 100%;
    text-align: center;
    th {
      background-color: lightgray;
      border-top: solid 1px rgb(192, 190, 190);
      border-bottom: solid 1px rgb(192, 190, 190);
    }
    tr,
    td {
      border-bottom: 1px solid lightgray !important;
    }
    tr:hover {
      background-color: rgba(250, 240, 240, 0.952);
    }
  }
}
</style>
