import * as actionTypes from "../actions/action-types";

const initialState = {
  order: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: action.payload.orderId,
        orderData: {...action.payload.orderData}
      }
      return {
        ...state,
        isLoading: false,
        orders: state.orders.concat(newOrder)
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
