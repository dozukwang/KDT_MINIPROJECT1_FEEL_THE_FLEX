<template>
  <slot name="activator"></slot>
  <teleport to="body">
    <template v-if="modelValue">
      <div
        :class="[`popup_Modal ${modalName}`]"
        @click.self="offModal">
        <header>
          <slot name="headerTitle"></slot>
          <button
            class="exit_btn"
            @click="offModal">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <div class="modal_content">
          <slot></slot>
        </div>
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
      default: 'modal'
    },
    clickCount:{
      type:Number,
      default:null
    },
    isNextBtnClick:{
      type:Boolean,
      default:false
    }
  },
  emits:['update:modelValue','clickCount','isNextBtnClick'],
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
      this.$emit('clickCount',0)
      this.$emit('isNextBtnClick',false)
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
.popup_Modal{
  position: fixed;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff; //
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  display: flex;
  flex-direction: column;
  header{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: $main-color;

  }
  .exit_btn{    
    background-color: transparent;
    border: none; 
    cursor: pointer;
  }
  .modal_content{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
}
</style>
