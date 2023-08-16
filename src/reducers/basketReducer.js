const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY_IN_CART = 'UPDATE_QUANTITY_IN_CART';

const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems: initialCartItems,
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = {
        product: action.payload.product,
        quantity: action.payload.quantity,
        totalPrice: action.payload.product.price * action.payload.quantity,
      };
    
      const existingItemIndex = state.cartItems.findIndex(item => item.product.id === newItem.product.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cartItems];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        updatedCart[existingItemIndex].totalPrice += newItem.totalPrice;

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        return {
          ...state,
          cartItems: updatedCart,
        };
      } else {
        // Add the new item to the cart
        const updatedCart = [...state.cartItems, newItem];

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        return {
          ...state,
          cartItems: updatedCart,
        };
      }

    case REMOVE_FROM_CART:
      const updatedCartAfterRemove = state.cartItems.filter(item => item.product !== action.payload.product);

      localStorage.setItem('cartItems', JSON.stringify(updatedCartAfterRemove));

      return {
        ...state,
        cartItems: updatedCartAfterRemove,
      };

    case UPDATE_QUANTITY_IN_CART:
      const updatedCartWithUpdatedQuantity = state.cartItems.map(item =>
        item.product === action.payload.product
          ? { ...item, quantity: action.payload.quantity, totalPrice: item.product.price * action.payload.quantity }
          : item
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedCartWithUpdatedQuantity));

      return {
        ...state,
        cartItems: updatedCartWithUpdatedQuantity,
    };

    default:
      return state;
  }
};

export const addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: { product },
});

export const updateQuantityInCart = (product, quantity) => ({
  type: UPDATE_QUANTITY_IN_CART,
  payload: { product, quantity },
});

export default basketReducer;