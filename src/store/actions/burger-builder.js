import * as actionTypes from "./action-types";
import axiosOrders from "../../axios-orders";

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ...payload,
    },
  };
};

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ...payload,
    },
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
}

export const initIngredients = () => {
  return dispatch => {
    axiosOrders
      .get("https://react-burger-builder-73765.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed())
      });
  }
}