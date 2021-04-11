import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// {{ $store.state.count }}任意位置可以访问
export default new Vuex.Store({
  state: {
    count: 0
  },
  // this.$store.commit('jia)调用
  // 同步
  mutations: {
    jia (state, payload) {
      // setTimeout(() => {
      state.count = payload
      // }, payload.delay)
    }
  },
  // 异步 jiaHandle功能相同的对象jia
  actions: {
    jiaHandle (context, payload) {
      setTimeout(() => {
        context.commit('jia', payload.count)
      }, payload.delay)
    }
  },
  modules: {
  }
})
