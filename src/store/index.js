import { createStore } from "vuex";

import axios from "axios";

import { FETCH_USER_PROFILES } from "../types/actions";
import { SET_USER_PROFILE } from "../types/mutations";
import { GET_SELECTED_USER } from "../types/getters";
import foodModule from "./store_modules/foodModule";
import { serverApi } from "../const";

export default createStore({
  namespaced: true,
  state() {
    return {
      profiles: [],
      selectedUser: null,
    };
  },
  modules: {
    foodModule,
  },
  actions: {
    async [FETCH_USER_PROFILES]({ commit }, userId) {
      try {
        const { data } = await axios.get(`${serverApi}/user`);
        commit(SET_USER_PROFILE, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    [SET_USER_PROFILE](state, profiles) {
      state.profiles = profiles;
    },
  },
  getters: {
    [GET_SELECTED_USER]: (state) => (id) => {
      return state.profiles.find((profile) => profile.id == id);
    },
  },
});
