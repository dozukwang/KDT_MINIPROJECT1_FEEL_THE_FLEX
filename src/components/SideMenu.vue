<template>
  <!-- 모달 -->
  <FullscreenModal
    v-model="isShow"
    :modal-name="modalName">
    <template #activator>
      <div
        class="user_profile main"
        @click.stop="isShow=true">
        <span class="user_profile__name">{{ currentUser.displayName }}</span>
        <!-- 사용자 이미지 혹은 이름 맨 앞 글자 -->
        <UserProfileImg :page-name="pageName='main'" />
      </div>
    </template>
    <template #default>
      <header>
        <span>내 정보</span>
      </header>
      <div class="devider"></div>
      <div class="menu_container">
        <!-- 유저 프로필 -->
        <div class=" user_profile menu">
          <UserProfileImg :page-name="pageName='menu'" />
          <span class="user_profile__name">{{ currentUser.displayName }}</span>
        </div>
        <div class="user_profile__email">
          {{ currentUser.email }}
        </div>
        <!-- 마이 페이지 -->
        <div class="devider"></div>
        <div class="menu_list">
          <!-- 계좌관리 -->
          <RouterLink
            v-if="!isMaster"
            to="/myaccount"
            class="menu_item"
            @click.stop="isShow=false">
            계좌 관리
          </RouterLink>
          <!-- 제품 관리 -->
          <RouterLink
            v-if="isMaster"
            to="/admin"
            class="menu_item"
            @click.stop="isShow=false">
            제품 관리
          </RouterLink>
          <!-- 설정 페이지 -->
          <RouterLink
            to="/settings"
            class="menu_item"
            @click.stop="isShow=false">
            설정
          </RouterLink>
        </div>
        <div class="devider"></div>
        <!-- 로그아웃 -->
        <a
          class="menu_item"
          @click.stop="userLogOut">
          로그아웃
        </a>
      </div>
    </template>    
  </FullscreenModal>
</template>

<script>
import FullscreenModal from './FullscreenModal'
import {logOut} from '~/utils/authApi'
import UserProfileImg from './UserProfileImg'
export default {
  components: { FullscreenModal,UserProfileImg },
  data(){
    return{
      isShow:false,
      modalName:'menu',
      pageName:'main'

    }
  },
  computed:{
    currentUser(){
      return this.$store.state.user.currentUser
    },
    isMaster(){
      return this.currentUser.email===this.$store.state.user.masterUserEmail
    }
  },
  watch:{
    
  },
  methods:{
    userLogOut(){
      // 서버로부터 로그아웃
      // 엑세스 토큰 삭제
      // store의 현재 사용자 데이터 null로 변경
      // 메인 페이지로 이동
       logOut().then(()=>{
        sessionStorage.removeItem('accessToken')
        this.isShow=false
        this.$store.commit('user/assignState',{ currentUser:null})
        this.$router.push('/')

       }).catch(err=>alert(err.response.data))     
    }
  }

}
</script>

<style lang="scss" scoped>

// 모달 창의 헤더
header{
  height: 65px;
  line-height: 65px;
  text-align: center;
}
//라우터 링크 스타일 전역
a {
  color: #212529;
  text-decoration: none;
  &:hover{
      color: $main-color-hover;
    }
}
//devider
.devider{
  width: 100%;
  border-bottom: 1px solid #3d3d3d;  // 수정 색상 태그
  margin : 10px 0;
}

.menu_container{
  width: 70%;
  margin: 0 auto;
  padding: 8px 10px;

  // 메뉴 목록
  .menu_list{
    display: flex;
    flex-direction: column;
  }
  // 각 메뉴 아이템
  .menu_item{
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0;
    }
    // 메뉴 아이템 호버
    
  }
}
// 유저 프로필 요소 
.user_profile{
  $profileSize:40px;

  // width: 145px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  text-decoration: none;
  
  @mixin profileName{
    font-weight: 700;
  }
  
  //메인 홈페이지의 프로필 요소
  &.main{
    .user_profile__name{
      @include profileName;
      margin-right: 8px;
    }  
    }
  // 메뉴 모달 창의 프로필 요소
  &.menu{
    display: flex;
    justify-content: flex-start;
    .user_profile__name{
      margin: 0 8px;
      font-size: 1.3rem;
      font-weight: 700;
    }  
  }
}
// 유저 이메일 요소
.user_profile__email{
  font-size: .8rem;
  padding: 5px 0 0;
}
</style>
