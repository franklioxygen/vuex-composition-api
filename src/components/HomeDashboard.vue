<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import {
  FETCH_USER_PROFILES,
  FETCH_FOOD_LIST,
  UPDATE_FOOD_TYPE,
} from "../../src/types/actions";
import { GET_SELECTED_USER } from "../../src/types/getters";

import { useStore } from "vuex";
const store = useStore();
const profiles = computed(() => store.state.profiles);
const selectedUser = computed(() => store.state.selectedUser);
const foodList = computed(() => store.state.foodModule.foodList);
const state = ref({ editTarget: null });
onMounted(() => {
  store.dispatch(`${FETCH_USER_PROFILES}`);
});
function onSelectUser(event) {
  const selectedUser = computed(() =>
    store.getters[GET_SELECTED_USER](event.target.value)
  ).value;
  store.state.selectedUser = selectedUser;
}
function onClickGetFood() {
  store.dispatch(`foodModule/${FETCH_FOOD_LIST}`);
}
function editFoodType(foodId) {
  state.value.editTarget = foodId;
}
function saveFoodType(foodId, foodType) {
  store.dispatch(`foodModule/${UPDATE_FOOD_TYPE}`, {
    foodId,
    foodType,
  });
  state.value.editTarget = null;
}
</script>

<template>
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
  <p>---</p>
  <button @click="onClickGetFood">Get food</button>
  <ul style="list-style-type: none">
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
