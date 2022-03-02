import axios from "axios";
import { FETCH_FOOD_LIST, UPDATE_FOOD_TYPE } from "../../types/actions";
import { SET_FOOD_LIST, SET_FOOD_TYPE } from "../../types/mutations";
import { serverApi } from "../../const";

export default {
  namespaced: true,
  state() {
    return {
      foodList: [],
    };
  },
  actions: {
    async [FETCH_FOOD_LIST]({ commit }) {
      try {
        const { data } = await axios.get(`${serverApi}/food`);
        commit(SET_FOOD_LIST, data);
      } catch (error) {
        console.log(error);
      }
    },
    async [UPDATE_FOOD_TYPE]({ commit }, { foodId, foodType }) {
      try {
        await axios
          .put(`${serverApi}/food/${foodId}`, {
            foodType: foodType,
          })
          .then((response) => {
            console.log(response);
          });
        commit(SET_FOOD_TYPE, { foodId, foodType });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    [SET_FOOD_LIST](state, foodList) {
      state.foodList = foodList;
    },
    [SET_FOOD_TYPE](state, { foodId, foodType }) {
      let food = state.foodList.find((food) => food.id == foodId);
      food.foodType = foodType;
    },
  },
};
