<template lang="html">
  <div id="basicAccordionTable">
    <table>
      <thead v-if="headerList">
        <tr>
          <th v-for="data in headerList">{{ data["column_name"] }}</th>
        </tr>
      </thead>
      <template v-for="data in dataList">
        <tbody :class="{ isActive: activeObj[data[rowKey]] }">
          <tr v-if="headerList.length > 0" class="view">
            <td @click="unFold(data[rowKey])" v-for="h in headerList">
              {{ data[h["column_name"]] }}
            </td>
          </tr>
          <tr v-else class="view">
            <td
              @click="useButtonEvent ? false : unFold(data[rowKey])"
              class="accordion-title"
            >
              <span>{{ data["title"] }}</span>
              <div>
                <basic-button
                  v-if="useButtonEvent"
                  @click="unFold(data[rowKey])"
                >
                  <slot name="buttonEventText">
                    <span>미리보기</span>
                    <fa icon="angle-down" class="down-icon"></fa>
                  </slot>
                </basic-button>
                <div @click.stop>
                  <slot
                    name="titleItem"
                    :rowKey="data[rowKey]"
                    :unFold="unFold"
                  ></slot>
                </div>
                <fa
                  v-if="!useButtonEvent"
                  icon="angle-down"
                  class="down-icon"
                ></fa>
              </div>
            </td>
          </tr>
          <tr class="fold">
            <td :colspan="Object.keys(data).length">
              <slot name="detail" :detail="data.detail">{{ data.detail }}</slot>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "basic-accordion-table",
  extends: {},
  props: {
    componentId: {
      type: String,
      require: false
    },
    rowKey: {
      type: String,
      require: true
    },
    headerList: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    dataList: {
      type: Array,
      require: false
    },
    useButtonEvent: {
      type: Boolean,
      require: false
    },
    multipleActive: {
      type: Boolean,
      require: false
    }
  },
  data() {
    return {
      activeObj: {}
    };
  },
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    unFold(rowKey) {
      if (this.multipleActive) {
        this.activeObj[rowKey] = this.activeObj[rowKey] ? false : true;
      } else {
        const activeKey = Object.keys(this.activeObj).find(
          (key) => this.activeObj[key] === true
        );

        if (activeKey === undefined) {
          this.activeObj[rowKey] = true;
        } else {
          this.activeObj[activeKey] = false;
          if (activeKey !== String(rowKey)) {
            this.activeObj[rowKey] = true;
          }
        }
      }
    }
  },
  created() {
    this.dataList.forEach((el) => {
      this.$set(this.activeObj, el.id, false);
    });
  }
};
</script>

<style lang="scss">
#basicAccordionTable {
  table {
    width: 100%;
    tr {
      th,
      td {
        border: solid lightgray 1px;
      }
    }
    thead {
      background-color: lightgray;
    }
    tbody {
      tr.view {
        .accordion-title {
          display: flex;
          justify-content: space-between;
          > div {
            display: flex;
          }
        }
      }
      tr.fold {
        display: none;
      }
      &.isActive {
        > tr.view {
          background-color: #f3c9c9;
          .down-icon {
            transform: rotate(180deg);
          }
        }
        > tr.fold {
          display: table-row;
        }
      }
    }
    table {
      padding: 20px;
      height: 200px;
    }
  }
}
</style>
