export default {
  namespaced: true,
  state: () => ({
    currentUser:null,
    masterUserEmail:'FlexAdmin@gmail.com'
  }),
  getters:{},
  mutations:{
    assignState(state,payload){
      Object.keys(payload).forEach(key=>{
        state[key]=payload[key]
      })
    }
  },
  actions:{
    
  }
}
