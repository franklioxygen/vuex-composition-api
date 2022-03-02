import axios from "axios";
import { FETCH_FOOD_LIST } from "../../types/actions";
import { SET_FOOD_LIST } from "../../types/mutations";
import { serverApi } from "../../const";

export default {
  namespaced: true,
  state() {
    return {
      foodList: [],
    };
  },
  actions: {
    async [FETCH_FOOD_LIST]({ commit }, userId) {
      try {
        const { data } = await axios.get(`${serverApi}/food`);
        commit(SET_FOOD_LIST, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    [SET_FOOD_LIST](state, foodList) {
      state.foodList = foodList;
    },
  },
};
