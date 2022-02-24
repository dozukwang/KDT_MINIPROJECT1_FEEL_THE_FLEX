import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import MyAccount from './MyAccount'
import Settings from './Settings'
import Admin from './Admin'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import DetailItem from './DetailItem'
import store from '~/store'


export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: LogIn
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path:'/myaccount',
      component: MyAccount
    },
    {
      path:'/settings',
      component: Settings
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter:(to,from,next)=>{
        if(store.state.user.currentUser.email!==store.state.user.masterUserEmail){
          alert('유효한 접근이 아닙니다')
          return next('/')      
        }
        next()
      }
    },
    {
      name: 'AddProduct',
      path: '/admin/add-product',
      component: AddProduct,
      beforeEnter:(to,from,next)=>{
        if(store.state.user.currentUser.email!==store.state.user.masterUserEmail){
          alert('유효한 접근이 아닙니다')
          return next('/')      
        }
        next()
      }
    },
    {
      name: 'EditProduct',
      path: '/admin/edit-product/:id',
      component: EditProduct,
      props: true,
      beforeEnter:(to,from,next)=>{
        if(store.state.user.currentUser.email!==store.state.user.masterUserEmail){
          alert('유효한 접근이 아닙니다')
          return next('/')      
        }
        next()
      }
    },
    {
      path: '/detail/:id',
      component: DetailItem
    }
  ]
})
