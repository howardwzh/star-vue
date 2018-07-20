<template>
  <div class="page-ceil">
    <ceil title="标题文字"></ceil>
    <ceil title="标题文字" value="说明文字"></ceil>
    <ceil title="标题文字" value="带 icon"></ceil>
    <ceil title="标题文字">
      <span>icon 是图片</span>
      <img slot="icon" src="../assets/logo.png" alt="" />
    </ceil>
    <ceil title="标题文字" arrow value="带链接"></ceil>
    <ceil title="标题文字" arrow>
      <span style="color: green">这里是元素</span>
    </ceil>
    <ceil title="标题文字">
      <button size="small" type="primary">按钮</button>
    </ceil>

    <ceil title="标题" label="描述信息" arrow></ceil>

    <ceil title="原生跳转" label="跳转到 https://mint-ui.github.io" arrow to="https://mint-ui.github.io"></ceil>
    <ceil title="路由跳转" label="跳转到 /#/toast" arrow :to="{ name: 'Toast' }"></ceil>
  </div>
</template>

<script>
import Ceil from '../../packages/ceil/ceil'

export default {
  name: 'page-ceil',
  data () {
    return {
      data: {
      }
    }
  },
  components: {
    Ceil
  }
}
</script>

<style>
</style>
