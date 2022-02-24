<template>
  <teleport to="body">
    <div class="modal">
      <div class="cropper_container">
        <cropper 
          ref="cropper"
          class="cropper"
          :src="img"
          :stencil-props="{
            handlers: {},
            movable: false,
            scalable: false,
            aspectRatio: 1,
          }"
          :stencil-size="{
            width: 300,
            height: 300
          }"
          :resize-image="{
            adjustStencil: false
          }"
          image-restriction="stencil" />
        <div>
          <button
            class="btn cut"
            @click.prevent="crop">
            자르기
          </button>
          <button
            v-if="editMoreThanOnce"
            class="btn cancle"
            @click="closeCropModal">
            취소
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  components: {
    Cropper
  },
    data() {
    return {
      coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0,
			},
      editTime: 0,
    }
  },
   computed: {
    img(){
      return this.$store.state.cropImage.thumbnail
    },
    editMoreThanOnce(){
        if(this.editTime > 0) { return true }
        else { return false }
    }
  },
  methods: {
    crop() {
			const { coordinates, canvas, } = this.$refs.cropper.getResult()
			this.coordinates = coordinates
      this.$store.dispatch('cropImage/sendCroppedThumbnail', canvas.toDataURL('image/jpeg'))
      this.editTime += 1
      this.$store.dispatch('cropImage/endCrop')
		},
    closeCropModal(){
        this.$store.dispatch('cropImage/endCrop')
    }
  },
}
</script>

<style lang="scss" scoped>

@mixin btn($width, $color, $hover_color){
  width: $width;
  height: 50px;
  margin-top: 50px;
  background-color: $color;
  color: #fcfcfc;
  &:hover{
    background-color: $hover_color;
  }
}
.modal{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(black, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.cropper_container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  width: 1000px;
  padding: 100px 0 50px;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  .cropper{
    width: 500px;
    height: 500px;
    background-color: $gray-background-color;
    border-radius: 10px
  }
}
.cut{
  @include btn(200px, $main-color, $main-color-hover);
}
.cancle{
  margin-left: 30px;
  @include btn(100px, $cancel-color, $cancel-color-hover);
}

</style>
