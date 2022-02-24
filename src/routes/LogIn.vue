<template>
  <SignInOutTemplate>
    <template #pageName>
      <h1>로그인</h1>
    </template>
    <template #default>
      <input
        v-model="userEmail"
        type="text"
        placeholder="이메일 주소 입력" />
      <input
        v-model="userPw"
        type="password"
        placeholder="비밀번호 입력" />
    </template>
    
    <template #submitBtn>
      <button @click="userlogIn">
        로그인
      </button>
    </template>
    <template #isSignInUp>
      <span>아직 계정이 없으신가요?</span>   
      <span class="roter_link">
        <RouterLink to="/signup">
          가입하기
        </RouterLink>
      </span>
    </template>
  </SignInOutTemplate>
</template>

<script>
import {logIn} from '~/utils/authApi'
import SignInOutTemplate from '../components/SignInOutTemplate'

export default {
  components:{
    SignInOutTemplate
  },
  data(){
    return{
      userEmail: '',
      userPw: ''
    }
  },
  methods: {
    userlogIn() {
      const data={email:this.userEmail,password:this.userPw} 
      logIn(data)
        .then((userInfo)=>{ 
        sessionStorage.setItem('accessToken', userInfo.accessToken)
        if(userInfo.user.email===this.$store.state.user.masterUserEmail){
          this.$router.push('/admin')
        }
        else{
          this.$router.push('/')
        }
        }).catch(err=>alert(err.response.data))
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
     background-color:$main-color-hover;
  }
}
span{
  font-size: 13px;
  text-align: center;
  color: $gray-text-color;
}
.roter_link{
  a{
    color: $blue-link-color;
  }

}


</style>
