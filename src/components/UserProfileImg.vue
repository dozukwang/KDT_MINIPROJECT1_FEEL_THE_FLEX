<template>
  <template v-if="!currentUser?.profileImg">
    <div :class="[`${pageName} user_profile__img`]">
      <span>{{ currentUser?.displayName[0] }}</span>
    </div>
  </template>
  <template v-else>
    <div :class="[`${pageName} user_profile__img src`]">
      <img
        :src="currentUser?.profileImg"
        alt="IMG" />
    </div>
  </template>
</template>
<script>
export default {
  props:{
    pageName:{
      type:String,
      default:null
    }
  },
  computed:{
    currentUser(){
      return this.$store.state.user.currentUser
    },
  }
}
</script>
<style lang="scss">
@mixin profileImg{
    border-radius: 50%;
    background-color: $gray-background-color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #fff; // 수정 - 색상 태그 
    overflow: hidden;
    span{
      margin-top:3px ;
    }
    &.src{
        background-color: #fff;
      }  
  }
  .user_profile__img{
    &.main{
      @include profileImg;
      $profileSize:40px;
      width:$profileSize;
      height: $profileSize;

      img{
        width:$profileSize;
        height: $profileSize;
      }
    }
    &.menu{
      @include profileImg;
      $profileSize:40px;
      width:$profileSize;
      height: $profileSize;

      img{
        width:$profileSize;
        height: $profileSize;
      }
      

    }
    &.settingsBefore{
      $profileSize:50px;
      width:$profileSize;
      height: $profileSize;
      @include profileImg;
      img{
        width:$profileSize;
        height: $profileSize;
      }
    }
    
    &.settingsAfter{
      $profileSize:60px;
      width:$profileSize;
      height: $profileSize;
      @include profileImg;
      img{
        width:$profileSize;
        height: $profileSize;
      }

    }

  }
</style>
