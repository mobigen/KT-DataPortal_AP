<template>
  <div>
    <tile-view :data="data"></tile-view>
  </div>
</template>

<script>
import TileView from "@component/common/tile/tileView";
import data from '@/pages/portal/ui/board/sample/data.json'
export default {
  name: "mapSearch",
  components: {TileView},
  data() {return {data}},
}
</script>

<style scoped>

</style>
