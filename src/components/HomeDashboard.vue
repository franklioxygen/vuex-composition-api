<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import {
  FETCH_USER_PROFILES,
  FETCH_FOOD_LIST,
  UPDATE_FOOD_TYPE,
} from "../../src/types/actions";
import { GET_SELECTED_USER } from "../../src/types/getters";

const store = useStore();
const profiles = computed(() => store.state.profiles);
const selectedUser = computed(() => store.state.selectedUser);
const foodList = computed(() => store.state.foodModule.foodList);
const state = ref({ editTarget: null });

onMounted(() => {
  // Actions(store/index) are used to dispatch data to backend Asynchronously
  store.dispatch(`${FETCH_USER_PROFILES}`);
});

// Getters are used to get data from the STATE in store
function onSelectUser(event) {
  const selectedUser = computed(() =>
    store.getters[GET_SELECTED_USER](event.target.value)
  ).value;
  store.state.selectedUser = selectedUser;
}
// Actions(store/store_modules/foodModules) are used to dispatch data to backend Asynchronously
function onClickGetFood() {
  store.dispatch(`foodModule/${FETCH_FOOD_LIST}`);
}
function saveFoodType(foodId, foodType) {
  store.dispatch(`foodModule/${UPDATE_FOOD_TYPE}`, {
    foodId,
    foodType,
  });
  state.value.editTarget = null;
}
function editFoodType(foodId) {
  state.value.editTarget = foodId;
}
</script>

<template>
  <h3>Who's at home?</h3>
  <select v-if="profiles" @change="onSelectUser">
    <option value="" selected disabled>Please select</option>
    <option
      v-for="(profile, index) in profiles"
      :key="index"
      :value="profile.id"
    >
      {{ profile.name }}
    </option>
  </select>
  <div v-if="selectedUser">
    {{ selectedUser.name }} is a {{ selectedUser.color }} cat.
  </div>

  <h3>What food we have?</h3>
  <button @click="onClickGetFood">Get food</button>
  <ul>
    <li v-for="(food, index) in foodList" :key="index">
      <button @click="editFoodType(food.id, food.foodType)">edit</button>
      {{ food.foodType }}
      <span v-show="state.editTarget === food.id">
        <input type="text" v-model="food.foodType" />
        <button @click="saveFoodType(food.id, food.foodType)">Save</button>
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
h3 {
  margin-top: 30px;
}
select {
  width: 200px;
}
button {
  width: 200px;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    button {
      width: 100px;
    }
    input {
      width: 100px;
    }
    button {
      width: 50px;
    }
  }
}
</style>
