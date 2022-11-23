import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table_1: {},
    table_2: '',
  },
  getters: {
    FIRST_TABLE(state) { //геттер 
      return state.table_1;
    }

  },
  mutations: {
    SET_TABLE_TO_STATE: (state, payload) => { //мутация id
      state.table_1 = payload;
    }

  },
  actions: {
  },
  modules: {
  }
})
