<template>
  <RouterLink
    :to="`/detail/${item.id}`"
    class="item">
    <div
      class="item_thumbnail"
      :style="{ backgroundImage: `url(${item.thumbnail})`}">
    </div>
    <div class="item-detail">
      <div
        ref="tag_wrap"
        class="tag_wrap"
        @mousewheel.prevent="wheel">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="item_tag">
          {{ tag }}
        </span>
      </div>
      <h3 class="item_title">
        {{ item.title }}
      </h3>
      <span class="item_price">
        {{ price }}
      </span>
      <div
        class="item_description">
        {{ item.description }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props:{
    item:{
      type: Object,
      default: () => ({})
    },
    index:{
      type: Number,
      default: 0
    }
  },
  computed:{
    price(){
      const price = this.$store.state.items.items[this.index].price
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원'
    }
  },
  methods:{
    wheel(e){
      if(e.target !== this.$refs.tag_wrap) {
        if(e.wheelDelta > 0){
          e.target.parentElement.scrollLeft -= 20 
        }else{
          e.target.parentElement.scrollLeft += 20
        }
      } else{
      if(e.wheelDelta > 0){
          e.target.scrollLeft -= 20 
      }else{
          e.target.scrollLeft += 20
      }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  width: 300px;
  margin: 10px;
  &:hover{
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
  .item_thumbnail{
    width: 300px;
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: $gray-200;
  }
  .item-detail{
    padding: 8px;
    .tag_wrap{
      display: flex;
      overflow-x: scroll;
      height: 24px;
      margin-bottom: 10px;
      -ms-overflow-style: none; 
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .item_tag{
        flex-shrink: 0;
        display: block;
        font-size: 12px;
        color: $gray-900;
        font-family: 'S-CoreDream-1Thin';
        font-weight: 700;
        margin-right: 8px;
        background-color: $gray-200;
        border-radius: 6px;
        padding: 4px 4px 0;
      }
    }
    .item_title{
      font-weight: 700;
      font-size: 16px;
      color: $gray-700;
      margin-bottom: 4px;
    }
    .item_price{
      font-size: 14px;
      color: $gray-700;
      margin-bottom: 8px;
    }
    .item_description{
      color: $gray-600;
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @include media-breakpoint-down(xxl) {
     width: 258px;
    .item_thumbnail{
      width: 258px;
      height: 258px;
    }
    .item-detail{
      .tag_wrap{
        margin-bottom: 10px;
        height: 20px;
        .item_tag{
          font-size: 12px;
          margin-right: 8px;
          border-radius: 6px;
          padding: 2px 4px 0px;
        }
      }
      .item_title{
        font-size: 16px;
      }
      .item_price{
        font-size: 14px;
      }
      .item_description{
        font-size: 13px;
      }
    }
  }
  @include media-breakpoint-down(xl) {
    width: 213px;
    .item_thumbnail{
      width: 213px;
      height: 213px;
    }
    .item-detail{
      padding: 6px;
      .tag_wrap{
        margin-bottom: 10px;
        height: 20px;
        .item_tag{
          font-size: 8px;
          margin-right: 8px;
          border-radius: 6px;
          padding: 3px 4px 0px;
        }
      }
      .item_title{
        font-size: 14px;
      }
      .item_price{
        font-size: 12px;
      }
      .item_description{
        font-size: 12px;
      }
    }
  }
  @include media-breakpoint-down(lg)  {
    width: 210px;
    .item_thumbnail{
      width: 210px;
      height: 210px;
    }
  }
  @include media-breakpoint-down(md) {
    width: 235px;
    .item_thumbnail{
      width: 235px;
      height: 235px;
    }
    .item-detail{
      padding: 8px;
      }
      .item_title{
        font-size: 16px;
      }
      .item_price{
        font-size: 14px;
      }
    }
  }
</style>
