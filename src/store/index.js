import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table_1: '',
    table_2: '',
    fileName_1: '',
    fileName_2: '',
    selected_1: '',
    selected_2: '',
    isSelected_1: '',
    isSelected_2: ''
  },
  getters: {
    FIRST_TABLE(state) { //геттер 
      return state.table_1;
    },
    SECOND_TABLE(state) {
      return state.table_2
    },


    FIRST_FILE(state) {
      return state.fileName_1
    },
    SECOND_FILE(state) {
      return state.fileName_2
    },

    SELECTED_PARAMS_1(state) {
      return state.selected_1
    },
    SELECTED_PARAMS_2(state) {
      return state.selected_2
    },


    IS_SLECTED_1(state) {
      return state.isSelected_1
    },
    IS_SLECTED_2(state) {
      return state.isSelected_2
    },


  },

  mutations: {
    SET_1_TABLE_TO_STATE: (state, payload) => { 
      state.table_1 = payload;
    },
    SET_2_TABLE_TO_STATE: (state, payload) => { 
      state.table_2 = payload;
    },


    SET_1_FILE_NAME: (state, payload) => { 
      state.fileName_1 = payload;
    },
    SET_2_FILE_NAME: (state, payload) => { 
      state.fileName_2 = payload;
    },


    SET_1_SELECTED_PARAMS: (state, payload) => { 
      state.selected_1 = payload;
    },
    SET_2_SELECTED_PARAMS: (state, payload) => { 
      state.selected_2 = payload;
    },
    IS_SELECTED_1: (state, payload) => { 
      state.isSelected_1 = payload;
    },
    IS_SELECTED_2: (state, payload) => { 
      state.isSelected_2 = payload;
    },

  },
  actions: {

  },
  modules: {
  }
})
