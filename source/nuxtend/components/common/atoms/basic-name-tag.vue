<template lang="html">
  <div id="basicNameTag">
    <component
      :is="width === 'wide' ? 'atoms-wide-name-tag' : 'atoms-narrow-name-tag'"
    >
      <template v-slot:header>
        <slot name="header">
          <div class="header">
            <div><div class="img"></div></div>
            <div>
              <div class="label">{{ nameTagObject.dataSource }}</div>
            </div>
          </div>
        </slot>
      </template>

      <template v-slot:body-top>
        <slot name="body-top">
          <div class="body-top">
            <div>
              <basic-single-tag
                v-if="nameTagObject.category !== null"
                :tagName="nameTagObject.category"
                previousText=""
              ></basic-single-tag>
              <basic-single-tag
                :tagName="nameTagObject.dataLocation"
                previousText=""
              ></basic-single-tag>
              <basic-single-tag
                :tagName="nameTagObject.dataSource"
                previousText=""
              ></basic-single-tag>
            </div>

            <div>
              <template v-for="(fdata, fi) in nameTagObject.fileType">
                <basic-icon :key="'file_type_' + fi">{{ fdata }}</basic-icon>
              </template>
              <basic-button
                componentId=""
                buttonCss="icon-button"
                :underline="false"
                :hoverColor="false"
                @click="dataSharing(nameTagObject.id)"
              >
                <fa icon="share-nodes" />
              </basic-button>
              <basic-button
                componentId=""
                buttonCss="icon-button"
                :underline="false"
                :hoverColor="false"
                @click="dataOfInterest(nameTagObject.id)"
                title="관심데이터 추가"
              >
                <fa icon="bookmark" />
              </basic-button>
            </div>
          </div>
        </slot>
      </template>

      <template v-slot:body-middle>
        <slot name="body-middle">
          <div class="body-middle">
            <span @click="nameTagClick(nameTagObject.id)" class="title">
              {{ nameTagObject.title }}
            </span>
          </div>
        </slot>
      </template>

      <template v-slot:body-bottom>
        <slot name="body-bottom">
          <div class="body-bottom">
            <span @click="nameTagClick(nameTagObject.id)" class="body">
              {{ nameTagObject.body }}
            </span>
          </div>
        </slot>
      </template>

      <template v-slot:footer>
        <slot name="footer">
          <div class="footer">
            <div v-if="nameTagObject.updateDate">
              <basic-label>수정일</basic-label>
              <basic-label>{{ nameTagObject.updateDate }}</basic-label>
            </div>
            <div>
              <basic-label>등록일</basic-label>
              <basic-label>{{ nameTagObject.date }}</basic-label>
            </div>
            <div>
              <basic-icon-label textPreviousIcon="download" textNextIcon="">
                {{ nameTagObject.download }}
              </basic-icon-label>
              <basic-icon-label textPreviousIcon="eye" textNextIcon="">
                {{ nameTagObject.hit }}
              </basic-icon-label>
            </div>
          </div>
        </slot>
      </template>

      <template v-slot:left-side>
        <slot name="left-side">
          <div class="left-side">
            <div>{{ nameTagObject.dataSource }}</div>
            <div class="img"></div>
          </div>
        </slot>
      </template>

      <template v-slot:right-side>
        <slot name="right-side"> </slot>
      </template>
    </component>
  </div>
</template>

<script type="text/javascript">
import AtomsWideNameTag from "@common/atoms/atoms-wide-name-tag.vue";
import AtomsNarrowNameTag from "@common/atoms/atoms-narrow-name-tag.vue";
import BasicButton from "@common/atoms/basic-button.vue";
import BasicIcon from "@common/atoms/basic-icon.vue";
import BasicSingleTag from "@common/atoms/basic-single-tag.vue";
import BasicLabel from "@common/atoms/basic-label.vue";
import BasicIconLabel from "@common/atoms/basic-icon-label.vue";

export default {
  name: "basic-name-tag",
  extends: {},
  props: {
    width: {
      type: String,
      require: false,
      default: "wide"
    },
    nameTagObject: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    AtomsWideNameTag,
    AtomsNarrowNameTag,
    BasicButton,
    BasicIcon,
    BasicSingleTag,
    BasicLabel,
    BasicIconLabel
  },
  watch: {},
  methods: {
    nameTagClick(id) {
      this.$emit("nameTagClick", id);
    },
    dataSharing(id) {
      this.$emit("dataSharing", id);
    },
    dataOfInterest(id) {
      this.$emit("dataOfInterest", id);
    }
  },
  created() {}
};
</script>

<style lang="scss"></style>
