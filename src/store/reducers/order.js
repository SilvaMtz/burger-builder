import * as actionTypes from "../actions/action-types";

const initialState = {
  orders: [],
  isLoading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log(action);
      const newOrder = {
        id: action.payload.orderId,
        orderData: { ...action.payload.orderData },
      };
      return {
        ...state,
        isLoading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        isLoading: false,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
