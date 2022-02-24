<template>
  <div class="admin_page">
    <div class="page_title">
      <h1>관리자페이지</h1>
      <RouterLink
        class="add btn"
        :to="{ name : 'AddProduct' }">
        제품추가
      </RouterLink>
    </div>
    <div class="product_list">
      <h3>
        제품 관리하기
      </h3>
      <AdminProductList />
    </div>
  </div>
</template>

<script>
import AdminProductList from '~/components/AdminProductList'

export default {
  components:{
    AdminProductList
  },
  created(){
  this.$store.dispatch('adm_productList/readProducts')
  }
}
</script>

<style lang="scss" scoped>
.page_title{
  display: flex;
  align-items: center;
  h1{
    margin: 0 20px 0 40px;
    font-size: 40px;
  }
  .add.btn{
    background-color: $main-color;
    color: #fcfcfc;
    &:hover{
      background-color: $main-color-hover;
    }
  }
}
.product_list{
  min-width: 1500px;
  h3{
  text-align: center;
  margin: 30px 0;
  font-size: 28px;
  }
}
</style>
