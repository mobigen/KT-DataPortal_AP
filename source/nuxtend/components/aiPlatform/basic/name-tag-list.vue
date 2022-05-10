<template lang="html">
  <div id="nameTagList">
    <div class="list-wrap" v-for="(data, i) in nameTagList">
      <div class="list-top">
        <div>
          <basic-single-tag
            v-if="data['category'] !== null"
            :tagName="data['category']"
            previousText=""
          ></basic-single-tag>
          <basic-single-tag
            :tagName="data['dataLocation']"
            previousText=""
          ></basic-single-tag>
          <basic-single-tag
            :tagName="data['dataSource']"
            previousText=""
          ></basic-single-tag>
        </div>

        <div>
          <template v-for="(fdata, fi) in data['fileType']">
            <basic-icon>{{ fdata }}</basic-icon>
          </template>
          <basic-button
            componentId=""
            buttonCss="icon-button"
            :underline="false"
            :hoverColor="false"
            @click="dataSharing(data['id'])"
          >
            <fa icon="share-nodes" />
          </basic-button>
          <basic-button
            componentId=""
            buttonCss="icon-button"
            :underline="false"
            :hoverColor="false"
            @click="dataOfInterest(data['id'])"
            title="관심데이터 추가"
          >
            <fa icon="bookmark" />
          </basic-button>
        </div>
      </div>

      <div class="list-middle" @click="listClick(data['id'])">
        <div class="list-title">{{ data["title"] }}</div>
        <div class="list-body">
          {{ data["body"] }}
        </div>
      </div>

      <div class="list-bottom">
        <div>
          <basic-label>등록일</basic-label>
          <basic-label>{{ data["date"] }}</basic-label>
        </div>
        <basic-icon-label textPreviousIcon="download" textNextIcon="">
          {{ data["download"] }}
        </basic-icon-label>
        <basic-icon-label textPreviousIcon="eye" textNextIcon="">
          {{ data["hit"] }}
        </basic-icon-label>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import BasicSingleTag from "@/components/aiPlatform/basic/basic-single-tag.vue";
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import BasicIconLabel from "@/components/aiPlatform/basic/basic-icon-label.vue";
import BasicIcon from "@/components/aiPlatform/basic/basic-icon.vue";

export default {
  name: "name-tag-list",
  extends: {},
  props: {
    nameTagList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    BasicButton,
    BasicSingleTag,
    BasicLabel,
    BasicIconLabel,
    BasicIcon
  },
  watch: {},
  methods: {
    dataOfInterest(id) {
      this.$emit("dataOfInterest", id);
    },
    dataSharing(id) {
      this.$emit("dataSharing", id);
    },
    listClick(id) {
      this.$emit("listClick", id);
    }
  },
  created() {}
};
</script>

<style lang="scss">
#nameTagList {
  width: 50%;
  padding: 10px;
  border: solid 1px lightgray;
  .list-wrap {
    border-bottom: solid 1px lightgray;
    padding: 10px;
    > div {
      padding-bottom: 10px;
    }
    .list-top {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
      }
    }
    .list-middle {
      cursor: pointer;
      .list-title {
        font-weight: bold;
        font-size: 1.5rem;
      }
      .list-body {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .list-bottom {
      display: flex;
      > div {
        display: flex;
        margin-right: 10px;
        > div {
          padding: 0px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
