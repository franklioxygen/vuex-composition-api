import { createStore } from "vuex";

import axios from "axios";

import foodModule from "./store_modules/foodModule";
import { FETCH_USER_PROFILES } from "../types/actions";
import { SET_USER_PROFILE } from "../types/mutations";
import { GET_SELECTED_USER } from "../types/getters";
import { SERVER_API } from "../const";

// creat store
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
  // Actions are used to dispatch data to backend Asynchronously
  actions: {
    async [FETCH_USER_PROFILES]({ commit }) {
      try {
        const { data } = await axios.get(`${SERVER_API}/user`);
        // Commit response to the STATE of store
        commit(SET_USER_PROFILE, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  // Mutations are used to commit the STATE of store
  mutations: {
    [SET_USER_PROFILE](state, profiles) {
      state.profiles = profiles;
    },
  },
  // Getters are used to get data from the STATE in store
  getters: {
    [GET_SELECTED_USER]: (state) => (id) => {
      return state.profiles.find((profile) => profile.id == id);
    },
  },
});
