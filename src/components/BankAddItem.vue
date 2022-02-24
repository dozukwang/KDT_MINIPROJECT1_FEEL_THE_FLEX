<template>
  <li 
    :class="[{'isClick':isClick},`bank_${bankItem.code} banklist_item`]"
    @click="isClicked">
    <img
      :src="bankLogo.find(data=>data.code===bankItem?.code)?.src"
      :alt="bankItem?.bankName" />
    <span>{{ bankItem.name }}</span>
  </li>
</template>
<script>
export default {
  props:{
    bankItem:{
      type:Object,
      required:true,
      default:null
    },
    clickCount:{
      type:Number,
      default:0
    }
  },
  emits:['clickCount','clickBankItem'],
  data(){
    return{
      isClick:false,
      bankLogo:[
        {
          src:'/bankIco/bank_081.png',
          code :'081',
          name:'하나은행'
        },
        {
          src:'/bankIco/bank_088.png',
          code :'088',
          name:'신한은행'
        },
        {
          src:'/bankIco/bank_004.png',
          code :'004',
          name:'KB국민은행'
        },
        {
          src:'/bankIco/bank_020.png',
          code :'020',
          name:'우리은행'
        },
        {
          src:'/bankIco/bank_089.png',
          code :'089',
          name:'케이뱅크'
        },
        {
          src:'/bankIco/bank_090.png',
          code :'090',
          name:'카카오뱅크'
        },
        {
          src:'/bankIco/bank_011.png',
          code :'011',
          name:'"NH농협은행"'
        },
      ]
    }
  },
  methods:{
    isClicked(){
      this.isClick=!this.isClick
      if(this.isClick===false){
        this.$emit('clickCount',this.clickCount-1)
      }
      else{
        this.$emit('clickCount',this.clickCount+1)
        this.$emit('clickBankItem',this.bankItem)
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
li{
  width: 47%;
  height: 80px;
  list-style:none;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 4px;
  img{
    width: 50px;
    height: 50px;
  }

  &.isClick{
    background-color:$gray-background-color;
  }
  span{
    display: block;
    text-align: center;
  }
}

</style>
