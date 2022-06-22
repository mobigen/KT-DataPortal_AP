<template lang="html">
  <div>
    <div v-if="type === 'select'">
      <select v-model="selected" @change="onChanged">
        <option
          v-for="(item, i) in codeList"
          :key="'code_'+i"
          :value="item.codeId"
        >{{ item.codeNm }}</option>
      </select>
    </div>
    <div v-if="type === 'checkbox'">
      <span
        v-for="(item, i) in codeList"
        :key="'code_'+i"
      >
        <input
          type="checkbox"
          :value="item.codeId"
          v-model="selectedList"
          @change="onChanged"
        /> {{ item.codeNm }}
      </span>
    </div>
    <div v-if="type === 'radio'">
      <span
        v-for="(item, i) in codeList"
        :key="'code_'+i"
      >
        <input
          type="radio"
          :value="item.codeId"
          v-model="selected"
          @change="onChanged"
        /> {{ item.codeNm }}
      </span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-com-code",
  props: {
    type: {
      type: String,
      defaults: "select"
    },
    codeId: {
      type: String,
      require: false
    },
    dataList: {
      type: Array,
      require: false
    }
  },
  data() {
    return {
      codeList: [],
      selected: '',
      selectedList: []
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    async getCodeList() {
      if(this.$props.dataList) {
        this.codeList = this.$props.dataList
      } else {
        // 공통 코드 조회 API 개발 완료 후 수정 예정
        let res = await this.$axios.get(`${this.$config.API_BOARD_PREFIX}/test/comCode/list`)
        this.codeList = res;
      }

      // 첫번째 값으로 세팅
      if(this.codeList.length > 0) {
        if(this.$props.type === "checkbox") this.selectedList[0] = this.codeList[0].codeId
        else this.selected = this.codeList[0].codeId
      }
    },
    onChanged() {
      if(this.$props.type === "checkbox") {
        this.$emit("onChanged", this.selectedList)
      } else {
        this.$emit("onChanged", this.selected)
      }
    }
  },
  beforeMount() {
    this.getCodeList()
  }
}
</script>

<style lang="scss">

</style>
