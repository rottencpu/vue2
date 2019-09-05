import Cookies from 'js-cookie'

const app = {
  state: {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
    devices: JSON.parse(localStorage.getItem('devices')) || {}
  },
  mutations: {
    SET_USER_INFO: (state, params) => {
      // 设置过期时间6天，服务器为7天
      Cookies.set('userInfo', params, { expires: 6 })
      state.userInfo = params
    },
    DEL_USER_INFO: state => {
      Cookies.remove('userInfo')
      state.userInfo = null
    },
    SET_DEVICES: (state, params) => {
      const _state = state
      _state[params.key] = params.value
      localStorage.setItem('devices', JSON.stringify(_state))
      state = _state
    }
  },
  actions: {
    setUserInfo({ commit }, params) {
      commit('SET_USER_INFO', params)
    },
    delUserInfo({ commit }) {
      commit('DEL_USER_INFO')
    },
    setDevices({ commit }, params) {
      commit('SET_DEVICES', params)
    }
  }
}

export default app
