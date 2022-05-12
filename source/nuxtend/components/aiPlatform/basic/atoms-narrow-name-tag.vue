<template lang="html">
  <div id="atomsNarrowNameTag">
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
  name: "atoms-narrow-name-tag",
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
#atomsNarrowNameTag {
  width: 350px;
  height: 400px;
  border: solid 1px lightgray;
  border-radius: 10px;
  padding: 20px;
  .left-side-wrap {
    .left-side {
    }
  }
  .right-side-wrap {
    .right-side {
    }
  }
  .content-wrap {
    height: 100%;
    .header {
      height: 40%;
      display: flex;
      > div {
        width: 50%;
        padding: 15px;
        position: relative;
        .img {
          width: 100%;
          height: 100%;
          border: 3px solid lightgray;
          border-radius: 50%;
        }
        .label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
        }
      }
    }
    .body-top {
      display: flex;
      justify-content: space-between;
      margin: 20px 0px;
      > div {
        display: flex;
      }
    }

    .body-middle {
      height: 20%;
      padding: 20px 0px;
      .title {
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
        cursor: pointer;
        padding: 10px 0px;
      }
    }

    .footer {
      height: 25%;
      > div {
        > div:first-child {
          padding: 0px;
        }
        margin: 10px 0px;
        display: flex;
      }
    }
  }
}
</style>
