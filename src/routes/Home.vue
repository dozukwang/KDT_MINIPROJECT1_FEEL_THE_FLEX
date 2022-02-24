<template>
  <Swiper />
  <ItemsList />
</template>

<script>
import Swiper from '~/components/Home/Swiper.vue'
import ItemsList from '~/components/Home/ItemsList.vue'

export default {
  components:{
    Swiper,
    ItemsList
  }
}
</script>

<style lang="scss">
// swiper 색 변경을 위해 scoped를 제거했습니다. 문제가 발생하면 수정하겠슴다!
.swiper-button-prev, .swiper-button-next{
   color:$white;
 }
.swiper-pagination-bullet-active{
  background-color: $white;
}
</style>
