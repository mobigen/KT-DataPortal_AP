<template lang="html">
  <div id="basicTagList">
    <template v-for="data in tagList">
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
    tagType: {
      type: String,
      require: false,
      default: "checkbox"
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
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    cancel(componentId) {
      let itemId = componentId.split("_").pop();
      // TODO: 추후에, itemId가 UUID로 변경된 이후에 Number로 처리할 필요가 없어지면 이 코드를 지워준다.
      if (!isNaN(itemId)) {
        itemId = Number(itemId);
      }

      this.$emit("tagCancel", {
        key: this.tagKey,
        itemId: itemId,
        type: this.tagType
      });
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
    padding: 0 10px;
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
