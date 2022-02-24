<template>
  <slot name="activator"></slot>
  <teleport to="body">
    <template v-if="modelValue">
      <div
        :class="[`${modalName}`]"
        @click.self="offModal">
        <button
          class="exit_btn"
          @click="offModal">
          <i class="fas fa-times"></i>
        </button>
        <slot></slot>
      </div> 
    </template>  
  </teleport>
</template>

<script>
export default {
  props:{
    modelValue:{
      type:Boolean,
      default:false
    },
    modalName:{
      type:String,
      default: 'modal'   }
  },
  emits:['update:modelValue'],
  watch:{
    modelValue(newValue){
      if(newValue===true){
        window.addEventListener('keyup',this.escHandler)
      }
      else{
        window.removeEventListener('keyup',this.escHandler)
      }

    }
  },
  methods:{
    offModal(){
      this.$emit('update:modelValue',false)
    },
    escHandler(event){
      if(event.key==='Escape')
          {
            this.offModal()
          }
      
    }
  }
  
}
</script>
<style lang="scss" scoped>
.menu{
  position: fixed;
  z-index: 10;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .exit_btn{
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    i{
      &:hover{
        color: $main-color-hover;
      }
    }
  }
}
</style>
