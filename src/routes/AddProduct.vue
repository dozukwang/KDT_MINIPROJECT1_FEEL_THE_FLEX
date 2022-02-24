<template>
  <div class="adding_page">
    <h1>제품 추가하기</h1>
    <ImgCropper v-if="cropMode" />
    <form @submit.prevent="AddProduct()">
      <div class="product_info">
        <div
          class="thumbnail"
          @click="openCropModal">
          <img
            v-if="thumbnail"
            :style="`user-select: none;`"
            :src="croppedThumbnail" />
        </div>
        <div class="input_group">
          <label>
            <span> 제품명 *</span>
            <input
              v-model="title"
              placeholder="제품명을 적어주세요 (필수)"
              type="text" />
          </label>
          <label>
            <span> 가격 * </span>
            <input
              v-model="price"
              placeholder="가격을 적어주세요 (필수)"
              type="text" />
          </label>
          <label>
            <span> 제품 설명 * </span>
            <input
              v-model="description"
              placeholder="제품 설명을 적어주세요 (필수)"
              type="text" />
          </label>
          <label>
            <span> 태그 </span>
            <input
              v-model="tags"
              placeholder="태그을 적어주세요"
              type="text" />
          </label>
          <label class="files">
            <span> 썸네일 이미지 </span>
            <input
              type="file"
              @change="selectThumbnail" />
            <span class="upload_info"> ※ 업로드 가능 최대 용량은 1MB입니다 </span>
          </label>
        </div>
      </div> 
      <div
        v-if="preventSubmit"
        class="error_alert">
        필수 입력내용을 작성해주세요.
      </div>
      <div
        v-if="overFileSize"
        class="error_alert">
        업로드 가능한 파일의 최대 용량(1MB)을 초과했습니다.
      </div>
      <button
        class="btn"
        type="submit">
        추가하기
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ImgCropper from '~/components/ImgCropper'

export default {
  components: {
    ImgCropper
  },
  data(){
    return{
      title: '',
      price: '',
      description: '',
      tags: '',
      preventSubmit: false,
      overFileSize: false,
    }
  },
  computed: {
    cropMode() {
      return this.$store.state.cropImage.cropMode
    },
    thumbnail() {
      return this.$store.state.cropImage.thumbnail
    },
    croppedThumbnail(){
      return this.$store.state.cropImage.croppedThumbnail
    }
  },
  created(){
    //State 값을 초기화
    //제품수정 창에서 제품추가 창으로 왔을 때, 썸네일 정보를 빈 문자열로 가져오기 때문에 이미지창을 클릭시 cropModal이 켜지는 현상을 방지
    this.$store.dispatch('cropImage/sendResetStateData')
  },
  methods: {
    async AddProduct() {
     try {
       if (this.title && this.price && this.description) {
         this.splitTags()
         const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
          method: 'POST',
          headers: {
          'content-type': 'application/json',
          'apikey': process.env.API_KEY,
          'username': process.env.USERNAME,
          'masterKey': true
          },
          data: {
            title: this.title,
            price: this.price,
            description: this.description,
            tags: this.tags,
            thumbnailBase64: this.croppedThumbnail,
          }
        })
        this.$router.push('/admin')
        return data
      } else { this.preventSubmit = true }
      } catch(error) {
        alert(error.response.data)
      }
    },
    splitTags(){
      this.tags = this.tags.split(',').map(tag => tag.trim())
    },
    openCropModal(){
      if (this.croppedThumbnail){
        this.$store.dispatch('cropImage/startCrop')
      }
    },
    selectThumbnail(event){
      const maxImgSize = 1 * 1024 * 1024 //1MB
      const { files } = event.target
      for (const file of files) {
        if (file.size > maxImgSize) {
         this.overFileSize = true
         return
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.$store.dispatch('cropImage/sendThumbnail', reader.result)
          this.$store.dispatch('cropImage/sendCroppedThumbnail', reader.result)
          this.openCropModal()
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.adding_page{
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 4px;
  width: 1200px;
  padding: 70px 30px;
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1{
    font-size: 32px;
    font-weight: 700;
  }
  img{
    width: 100%;
    height: 100%;
  }
  form{
    margin-top: 40px;
    width: 960px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .product_info{
      display: flex;
      width: 100%
    }
    div.thumbnail {
      width: 360px;
      height: 360px;
      background-color: $gray-background-color;
      background-image: url('../../static/null.png');
      background-size: contain;
      margin: auto 10px;
    }
    .input_group{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 14px 30px;
      input{
        width: 100%;
        padding: 6px 10px;
        margin-top: 4px;
        border: none;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      }
      label + label{
        margin-top: 18px;
      }
      .files input{
        position: relative;
        &[type=file]::file-selector-button {
        color: #fcfcfc;
        background-color: $main-color;
        border: none;
        position: absolute;
        width: 100px;
        right: -5px;
        top: 0;
        bottom: 0;
        transition: .4s;
          &:hover {
          background-color: $main-color-hover;
          }
        }
      }
      .files .upload_info{
        font-size: 12px;
        color: $gray-text-color;
        
      }
    }
    .error_alert{
      color: $cancel-color;
      position: absolute;
      bottom: 70px;
    }
    button{
      width: 500px;
      margin: 80px 0 0;
      background-color: $main-color;
      color: #fcfcfc;
      &:hover{
        background-color: $main-color-hover;
      }
      height: 50px;
    }
  }
}
</style>
