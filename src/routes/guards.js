import {getAuth} from '~/utils/authApi'
import router from './'
import store from '~/store'

router.beforeEach( async ()=>{
  try{
    const user = await getAuth()
    store.commit('user/assignState',{currentUser:user})
  }
  catch(errMsg){
    console.log(errMsg.response.data)

  }
  }
)
