import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    items: [],
    detailItem: {}
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions:{
    async getAllItem ({ commit, state }) {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': process.env.API_KEY,
          'username': process.env.USERNAME,
          'masterKey': true
        }
      })
      await commit('updateState', {
        items: data
      })
      // console.log('this is state',state.items)
      return data
    },
    async getItemDetail({commit}, payload){
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${payload}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': process.env.API_KEY,
          'username': process.env.USERNAME,
          'masterKey': true
        }
      })
      await commit('updateState', {
        detailItem: data
      })
    },
    async getSearchItem ({ commit }, payload) {
      const { searchText, searchTags } = payload
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search ',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': process.env.API_KEY,
          'username': process.env.USERNAME,
        },
        data:{
          'searchText': searchText,
          'searchTags': searchTags
        }
      })
      await commit('updateState', {
        items: data
      })
      return data
    }
  }
}
