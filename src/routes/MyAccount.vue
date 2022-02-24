<template>
  <div class="account_page">
    <!-- 페이지 헤더 -->
    <div class="header container">
      <h1>결제 계좌 관리</h1>
    </div>
    <div class="devider"></div>
    <!-- 페이지 body -->
    <div class="container">
      <!-- 추가 버튼 -->
      <BankAdd v-if="userBankList?.length!==7" />
      <!-- 연결된 계좌 목록  -->
      <div class="account_list">
        <div class="account_list_title">
          <p>은행/계좌번호/잔액</p>
          <p>관리</p>
        </div>
        <div class="account_list_items">
          <template
            v-for="userBank in userBankList"
            :key="userBank.id">
            <UserAccountItem :user-bank="userBank" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserAccountItem from '~/components/UserAccountItem'
import BankAdd from '~/components/BankAdd.vue'
import {getUserBankList} from '../utils/bankApi'
export default {
  components:{
    BankAdd,
    UserAccountItem
  },
  computed:{
    userBankList(){
      return this.$store.state.bank.userAccountList
    }
  },
  created(){
    getUserBankList().then((data)=>{
      this.$store.commit('bank/assignState',{
       userTotalBalance :data.totalBalance,
       userAccountList:data.accounts
      })
    })
  }
  
}
</script>
<style lang="scss" scoped>
// 계좌 관리 페이지 전체
.account_page{
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  // 페이지 전체 가로 너비 잡는 요소
  .container{
    width: 70%;
    min-width: 520px;
    max-width: 700px;
    margin: 0 auto;
    // 페이지 헤더
    &.header{
      display: flex;
      align-items: center;
      padding: 10px 10px 0;
      height: 60px;  
    }
    h1{
      font-size: 1.5rem;
      margin: 0;
    }
    .account_list{
      width: 100%;
      padding: 5px 0 10px;
      // 계좌 목록 타이틀
      .account_list_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .9rem;
        background-color: #f6f9fa;
        padding: 10px;
        text-align: center;
        p{
          margin: 0;
          width: calc(100% - 50px);
          &:last-child{
             width: 50px;
          }}   
      }
      .account_list_items{
          display: flex;
          flex-direction: column;
          align-content: space-between;
          justify-content: center;
          padding: 0 10px 0;
        }
    }
    
  } 
}
//devider
.devider{
  width: 100%;
  border-bottom: 1px solid rgb(230, 230, 230);
;  // 수정 색상 태그
  margin : 10px 0;
}
</style>
