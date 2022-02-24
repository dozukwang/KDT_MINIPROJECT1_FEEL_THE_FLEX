<template>
  <div class="account_list_item">
    <!-- 이미지 -->
    <div class="bank_title">
      <img
        :src="bankLogo.find(data=>data.code===userBank?.bankCode)?.src"
        :alt="userBank?.bankName" />
      <!-- 은행명 -->
      <span>{{ userBank?.bankName }}</span>
    </div>
    <!-- 계좌 번호 -->
    <div class="summary">
      <span>{{ userBank?.accountNumber }}</span>
      <!-- 계좌 금액 -->
      <span>{{ userBank?.balance/1000+"억" }}</span>
    </div>
    <!-- 삭제 -->
    <button
      class="btn btn-outline-secondary"
      @click="delUserBank">
      삭제
    </button>
  </div>
</template>
<script>
import {getBankList,getUserBankList,delUserBank} from '~/utils/bankApi'
export default {
  props:{
    userBank:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
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
    // 계좌 해지
    delUserBank(){
      // 사용자로부터 계좌 해지 재확인
      if(confirm(`${this.userBank?.bankName} 계좌를 삭제하시겠습니까?`)){
        const value={
          accountId:this.userBank.id,
          signature:true
        }
        // 서버에서 계좌 해지
        delUserBank(value).then(()=>{
          // 사용자 계좌 목록 업데이트
          getUserBankList().then((data)=>{
            this.$store.commit('bank/assignState',{
            userTotalBalance :data.totalBalance,
            userAccountList:data.accounts
            })
          })
          // 선택 가능한 계좌 목록 업데이트
          getBankList()
            .then((data)=>{
              this.$store.commit('bank/assignState',{allBankList:data})
            }) 
        }).catch(err=>alert(err.response.data))
      }
    }
  }
  
}
</script>
<style lang="scss" scoped>
.account_list_item{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  .bank_title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 130px;
    text-align: center;
    margin-left: 10px;
    img{
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .summary{
    min-width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: start;
    margin: 0 auto;
    // flex-grow: .4;
     span{
       &:last-child{
         min-width: 70px;
       }
     }
  }
  span{
    color: $gray-text-color;
  }

    button{
      font-size: 11px;
    }

}
</style>
