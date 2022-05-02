<template lang="html">
  <div id="searchTag">
    <template v-for="(data, i) in tagList">
      <div :class="['tag-item', { cursorPointer }]" @click="tagClick(data)">
        <span class="prev-text">{{ previousText }}</span>
        <span>{{ data["itemName"] }}</span>
        <div @click.stop v-if="cancelButtonUse">
          <basic-button
            :componentId="'tag_' + data['itemId']"
            buttonCss="icon-button"
            :underline="false"
            :hoverColor="false"
            @click="cancel"
            ><span>x</span>
            <!-- <icon data="@icon/minus.svg" aria-hidden="true"></icon>-->
            <!-- svg icon not working with nuxt-->
          </basic-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "search-tag",
  extends: {},
  data() {
    return {};
  },
  props: {
    tagList: {
      type: Array,
      require: true
    },
    previousText: {
      type: String,
      require: false
    },
    cancelButtonUse: {
      type: Boolean,
      require: false,
      default: false
    },
    cursorPointer: {
      type: Boolean,
      require: false,
      default: true
    }
  },
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    cancel(componentId) {
      const itemId = Number(componentId.split("_").splice(-1));
      const index = this.tagList.findIndex((el) => el.itemId === itemId);
      this.tagList.splice(index, 1);
    },
    tagClick(tagObj) {
      this.$emit("tagClick", tagObj);
    }
  }
};
</script>

<style lang="scss">
#searchTag {
  display: flex;
  flex-wrap: wrap;
  .tag-item {
    display: flex;
    height: 30px;
    background-color: lightgray;
    border-radius: 20px;
    padding: 0px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    .prev-text {
      padding: 4px 10px;
      margin-right: -15px;
    }
    span {
      padding: 4px 10px;
    }
  }
  .cursorPointer {
    cursor: pointer;
  }
}
</style>
