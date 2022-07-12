<template>
  <div>
    <h1>공지사항</h1>
    <div>공지사항 상세</div>

  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  async asyncData({store, route}){
    const getNoticeParams = {
      id : route.query.id
    }
    await store.dispatch("board/notice/notice/getNotice", getNoticeParams)
    //const notice = store.getters["board/notice/notice/notice"]
  }
}
</script>
