import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

   fileNames: { //модуль имён файлов
    state: {
      fileName_1: '',
      fileName_2: '',
    },
    getters: {
      FIRST_FILE(state) {
        return state.fileName_1
      },
      SECOND_FILE(state) {
        return state.fileName_2
      },
    },
    mutations: {
      SET_1_FILE_NAME: (state, payload) => { 
        state.fileName_1 = payload;
      },
      SET_2_FILE_NAME: (state, payload) => { 
        state.fileName_2 = payload;
      },
    }
   },


   tables: { //модуль полученных данных из таблиц
    state: {
      table_1: '',
      table_2: '',
    },
    getters: {
      FIRST_TABLE(state) { 
        return state.table_1;
      },
      SECOND_TABLE(state) {
        return state.table_2
      },
    },
    mutations: {
      SET_1_TABLE_TO_STATE: (state, payload) => { 
        state.table_1 = payload;
      },
      SET_2_TABLE_TO_STATE: (state, payload) => { 
        state.table_2 = payload;
      },
    }
   },


   selectedParams: { //модуль выбранных параметров для сравнения
    state: {
      selected_1: '',
      selected_2: '',
    },
    getters: {
      SELECTED_PARAMS_1(state) {
        return state.selected_1
      },
      SELECTED_PARAMS_2(state) {
        return state.selected_2
      },
    },
    mutations: {
      SET_1_SELECTED_PARAMS: (state, payload) => { 
        state.selected_1 = payload;
      },
      SET_2_SELECTED_PARAMS: (state, payload) => { 
        state.selected_2 = payload;
      },
    }
   },

   warnings: {
    state: {
      isShow_1: '',
      isShow_2: '',
    },
    getters: {
      WARNING_1(state) {
        return state.isShow_1
      },
      WARNING_2(state) {
        return state.isShow_2
      },
    },
    mutations: {
      SET_WARNING_1: (state, payload) => { 
        state.isShow_1 = payload;
      },
      SET_WARNING_2: (state, payload) => { 
        state.isShow_2 = payload;
      },
    },
   }
   
  }
})
