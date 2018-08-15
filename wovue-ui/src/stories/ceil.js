import { storiesOf } from '@storybook/vue'
import Ceil from '../../packages/ceil/ceil.vue'

const icon = require('../assets/logo.png')

storiesOf('Ceil', module)
  .add('标题', () => ({
    components: {Ceil},
    template: '<ceil title="标题"></ceil>'
  }))
  .add('标题 + 文字', () => ({
    components: {Ceil},
    template: '<ceil title="标题" value="文字"></ceil>'
  }))
  .add('标题 + 文字 + icon', () => ({
    components: {Ceil},
    template: '<ceil title="标题" value="文字"><img slot="icon" src="' + icon + '" alt="" /></ceil>'
  }))
  .add('标题 + 文字 + 箭头 + 点击跳转', () => ({
    components: {Ceil},
    template: '<ceil title="标题" value="文字" arrow to="https://cn.vuejs.org/"></ceil>'
  }))
  .add('标题 + 按钮', () => ({
    components: {Ceil},
    template: '<ceil title="标题"><button size="small" type="primary" @click="clickHandle()">按钮</button></ceil>',
    methods: {
      clickHandle () {
        alert('你点击了按钮！')
      }
    }
  }))
  .add('标题 + 标题描述', () => ({
    components: {Ceil},
    template: '<ceil title="标题" label="描述信息"></ceil>'
  }))
  .add('标题 + 标题描述 + 文字 + 文字描述', () => ({
    components: {Ceil},
    template: '<ceil title="标题" label="描述信息" value="文字" tip="文字描述"></ceil>'
  }))
