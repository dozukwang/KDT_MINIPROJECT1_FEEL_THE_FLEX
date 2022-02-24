
<template>
  <div

    v-show="loading"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${width}px`,
      borderColor: color
    }"

    :class="{ absolute: absolute, fixed: fixed }"

    class="loader"></div>
</template>

<script>
export default {
  props: {
    loading:{
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 30
    },
    color:{
      type: String,
      default: '#ff9900'
    },
    width:{
      type: Number,
      default: 4
    },
     absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.loader{
  border-style: dashed;
  border-radius: 50%;
  border-top-color: rgba(black,  .1) !important;
  box-sizing: border-box;
  animation: spin 1.2s ease-in-out infinite;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.absolute {
  position: absolute;
}
.fixed {
  position: fixed;
}
@keyframes spin  {

  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
