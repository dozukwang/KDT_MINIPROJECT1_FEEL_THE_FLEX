<template>
  <div class="container">
    <swiper
      :space-between="30"
      :effect="'fade'"
      :autoplay="{
        'delay': 3000,
        'disableOnInteraction': false,
        'pauseOnMouseEnter' : true
      }"
      :navigation="true"
      :loop="true"
      :pagination="{
        clickable: true
      }"
      class="mySwiper">
      <swiper-slide
        @click="$router.push('/detail/nEnb7WYFeIPxRcOxAmBl')">
        <div class="slide_img">
          <img
            src="../../images/maserati.png"
            alt="maserati" />
        </div>
        <div class="slide_description slide_description1">
          <span class="ad">담대하고</span>
          <span class="ad">압도적인 성능</span>
          <span class="title">콰트로포르테 트로페오</span>
        </div>
      </swiper-slide>
      <swiper-slide
        @click="$router.push('/detail/YONQCemejj9ixz9wpudG')">
        <div class="slide_img">
          <img
            src="../../images/power.png"
            alt="powers" />
        </div>
        <div class="slide_description slide_description2">
          <span class="ad">오직 <b>FLEX</b>에서만 판매하는</span>
          <span class="ad">유용하고 신비로운</span>
          <span class="title">다양한 초능력</span>
        </div>
      </swiper-slide>
      <swiper-slide
        @click="$router.push('/detail/KMLLv1WY1j9nLyBnal82')">
        <div class="slide_img">
          <img
            src="../../images/resort.png"
            alt="resort" />
        </div>
        <div class="slide_description slide_description3">
          <span class="ad">이제 힐링도 <b>FLEX</b>에서</span>
          <span class="ad">먹거리 볼거리가 넘치는</span>
          <span class="title">초호화 리조트 숙박권</span>
        </div>
      </swiper-slide>
      <swiper-slide
        @click="$router.push('/detail/4wGaHKMnDnj93khoUiGo')">
        <div class="slide_img">
          <img
            src="../../images/flex.png"
            alt="resort" />
        </div>
        <div class="slide_description slide_description4">
          <span class="ad">이런 명품은 처음이지?</span>
          <span class="ad"><b>FLEX</b>에서 즐기는 FLEX</span>
          <span class="title">브랜드 명품관</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import Swiper core and required modules
import SwiperCore, {
  EffectFade,Navigation,Pagination,Autoplay
} from 'swiper'

// install Swiper modules
SwiperCore.use([EffectFade,Navigation,Pagination,Autoplay])

export default {
  components: {
    Swiper,
    SwiperSlide,
  }
 
}
</script>

<style lang="scss" scoped>
.container{
  padding: 0;
  min-width: 540px;
}
.swiper {
  font-family: 'S-CoreDream-4Regular';
  height: 300px;
  .swiper-slide {
   position: relative;
   cursor: pointer;
   .slide_img{
     background-size: cover;
    background-position: center center;
    width: 68%;
    height: 300px;
    margin-right: 32%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      height: 300px;
    }
   }
  .ad{
  margin-bottom: -8px;
  }
  b{
    font-family: 'S-CoreDream-9Black';
  }
  .title{
    font-family: 'S-CoreDream-9Black';
    margin-top: 5px;
    font-size: 28px;
  }
  .slide_description{
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    font-size: 24px;
  }
  div{
    width:32%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 2;
    &.slide_description1{
      background-color: #06453c;
      color: $white;
    }
    &.slide_description2{
      background-color: #c8d0ff;
      color: $gray-900;
    }
     &.slide_description3{
      background-color:  #625f2c;
      color: $white;
    }
     &.slide_description4{
      background-color: #d6080c;
      color: $black;
    }
  }
   @include media-breakpoint-down(xl) {
    .ad{
      font-size: 22px;
    }
   .title{
    font-size: 24px;
    }
    }
  @include media-breakpoint-down(lg) {
    .ad{
      font-size: 16px;
      margin-bottom: -4px;
    }
    .title{
    font-size: 18px;
    }
    }
    @include media-breakpoint-down(md) {
    .ad{
      font-size: 10px;
      margin-bottom: 0px;
    }
    .title{
    font-size: 12px;
    margin-top: 2px;

    }
  }
}
}
</style>
