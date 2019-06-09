import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    privilege: 0 // 权限 注意:组件中this.$store.state.privilege返回的是一个Object对象而不是这个值
  },
  mutations: {
    'SET_PRIVILEGE': (state, newPrivilege) => {
      state.privilege = newPrivilege
    }
  },
  actions: {
    setPrivilege({ commit }, newPrivilege) {
      return commit('SET_PRIVILEGE', newPrivilege)
    }
  }
})
