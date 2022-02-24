<template>
  <SignInOutTemplate>
    <template #pageName>
      <h1>이메일로 가입하기</h1>
    </template>
    <template #default>
      <span>이름</span>
      <input
        v-model="userNickname"
        type="text" />
      <span>이메일 주소</span>
      <input
        v-model="userEmail"
        type="text" />
      <span>비밀번호</span>
      <span
        v-show="!isVaildPw()"
        class="pw_check_msg">8자리 이상 입력해주세요</span>
      <input
        v-model="userPw"
        placeholder="8자 이상 필수"
        type="password"
        @blur="isVaildPw" />  
    </template>
    <template #submitBtn>
      <button @click="userSignUp">
        가입하기
      </button>
    </template>

    <template #isSignInUp>
      <span>이미 FLEX한 회원이신가요?</span>
      <div class="roter_link">
        <RouterLink to="/login">
          기존 계정으로 로그인하기 
        </RouterLink>
      </div>
    </template>
  </SignInOutTemplate>
</template>

<!-- 만약 회원가입성공이라면 보일 화면 -->
<script>
import {signUp} from '~/utils/authApi'
import SignInOutTemplate from '~/components/SignInOutTemplate'

export default {
  components:{
    SignInOutTemplate
  },
  data(){
    return{
      userEmail: '',
      userPw: '',
      userNickname: '',
      signed:false,
    }
  },
  methods: {
    // 회원가입
    userSignUp() {
      const data={displayName:this.userNickname,email:this.userEmail,password: this.userPw,}
      // 서버에 회원가입 요청
      signUp(data).then(()=>{
        this.signed=true
        this.$router.push('/')
      }).catch(err=>alert(err.response.data))
    },
    isVaildPw(){
      return this.userPw?.length>7
    }
  }
}
</script>
<style lang="scss" scoped>
h1{
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  margin: 0 0 32px;
}
.pw_check_msg{
  margin-left: 5px;
  font-size: .6rem;
  color: $cancel-color;
}
input{
  width: 100%;
  min-width: 100px;
  padding: 13px 10px;
  box-sizing: border-box;

  border: 1px solid rgb(230,230,230); 
  font-size:14px ;
  border-radius: 4px;
  margin: 0 0 12px;
}
button{
  width: 100%;
  min-width: 100px;

  background-color: $main-color;
  border-radius: 4px;
  border: none;
  color: #fff; 
  cursor: pointer;
  margin: 0 0 20px;
  padding: 0;
  height: 44px;
  &:hover{
    background-color: $main-color-hover;
  }
}
span{
  font-size: 13px;
  color: $gray-text-color;

}
.roter_link{
  
  a{
    font-size: 13px;
    color: $blue-link-color;
  }
}
</style>
