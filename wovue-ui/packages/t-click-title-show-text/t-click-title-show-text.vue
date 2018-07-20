<template>
  <div class="t-click-title-show-text">
    <div class="t-click-title-show-text-title" @click="toggleShow"><h5>{{ data.title }}</h5><span :class="`arrow arrow-${ toggle ? 'top' : 'bottom' }`"></span></div>
    <p v-if="toggle" class="t-click-title-show-text-text" v-html="data.text"></p>
  </div>
</template>

<script>
export default {
    name: 'ClickTitleToggleText',
    props: {
      data: Object
    },
    data () {
        return {
          toggle: false
        }
    },
    methods: {
      toggleShow () {
        this.toggle = !this.toggle
      }
    },
    watch: {
      toggle (val) {
        val && setTimeout(() => {
          const newScrollY =  this.$el.offsetTop + this.$el.offsetHeight - window.innerHeight
          if (newScrollY > window.scrollY) {
            window.scrollTo({
              top: newScrollY,
              behavior: 'smooth'
            })
          }
        }, 200)
      } 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.t-click-title-show-text {
  padding: 16px 24px;
  text-align: left;
  border: 1px solid #EBF0F8;
  background-color: #fff;
}
.t-click-title-show-text-title {
  display: flex;
}
.t-click-title-show-text-title h5 {
  margin: 0;
  flex: 1;
}
.t-click-title-show-text-title span {
  flex: 0.2;
  display: block;
}
.t-click-title-show-text-text {
  margin: 0;
  padding: 18px 0 8px;
  color: #78829B;
}
</style>
