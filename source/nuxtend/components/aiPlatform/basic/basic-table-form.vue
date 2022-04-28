<template lang="html">
  <div id="simple-viewForm">
    <table>
      <tbody>
        <tr v-for="(row, i) in viewDetail" :key="'body_tr_' + i">
          <th>
            {{ row[CONSTANTS.DEFAULT_NAME_COLUMN] }}
          </th>
          <td>
            <template v-if="row.value_type === 0">
              <text-input
                :placeholder="placeholder"
                :labelName="row.item_id"
                :inputData="rowValues[row[CONSTANTS.DEFAULT_NAME_COLUMN]]"
                @input="changeData"
              ></text-input>
            </template>
            <template v-else-if="row.value_type === 1">
              <number-input
                :placeholder="placeholder"
                :labelName="row.item_id"
                :inputData="rowValues[row[CONSTANTS.DEFAULT_NAME_COLUMN]]"
                @input="changeData"
              ></number-input>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import TextInput from "@/components/aiPlatform/basic/text-input";
import NumberInput from "@/components/aiPlatform/basic/number-input";
import { mapGetters } from "vuex";

export default {
  name: "basic-viewForm",
  extends: {},
  data() {
    return {
      changeDataObject: {}
    };
  },
  props: {
    viewDetail: {
      type: Array,
      require: true
    },
    rowValues: {
      type: Object,
      require: false
    },
    placeholder: {
      type: String,
      require: false,
      default: "내용을 입력해주세요."
      // default: (props) => {
      //   // console.log(this.CONSTANTS);
      //   console.log(props);
      //     // return "값이 없습니다.";
      //   return inject("placeholder", "값이 없ㅂ스");
      //   // return this.CONSTANTS.MSG.PLACEHOLDER;
      // }
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { TextInput, NumberInput },
  watch: {},
  methods: {
    changeData(label, input) {
      this.$set(this.changeDataObject, label, input);

      this.$emit("changeData", this.changeDataObject);
    }
  },
  created() {}
};
</script>

<style lang="scss">
#simple-viewForm {
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
