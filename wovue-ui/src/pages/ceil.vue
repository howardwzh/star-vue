<template>
  <div class="page-ceil">
    <ceil title="I am ceil" label="I am label" value="hello ceil" arrow>
      <img slot="icon" src="../assets/logo.png" alt="" />
    </ceil>
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
