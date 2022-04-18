<template lang="html">
  <div id="simple-table">
    <table>
      <thead>
        <tr>
          <th v-if="seriorNumUse">{{ seriorNumText }}</th>
          <th v-for="(h, hi) in headerList" :key="'header_' + hi">
            {{ h["column_name"] }}
          </th>
          <template v-if="tableButtonUse">
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
          @click="rowClick(data[rowKey])"
        >
          <td v-if="seriorNumUse">{{ i + 1 }}</td>

          <td v-for="(h, hi) in headerList" :key="'header_' + hi">
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
                @click="keyClick(data[rowKey], keyActionText[h['column_name']])"
                >{{ data[h["column_name"]] }}</basic-button
              >
            </template>
            <template v-else>{{ data[h["column_name"]] }}</template>
          </td>
          <template v-for="(value, key, index) in tableButtonText">
            <td @click.stop v-if="tableButtonUse" :key="'header_button_' + key">
              <basic-button
                @click="buttonClick(data[rowKey], key)"
                :buttonCss="tableButtonText[key]['buttonCss']"
              >
                <template v-if="tableButtonText[key]['buttonType'] === 'icon'">
                  {{ data[rowKey] }}
                  <!-- <icon data="@icon/minus.svg" aria-hidden="true"></icon>-->
                  <!-- svg icon not working with nuxt-->
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
    seriorNumUse: {
      type: Boolean,
      require: false,
      default: false
    },
    seriorNumText: {
      type: String,
      require: false,
      default: ""
    },
    tableButtonUse: {
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
    },
    keyClick(rowKey, keyAction) {
      this.$emit("keyAction", rowKey, keyAction);
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
      position: sticky;
      top: 0px;
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
