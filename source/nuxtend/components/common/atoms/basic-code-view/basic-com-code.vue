<template lang="html">
  <div>
    <div v-if="type === 'select'">
      <select v-model="selected" @change="onChanged">
        <option
          v-for="(item, i) in codeList"
          :key="'code_'+i"
          :value="item.code_id"
        >{{ item.code_nm }}</option>
      </select>
    </div>
    <div v-if="type === 'checkbox'">
      <span
        v-for="(item, i) in codeList"
        :key="'code_'+i"
      >
        <input
          type="checkbox"
          :value="item.code_id"
          v-model="selectedList"
          @change="onChanged"
        /> {{ item.code_nm }}
      </span>
    </div>
    <div v-if="type === 'radio'">
      <span
        v-for="(item, i) in codeList"
        :key="'code_'+i"
      >
        <input
          type="radio"
          :value="item.code_id"
          v-model="selected"
          @change="onChanged"
        /> {{ item.code_nm }}
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
        let res = await this.$axios.get(`/route/api/sitemng/getCodeInfo?groupId=${this.$props.codeId}`)
        this.codeList = res
      }
      // 첫번째 값으로 세팅
      if(this.codeList) {
        if(this.$props.type === "checkbox") this.selectedList[0] = this.codeList[0].code_id
        else this.selected = this.codeList[0].code_id
        this.onChanged()
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
