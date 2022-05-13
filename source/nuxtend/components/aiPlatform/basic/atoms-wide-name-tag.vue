<template lang="html">
  <div id="atomsWideNameTag">
    <div class="left-side-wrap">
      <slot name="left-side"></slot>
    </div>
    <div class="content-wrap">
      <slot name="header"></slot>
      <slot name="body-top"></slot>
      <slot name="body-middle"></slot>
      <slot name="body-bottom"></slot>
      <slot name="footer"></slot>
    </div>
    <div class="right-side-wrap">
      <slot name="right-side"></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "atoms-wide-name-tag",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#atomsWideNameTag {
  display: flex;
  width: 50%;
  padding: 10px;
  border: solid 1px lightgray;
  .left-side-wrap {
    margin-right: 10px;
    .left-side {
      height: 100%;
      .img {
        width: 150px;
        height: 100%;
        border: 3px solid lightgray;
        border-radius: 50%;
      }
    }
  }
  .right-side-wrap {
    .left-side {
      width: 150px;
    }
  }
  .content-wrap {
    flex: 1;
    .body-top {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
      }
    }
    .body-middle {
      padding-top: 10px;
      .title {
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    .body-bottom {
      .body {
        cursor: pointer;
      }
    }

    .footer {
      display: flex;
      padding: 10px 0px;
      > div {
        display: flex;
        margin-right: 10px;
        > div:first-child {
          padding: 0px;
        }
      }
    }
  }
}
</style>
