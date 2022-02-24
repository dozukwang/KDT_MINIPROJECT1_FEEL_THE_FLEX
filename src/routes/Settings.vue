<template>
  <div class="settings_page">
    <div class=" header container">
      <h1>설정</h1>
    </div>
    <div class="devider"></div>
    <div class="container">
      <!-- 프로필 사진 -->
      <SettingsItem :edit-data-function="editUserImg">
        <template #item_name>
          프로필 사진
        </template>
        <template #beforChange>
          <UserProfileImg :page-name="pageName='settingsBefore'" />
        </template>
        <template #default>
          <div class="img_upload_wrap">
            <UserProfileImg
              v-if="!profileImgSrc"
              :page-name="pageName='settingsAfter'" />
            <div
              v-else
              class="settingsAfter user_profile__img src">
              <img :src="profileImgSrc" />
            </div>
            <div class="img_upload_text">
              <label>
                <input
                  id="file_upload_btn"
                  type="file"
                  @change="selectFile" />
                파일 업로드
              </label>
              <div>프로필 이미지는 1MB 이하여야 합니다</div>
            </div>
          </div>
        </template>
      </SettingsItem>
      <div class="devider"></div>
      <!-- 이름 -->
      <SettingsItem :edit-data-function="editUserName">
        <template #item_name>
          이름
        </template>
        <template #beforChange>
          <span> {{ currentUser?.displayName }}</span>
        </template>
        <template #default>
          <input
            v-model="newUserName"
            type="text" />
        </template>
      </SettingsItem>
      <div class="devider"></div>
      <!-- 비밀번호 -->
      <SettingsItem :edit-data-function="editUserPw">
        <template #item_name>
          비밀번호
        </template>
        <template #default>
          <div class="form_items_wrap">
            <span> 현재 비밀번호</span>
            <input
              v-model="oldUserPw"
              placeholder="현재 비밀번호"
              type="text"
              @blur="checkOldPw" />
          </div>
          <div class="form_items_wrap">
            <span>변경할 비밀번호</span>
            <span :class="[pwSameCheck() ? 'isOk':'','pwCheckMsg']">{{ pwSameCheckMsg }}</span>
            <input
              v-model="newUserPw"
              placeholder="변경할 비밀번호"
              type="text"
              @blur="pwSameCheck" />
            <input
              v-model="newUserPwCheck"
              placeholder="비밀번호 확인"
              type="text"
              @blur="pwSameCheck" />
          </div>
        </template>
      </SettingsItem>
    </div>
  </div>
</template>

<script>
import UserProfileImg from '~/components/UserProfileImg'
import SettingsItem from '~/components/SettingsItem'
import {editInfo,logOut} from '~/utils/authApi'

export default {
  components:{
    UserProfileImg,
    SettingsItem
  },
   data(){
    return {
      profileImgSrc:null,
      imgChange:false,
      newUserName:this.$store.state.user.currentUser?.displayName,
      oldUserPw:'',
      newUserPw:'',
      newUserPwCheck:'',
      pwSameCheckMsg:''
    }
  },
  computed:{
    currentUser(){
      return this.$store.state.user.currentUser
    }
  },
  methods:{
    selectFile(event){
      const {files} = event.target
      for(const file of files){
        const reader= new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load',()=>{
          this.profileImgSrc=reader.result
        })

      }   
    },
    // 사용자 프로필 변경
    editUserImg(){  
      // 서버에 회원정보 수정 요청
      editInfo({profileImgBase64:this.profileImgSrc}).then((data)=>{
        // 변경된 데이터를 store의 현재 유저 데이터로 갱신
        this.$store.commit('user/assignState',{currentUser:data})
      })
    },
    // 사용자 이름 변경
    editUserName(){
      // 서버에 회원 정보 수정 요청
      editInfo({displayName:this.newUserName}).then((data)=>{
        // 변경된 데이터를 store의 현재 유저 데이터로 갱신
        this.$store.commit('user/assignState',{currentUser:data})
      })
    },
    // 비밀번호 8자리 검사 & 비밀번호 동일한지 확인
    pwSameCheck(){
      // 8자리이상인지 확인
      if(this.newUserPw.length>7 || this.newUserPwCheck.length>7){
        // 두 입력값이 동일한지 확인
        if(this.newUserPw===this.newUserPwCheck )
        { 
          this.pwSameCheckMsg='OK'
          return true
        }else{
          this.pwSameCheckMsg='비밀번호를 확인해주세요'
          return false
        }}
      else{
        this.pwSameCheckMsg='8자리 이상의 비밀번호를 입력하세요'
        return false
      }

    },
    // 비밀번호 변경
    editUserPw(){
      // 비밀번호 재검사
     if( this.pwSameCheck()){
      // 변경의사 재확인
      if(confirm('비밀번호 변경시 재로그인이 필요합니다'))
      {
        editInfo({oldPassword:this.oldUserPw,newPassword:this.newUserPw}).then(()=>{
        // 서버에 로그아웃 요청
        logOut().then(()=>{
          // 엑세스 토큰 삭제
          sessionStorage.removeItem('accessToken')
          // store의 현재 유저 null로 갱신
          this.$store.commit('user/assignState',{ currentUser:null})
          // 로그인 페이지로 이동
          this.$router.push('/login')
        })
      })

      }
      
     }
    }
  }
  
}
</script>
<style lang="scss" scoped>
.settings_page{  
  // top: 0; //헤더 높이 만큼
  // left: 0;
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* Internet Explorer */
  scrollbar-width: none;
  /* Firefox 64 */

  &::-webkit-scrollbar {
  /* 크롬 사파리*/
  display: none;
}

}

//devider
.devider{
  width: 100%;
  border-bottom: 1px solid rgb(230, 230, 230);
;  // 수정 색상 태그
  margin : 10px 0;
}
.container{
  width: 70%;
  margin: 0 auto;
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
  input{
    width: 100%;
    height: 35px;
    background: transparent;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid rgb(230, 230, 230);
    font-size: .8rem;
    display: block;
  }
  .img_upload_wrap{
    display: flex;
    width: 100%;
    align-items: center;
    .img_upload_text{
      display: flex;
      flex-direction: column;
      align-items:  flex-start;
      justify-content: center;
      height: 60px;
      font-size:.8rem ;
      padding: 10px;
      flex-grow: 1;
      button{
        border-radius: 4px;
        border: 1px solid rgb(230, 230, 230);
        padding:  3px 5px;
        margin-left: 5px;     
      }
      label{ 
        cursor: pointer;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid rgb(230, 230, 230);
        padding:  3px 5px; 
        margin-bottom: 10px;  
      }
      input[type="file"]{
        width: 1px;
        height: 1px;
        padding: 2px;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
      }
    }
  }
  .form_items_wrap{
    margin-bottom: 15px ;
    
    span{
      display: inline-block;
      margin-bottom: 10px;
    }
    input{
      margin-bottom: 10px;
      &:last-child{
      margin-bottom: 0px;
    }
    }
    .pwCheckMsg{
      color: $color-danger;
      font-size: .6rem;
      margin-left: 10px;
      &.isOk{
        color:$color-primary ;
      }
    }
  }
}
</style>
