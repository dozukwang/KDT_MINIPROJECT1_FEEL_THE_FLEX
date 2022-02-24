import { createStore } from 'vuex'
import user from './user'
import bank from './bank'
import cropImage from './cropImage'
import adm_productList from './adm_productList'
import items from './items'


export default createStore({
  modules: {
    user,
    bank,
    cropImage,
    adm_productList,
    items
  }
})
