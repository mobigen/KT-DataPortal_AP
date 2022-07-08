<template lang="html">
  <modal
    :width="width"
    :height="height"
    :name="dialogName"
    :adaptive="true"
    :scrollable="true"
    :draggable="true"
    :clickToClose="false"
    @opened="onOpen"
    @closed="scrollHandler(false)"
  >
    <div class="modal">
      <div class="modal__head">
        <div class="modal__head-title">
          <span class="modal__head-title-text">
            {{ title }}
          </span>
        </div>
        <div class="modal__head-close-button">
          <base-button class="button--lg button--icon button--link" @click="onClose">
            <svg-icon name="close-large" class="svg-icon"></svg-icon>
            <span class="hidden">팝업창닫기</span>
          </base-button>
        </div>
      </div>

      <slot name="body" class="modal__body" />

      <slot name="foot">
        <div class="modal__foot">
          <div class="modal__foot-main-buttons">
            <base-button class="button--lg" @click="onClose">
              <span class="button__text"> {{ cancelButtonText }} </span>
            </base-button>
            <base-button class="button--lg button--primary" 
              :disabled="confirmButtonDisabled"
              @click="onConfirm">
              <span class="button__text"> {{ confirmButtonText }} </span>
            </base-button>
          </div>
        </div>
      </slot>
    </div>
  </modal>
</template>

<i18n src="./dialog.json"></i18n>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";

export default {
  name: "Dialog",  
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String
    },
    height: {
      type: String,
      default: "auto"
    },
    width: {
      type: String,
      default: "400"
    },
    dialogName: {
      type: String,
      required: true
    },
    opened: {
      type: Boolean,
      default: false
    },
    cancelButtonText: {
      type: String,
      default: function () {
        return this.$t("dialog.cancel");
      }
    },
    confirmButtonText: {
      type: String,
      default: function () {
        return this.$t("dialog.confirm");
      }
    },
    confirmButtonDisabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.opened) {
      this.$modal.show(this.dialogName);
    }
  },
  methods: {
    onClose() {
      this.scrollHandler(false);
      this.$modal.hide(this.dialogName);
      this.$emit("close", this.dialogName);
    },
    onConfirm() {
      this.scrollHandler(false);
      this.$emit("confirm", this.dialogName);
    },
    onOpen() {
      this.scrollHandler();
      this.$emit("open", this.dialogName);
    },
    scrollHandler(open = true) {
      const className = "not-scroll";
      let $html = document.querySelector("html");
      if ($html) {
        if (open) $html.classList.add(className);
        else $html.classList.remove(className);
      }
      let $body = document.querySelector("body");
      if ($body) {
        if (open) $body.classList.add(className);
        else $body.classList.remove(className);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "dialog.scss";
</style>
