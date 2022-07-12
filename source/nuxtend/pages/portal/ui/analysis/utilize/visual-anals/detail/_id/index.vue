<template>
  <div>
    <h1>데이터 시각분석</h1>
    <br>

    <span>{{ getCategoryName(post.ctgry) }}</span>
    <h2>{{ post.title }}</h2>
    <br>

    {{ post.retvCnt }} / {{ maskedId }} / {{ post.regDate }}

    <div>
      <span
        v-for="(item, i) in keywrdList"
        :key="'keywrd_'+i"
      >
        <base-tag>
          <slot>{{ getKeyword(item) }}</slot>
        </base-tag>
      </span>
    </div>
    <br>
    <hr>

    {{ post.contsDesc }}
    <br>
    <hr>

    <iframe
      v-if="post.url"
      :src="post.url"
      width="100%"
      height="600"
    >
    </iframe>
    <br>
    <hr>

    <p>활용데이터</p>
    <hr>
    <div>
      <ul>
        <li
          v-for="(item, i) in dataSetList"
          :key="'ds_'+i"
        >
          {{ item.data_nm }} | {{ item.data_desc }}
          <hr v-if="i < (dataSetList.length - 1)">
        </li>
      </ul>
    </div>

    <basic-button @click="goList">
      <slot>
        <span>목록</span>
      </slot>
    </basic-button>
  </div>
</template>

<script>
import BasicButton from "@common/atoms/basic-button"
import BaseTag from "@component/common/atoms/base-tag/base-tag"

export default {
  name: "analysis-visual-anals-detail",
  components: { BasicButton, BaseTag },
  data() {
    return {
      contsId: this.$route.params.id,
      post: {
        regUser: ""
      },
      keywrdList: [],
      ctgryList: [],
      dataSetList: []
    }
  },
  computed: {
    query() {
      return { keyword: this.$route.query.keyword, page: this.$route.query.page, tab: this.$route.query.tab }
    },
    maskedId() {
      let id = this.post.regUser
      let masked = ""
      if(id && id.length > 4) {
        masked = id.substring(0, 4) + id.substring(4).replace(/[0-9a-zA-Z]/g, "*")
      } else {
        masked = id.substring(0, (id.length - 1)) + "*"
      }
      return masked
    }
  },
  methods: {
    async getDetail() {
      // let res = await this.$axios.get(`${this.$config.API_ANALYSIS_PREFIX}/visualAnals/detail?contsId=${this.contsId}`)
      let res = await this.$axios.get(`${this.$config.ROUTE_API_ANALYSIS_PREFIX}/visualAnals/detail?contsId=${this.contsId}`)
      this.post = res
      this.keywrdList = this.post.keywrd.split(",")
      await this.getDataSetList()
    },
    goList() {
      this.$router.push({ path: '/portal/ui/analysis/utilize/visual-anals', query: this.query })
    },
    getKeyword(str) {
      return "#" + str.trim()
    },
    async getCategoryList() {
      const res = await this.$axios.get(`/route/api/sitemng/getCodeInfo?groupId=VISUAL_ANALS_CTGRY`)
      this.ctgryList = res
    },
    getCategoryName(codeId) {
      let ctgry = this.ctgryList.find((obj) => obj.code_id === codeId)
      return ctgry ? ctgry.code_nm : ""
    },
    async getDataSetList() {
      let datasetIdList = "";
      if(this.post.dataSetList.length === 0) {
        return
      }
      this.post.dataSetList.forEach((obj, i) => {
        datasetIdList += obj.dataSetId
        console.log(i)
        if(i < (this.post.dataSetList.length - 1)) {
          datasetIdList += ","
        }
      })
      const res = await this.$axios.get(`${this.$config.ROUTE_API_META_PREFIX}/getBizMetaListByIds?datasetIdList=${datasetIdList}`)
      this.dataSetList = res.list
    }
  },
  beforeMount() {
    this.getCategoryList()
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<style scoped>

</style>
