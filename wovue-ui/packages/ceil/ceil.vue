<template>
  <div class="wo-ceil" :class="{'hover-able': to}" @click="clickHandle">
    <slot name="icon">
    </slot>
    <div class="wo-ceil-left">
      <slot name="title">
        <span class="wo-ceil-title" v-text="title"></span>
      </slot>
      <slot name="label">
        <span class="wo-ceil-label" v-if="label" v-text="label"></span>
      </slot>
    </div>
    <div class="wo-ceil-right" :class="{'has-arrow': arrow}">
      <slot>
        <span class="wo-ceil-value" v-text="value"></span>
      </slot>
      <slot name="tip">
        <span class="wo-ceil-tip" v-if="tip" v-text="tip"></span>
      </slot>
    </div>
    <i class="wo-ceil-arrow" v-if="arrow"></i>
  </div>
</template>

<script>
export default {
  name: 'Ceil',
  props: {
    title: String,
    label: String,
    value: String,
    tip: String,
    arrow: Boolean,
    to: String
  },
  methods: {
    clickHandle () {
      if (this.to) {
        window.location.href = this.to
      }
    }
  }
}
</script>

<style lang="css">
.wo-ceil {
  position: relative;
  display: flex;
  min-height: 48px;
  box-sizing: border-box;
  padding: 0 16px;
  align-items: center;
  color: inherit;
  font-size: 16px;
}
.wo-ceil::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  transform: scaleY(0.5);
}
.wo-ceil:last-child::after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  transform: scaleY(0.5);
}
.wo-ceil.hover-able {
  cursor: pointer;
}
.wo-ceil img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.wo-ceil-left {
  flex: 1;
  text-align: left;
}
.wo-ceil-title {
  vertical-align: middle;
}
.wo-ceil-label {
  font-size: 12px;
  color: #999;
  display: block;
}
.wo-ceil-right {
  flex: 1;
  text-align: right;
}
.wo-ceil-right.has-arrow {
  margin-right: 16px;
}
.wo-ceil-value {
  vertical-align: middle;
}
.wo-ceil-tip {
  font-size: 12px;
  color: #999;
  display: block;
}
.wo-ceil-arrow::after{
  content: ' ';
  position: absolute;
  top: 50%;
  right: 16px;
  width: 5px;
  height: 5px;
  border: solid 2px #ddd;
  border-bottom: none;
  border-left: none;
  transform: translateY(-50%) rotate(45deg);
}
</style>
