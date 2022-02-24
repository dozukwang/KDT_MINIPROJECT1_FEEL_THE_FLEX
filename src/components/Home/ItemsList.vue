<template>
  <div class="container">
    <div class="search_wrap">
      <span
        :title="textOrTag"
        class="material-icons mode_change_btn"
        @click="changeSearchMode">
        change_circle
      </span>
      <template v-if="isSearchText"> 
        <input
          v-model="searchItem.searchText"
          type="text"
          class="search" 
          placeholder="무엇을 FLEX 해볼까요?"
          @keypress.enter="search" />
      </template>
      <template v-else>
        <div class="tag_wrap">
          <span
            v-for="tag in allTag"
            :key="tag"
            class="tag"
            @click="tagClick">{{ tag }}</span>
          <span
            title="태그로 검색!"
            class="material-icons tag_search_btn"
            @click="search">
            pageview
          </span>
        </div>
      </template>
    </div>
    <div class="info">
      <span>{{ title }}</span> <span>({{ count }})</span>
    </div>
    <div
      class="items">
      <Loader 
        :loading="loading"
        :size="150"
        :absolute="absolute" />
      <Item
        v-for="(item, index) in items"
        :key="item.id" 
        :item="item"
        :index="index" />
      <template v-if="items.length === 0">
        <div class="no_result_wrap">
          <span class="no_result">검색 결과가 없습니다.</span> <span class="icon">💬</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Item from '~/components/Home/Item.vue'
import Loader from '~/components/Loader'


export default {
  components:{
    Item,
    Loader
  },
  data(){
    return{
      searchItem: {
        searchText: '',
        searchTags: []
      },
      allTag: [],
      isSearchText: true,
      absolute: true,
      loading: false,
      title: '전체 상품',
      count: 0
    }
  },
  computed: {
    ...mapState('items',[
      'items'
    ]),
    textOrTag(){
      return this.isSearchText? '태그로 검색하기' : '상품명으로 검색하기'
    },
    
  },
  mounted(){
    this.getAllItem()
    
  },
  methods: {
    async getAllItem(){
      const result = await this.$store.dispatch('items/getAllItem')
      this.count = this.$store.state.items.items.length
      this.title='전체 상품'
      this.getAllTags()
      // console.log(result)
    },
    async search(){
      this.loading = true
      // 공백 제거
      this.searchItem.searchText = this.searchItem.searchText.trim()
      const result = await this.$store.dispatch('items/getSearchItem', this.searchItem)
      this.loading = false
      this.count = this.$store.state.items.items.length
      this.title='검색 결과'
      // console.log('this is searched',result)
    },
    getAllTags() {
      // console.log('this is items',this.items)
      this.items.forEach(item => {
        if(item.tags === '') return
        item.tags.forEach(tag => {
          if(this.allTag.includes(tag)){
            return
          } else{
            this.allTag.push(tag)
          }
        })
      })
      // console.log(this.allTag)
    },
    changeSearchMode() {
      this.isSearchText = !this.isSearchText
      this.searchItem.searchText = ''
      this.searchItem.searchTags = []
    },
    tagClick(event){
      const choicedTag = event.target
      const tag = choicedTag.innerText
      const choicedTagList = this.searchItem.searchTags
      if (choicedTag.classList.contains('clicked')){
        choicedTag.classList.remove('clicked')
        choicedTagList.splice(choicedTagList.indexOf(tag), 1)
      } else{
        choicedTag.classList.add('clicked')
        choicedTagList.push(tag)
      }
      // console.log(event.target)
      // console.log(event.target.innerText)
      // console.log(this.searchItem.searchTags)
      // console.log(this.searchItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  font-family: 'S-CoreDream-4Regular';
  min-width: 540px;
  margin-bottom: 40px;
}
.search_wrap{
  width: 80%;
  overflow: visible;
  margin: 35px auto 20px;
  position: relative;
  .mode_change_btn{
    font-size: 40px;
    cursor: pointer;
    color: $main-color;
    position:absolute;
    left: -45px;
    top: 3px;
    transition: .5s;
    &:hover{
      color: $main-color-hover;
    }
  }
  .search{
    width: 100%;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid rgba($main-color, .5);
    transition: .5s;
    &:focus{
      outline: none;
      border: 2px solid $main-color;
    }
  }
  
  .tag_wrap{
    position: relative;
    border-radius: 10px;
    border: 2px solid rgba($main-color, .5);
    padding: 6px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    transition: .5s;
    &:hover{
      border: 2px solid $main-color;
    }
    .tag_search_btn{
      font-size: 40px;
      cursor: pointer;
      color: $main-color;
      position:absolute;
      left: -48px;
      top: 40px;
      transition: .5s;
      &:hover{
        color: $main-color-hover;
      }
    }
    .tag{
      flex-shrink: 0;
      margin-bottom: 6px;
      user-select:none;
      font-size: 12px;
      font-family: 'S-CoreDream-1Thin';
      font-weight: 700;
      margin-right: 8px;
      color: $gray-900;
      background-color: $gray-200;
      border-radius: 6px;
      padding: 2px 4px;
      cursor: pointer;
      &.clicked{
        font-family: 'S-CoreDream-4Regular';
        background-color: rgba($main-color, .8);
      }
    }
  }
}
.info{
  margin-left: 20px;
  span{
    font-size: 20px;
    &:first-child{
      font-size: 24px;
      font-weight: 700;
    }
  }
  @include media-breakpoint-down(lg)  {
      span{
      font-size: 16px;
      &:first-child{
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
.items{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  .no_result_wrap{
    width: 400px;
    text-align: center;
    margin: 0 auto;
    .no_result{
        height: 200px;
        line-height: 200px;
        color: $gray-600;
        font-size: 20px;
      }
      .icon{
        position: relative;
        font-size: 28px;
        top: -15px;
        left: -8px
      }
  }
  
}

</style>
