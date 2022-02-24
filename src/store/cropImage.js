const defaultState = () => {
  return {
    cropMode: false,
    thumbnail: null,
    croppedThumbnail: null
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations:{
    changeCrop(state, payload){
      state.cropMode = payload
    },
    setThumbnail(state, payload){
      state.thumbnail = payload
    },
    setCroppedThumbnail(state, payload){
      state.croppedThumbnail = payload
    },
    resetStateData(state){
      Object.assign(state, defaultState())
    }
  },
  actions:{
    startCrop({commit}){
      commit('changeCrop', true)
    },
    endCrop({commit}){
      commit('changeCrop', false)
    },
    sendThumbnail({commit}, img){
      commit('setThumbnail', img)
    },
    sendCroppedThumbnail({commit}, img){
      commit('setCroppedThumbnail', img)
    },
    sendResetStateData({commit}){
      commit('resetStateData')
    }
  }
}
