<template>
  <div class="container">
    <header>
      <div class="left-header">
        <RouterLink to="/">
          Home
        </RouterLink>
      </div>
      <RouterLink
        class="logo"
        to="/">
        <img
          src="../images/logo.png"
          alt="logo" />
      </RouterLink>
      <div class="right_header">
        <!-- 필수(인증 Api) -->
        <template
          v-if="!currentUser">
          <RouterLink to="/login">
            로그인
          </RouterLink>
          <RouterLink to="/signup">
            회원가입
          </RouterLink>
        </template>
        <SideMenu v-if="currentUser" />
        <!-- 필수(인증 Api) -->
      </div>
    </header>
  </div>
</template>
<script>
import SideMenu from './SideMenu.vue'

export default {
  components: { SideMenu },
  computed:{
    currentUser(){
      return this.$store.state.user.currentUser
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  font-family: 'S-CoreDream-4Regular';
  padding: 20px 20px;
  box-sizing: border-box;
  min-width: 540px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 35px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  a {
    color: $main-color;
    text-decoration: none;
    margin-right: 10px;
    line-height: 1;
    transition: .5s;
    &:hover{
      color:$main-color-hover;
    }
  }
  img {
    width: 100px;
  }
}
</style>
