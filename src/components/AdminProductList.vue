<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr class="head_info">
          <th
            :style="`min-width: 30px;`"></th>
          <th>
            제품 수정
          </th>
          <th
            v-for="info in productsInfo"
            :ref="info"
            :key="info"
            :class="`${info}`"
            @click="sortTable(info)">
            {{ info.toUpperCase() }}
            <div
              v-if="info == sortColumn"
              class="arrow"
              :class="ascending ? 'arrow_up' : 'arrow_down'">
              <svg
                v-show="ascending"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-up-fill"
                viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              <svg
                v-show="!ascending"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="product.id">
          <td> {{ index }} </td>
          <td class="edit_cell">
            <RouterLink
              :to=" 
                { name: 'EditProduct', 
                  params:{ 
                    id: product.id,
                    oldTitle: product.title,
                    oldPrice: product.price,
                    oldDescription: product.description,
                    oldTags: product.tags.toString(),
                    oldThumbnail: product.thumbnail
                  }
                } ">
              <button
                class="btn bi bi-pencil-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </button>
            </RouterLink>
          </td>
          <td
            v-for="info in productsInfo"
            :key="product[info]">
            {{ product[info] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return{
      ascending: false,
      sortColumn: '',
    }
  },  
  computed:{
    products(){
      return this.$store.state.adm_productList.productsList
    },
    productsInfo() {
      if (this.products.length == 0) {
        return []
      }
      return Object.keys(this.products[0])
    }
  },
  methods: {
    sortTable(info){
      if (this.sortColumn === info) {
        this.ascending = !this.ascending
      } else {
        this.ascending = true
        this.sortColumn = info
      }

      let ascending = this.ascending

      this.products.sort(function(a, b) {
        if (a[info] > b[info]) {
          return ascending ? 1 : -1
        } else if (a[info] < b[info]) {
          return ascending ? -1 : 1
        }
        return 0
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.table-responsive{
  width: 100%;
}
table{
  tr.head_info{
    background-color: $gray-background-color;
  }
  th{
    position: relative;
    vertical-align: middle;
    font-size: 20px;
    padding: 0 20px;
    height: 50px;
    white-space: nowrap;
    &:hover{
      background-color: $gray-background-color-hover;
    }
    .arrow{
      width: 30px;
      height: 30px;
      text-align: center;
      position: absolute;
      right: 15px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    &:last-child .arrow{
      right: 0px;
    }
  }
}
.edit_cell{
  vertical-align: middle;
  text-align: center;
}
.bi.btn{
  width: 40px;
  height: 40px;
  padding: 5px;
  background-color: transparent;
  border: 1px solid $gray-text-color;
  color: $gray-text-color;
  &:hover{
   color: #fcfcfc;
   background-color: $main-color;
   border: none;
  }
}
tr > td:first-child{
  vertical-align: middle;
  text-align: center;
  border-right: 1px solid $gray-background-color-hover;
}
tr > td:last-child{
  vertical-align: middle;
  text-align: center;
}
</style>
