import homeApi from '@/api/home.js'

// state
const state = {
  list: [] // 列表数据
}

// getters
const getters = {

}

// actions
const actions = {
  // 获取列表数据
  async listGet (context) {
    const res = await homeApi.getList()
    context.commit('listUpdate', res)
    return res
  }
}

// mutations
const mutations = {
  // 更新列表数据
  listUpdate (state, payload) {
    state.list = payload.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
