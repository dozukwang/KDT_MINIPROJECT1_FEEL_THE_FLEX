<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeleton title"></div>
      <section class="skeleton_inner">
        <div class="skeleton box"></div>
        <div class="skeleton box"></div>
      </section>
      <Loader 
        :loading="loading"
        :size="150"
        :fixed="fixed" />
    </template>
    <div
      v-else
      class="wrapper">
      <h1>{{ item.title }}</h1>
      <section class="inner_wrap">
        <div class="img_box">
          <img
            :src="item.thumbnail"
            alt="thumbnail" />
        </div>
        <div class="description_box">
          <span class="item_title">상품명</span>
          <h2>{{ item.title }}</h2>

          <span class="price">가격</span>
          <span class="detail_price">{{ price }}<span>원</span></span>

          <span class="dercription">제품 상세 설명</span>
          <p class="detail_description">
            {{ item.description }}
          </p>
          <span class="tag">연관 태그</span>
          <div class="tag_wrap">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="detail_tag">
              {{ tag }}
            </span>
          </div>
          <RouterLink to="/flex하기">
            <button class="flex_btn">
              FLEX
            </button>
          </RouterLink>
        </div>
      </section>
      <!-- {{ item }} -->
    </div>
  </div>
</template>



<script>
import Loader from '~/components/Loader'
export default {
  components:{
    Loader
  },
  data(){
    return{
      loading: false,
      fixed: true
    }
  },
  computed:{
    item(){
      return this.$store.state.items.detailItem
    },
    price(){
      const price = this.item.price
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  async created(){
    this.loading = true
    await this.$store.dispatch('items/getItemDetail', this.$route.params.id)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.container{
  font-family: 'S-CoreDream-4Regular';
  min-width: 540px;
  margin-bottom: 20px;
  padding:20px 10px;
  box-sizing: border-box;
  .skeleton{
    background-color: $gray-200;
    border-radius: 10px;
  }
  .title{
    margin: 0 auto;
    width: 300px;
    height: 32px;
    margin-bottom: 30px;
  }
  .skeleton_inner{
    display: flex;
    justify-content: center;
    .box{
      width: 500px;
      height: 500px;
    &:last-child{
      margin-left: 30px;
    }
    }
  }
  h1{
    font-weight: 700;
    color: $gray-900;
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }
  .inner_wrap{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    .img_box{
      flex-shrink: 0;
      width: 560px;
      height: 560px;
      line-height: 560px;
      margin-right: 30px;
      overflow:hidden;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      img{
        width: 100%;
        display: block;
      }
    }
    .description_box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 560px;
      min-width: 325px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      .item_title{
        display: block;
        font-size: 14px;
        color: $gray-700;
        margin: 0 0 2px 0;
      }
      h2{
        font-weight: 700;
        color: $gray-800;
        font-size: 20px;
        margin-bottom: 26px;
      }
      .price{
        display: block;
        font-size: 14px;
        color: $gray-700;
        margin: 0 0 -6px 0;
      }
      .detail_price{
        font-size: 30px;
        font-weight: 700;
        span{
          font-size: 26px;
          color: $gray-800;
          box-sizing: border-box;
        }
      }
      .dercription{
        display: block;
        font-size: 14px;
        color: $gray-700;
        margin: 26px 0 4px 0;
      }
      .detail_description{
        color: $gray-700;
        font-size: 15px;
        line-height: 1.5;
        background-color: $gray-200;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 26px;
      }
      .tag{
        display: block;
        font-size: 14px;
        color: $gray-700;
        margin: 0px 0 6px 0;
      }
      .tag_wrap{
      margin-bottom: 26px;
        .detail_tag{
          user-select:none;
          font-size: 14px;
          font-family: 'S-CoreDream-1Thin';
          font-weight: 700;
          margin-right: 10px;
          color: $gray-900;
          background-color: $gray-200;
          border-radius: 6px;
          padding: 4px 6px;
        }
      }
      .flex_btn{
        color:$black;
        background-color: $main-color;
        width: 78%;
        display: block;
        margin: 0 auto;
        font-size: 20px;
        padding: 20px;
        font-family: 'S-CoreDream-9Black';
        font-weight: 900;
        border: none;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        transition: .4s;
        text-align: center;
        &:hover{
          background-color: $main-color-hover;
          letter-spacing: 15px;
          padding-left: 40px;
          width: 80%;
          transform: translateY(-10px);
          box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
        }
        
      }
    } 
  }
}
</style>
