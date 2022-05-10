<template lang="html">
  <div id="basicTagList">
    <template v-for="(data, i) in tagData">
      <div :class="['tag-item', { cursorPointer }]" @click="tagClick(data)">
        <span v-if="previousText" class="prev-text">{{ previousText }}</span>
        <span>{{ data["itemName"] }}</span>
        <div @click.stop v-if="useCancelButton">
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
  name: "basic-tag-list",
  extends: {},
  data() {
    return {};
  },
  props: {
    tagKey: {
      type: String,
      require: false
    },
    tagList: {
      type: Array,
      require: true
    },
    previousText: {
      type: String,
      require: false
    },
    useCancelButton: {
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
  computed: {
    tagData: {
      get() {
        return this.tagList;
      }
    }
  },
  components: { BasicButton },
  watch: {},
  methods: {
    cancel(componentId) {
      const itemId = Number(componentId.split("_").splice(-1));
      const index = this.tagData.findIndex((el) => el.itemId === itemId);
      this.tagData.splice(index, 1);

      this.$emit("tagCancel", this.tagData, this.tagKey);
    },
    tagClick(tagObj) {
      this.$emit("tagClick", tagObj);
    }
  }
};
</script>

<style lang="scss">
#basicTagList {
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
