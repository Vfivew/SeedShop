const initialState = {
  deliveryMethod: '',
  isOrderPlaced: false,
};

const SET_DELIVERY_METHOD = 'SET_DELIVERY_METHOD';
const SET_IS_ORDER_PLACED = 'SET_IS_ORDER_PLACED';

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELIVERY_METHOD:
      return {
        ...state,
        deliveryMethod: action.payload,
      };
    case SET_IS_ORDER_PLACED:
      return {
        ...state,
        isOrderPlaced: action.payload,
      };
    default:
      return state;
  }
};

export const setDeliveryMethod = (method) => {
  return { type: SET_DELIVERY_METHOD, payload: method };
};

export const setIsOrderPlaced = (isPlaced) => {
  return { type: SET_IS_ORDER_PLACED, payload: isPlaced };
};

export default formReducer;