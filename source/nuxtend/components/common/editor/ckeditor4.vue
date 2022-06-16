<template>
  <div>
    <client-only>
      <ckeditor
        :value="value"
        :config="config"
        @input="(event) => $emit('input', event)"
      ></ckeditor>
    </client-only>
  </div>
</template>

<script>
let ckeditor
if (process.client) {
  ckeditor = require('ckeditor4-vue').component
  console.log(ckeditor)
}

export default {
  name: "ckeditor4",
  components:{
    ckeditor
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      editorData: '<p>Content of the editor.</p>',
      config: {
        language: 'ko',
        extraPlugins: 'uploadfile,embed,autoembed',
        // extraPlugins: 'embed,autoembed',
        height: 500,
        removeButtons: 'PasteFromWord',

        // The configuration of the editor.
        filebrowserImageUploadUrl: `${this.$config.API_BOARD_PREFIX}/sftp?serviceType=CKEDITOR`,
        filebrowserUploadUrl: `${this.$config.API_BOARD_PREFIX}/sftp?serviceType=CKEDITOR`,

        embed_provider:
          '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
      },
    }
  },
}
</script>

<style scoped>

</style>
