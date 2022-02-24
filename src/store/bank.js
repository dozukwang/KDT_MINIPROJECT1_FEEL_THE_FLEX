export default {
  namespaced: true,
  state: () => ({
    allBankList:null,
    userTotalBalance :null,
    userAccountList:null
    
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
