<template>
  <div class="page-t-click-title-show-text">
    <ClickTitleToggleText :data="data" />
  </div>
</template>

<script>
import ClickTitleToggleText from '../../packages/t-click-title-show-text/t-click-title-show-text'

export default {
  name: 'page-t-click-title-show-text',
  data () {
    return {
      data: {
        title: '点击我显示/隐藏内容',
        text: '我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！我是内容，你好朋友！'
      }
    }
  },
  components: {
    ClickTitleToggleText
  }
}
</script>

<style>
</style>
