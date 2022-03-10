import axios from "axios";
import { FETCH_FOOD_LIST, UPDATE_FOOD_TYPE } from "../../types/actions";
import { SET_FOOD_LIST, SET_FOOD_TYPE } from "../../types/mutations";
import { SERVER_API } from "../../const";

export default {
  namespaced: true,
  state() {
    return {
      foodList: [],
    };
  },
  // Actions are used to dispatch data to backend Asynchronously
  actions: {
    async [FETCH_FOOD_LIST]({ commit }) {
      try {
        const { data } = await axios.get(`${SERVER_API}/food`);
        commit(SET_FOOD_LIST, data);
      } catch (error) {
        console.log(error);
      }
    },
    async [UPDATE_FOOD_TYPE]({ commit }, { foodId, foodType }) {
      try {
        await axios
          .put(`${SERVER_API}/food/${foodId}`, {
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
  // Mutations are used to commit the STATE of store
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
