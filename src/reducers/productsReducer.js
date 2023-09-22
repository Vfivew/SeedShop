const initialState = {
  products: [],
  sortBy: 'sold',
  filterDiscount: false,
  filterNew: false,
  activeButton: 'sold'
};

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SORT_BY = 'SET_SORT_BY'
const TOGGLE_FILTER_DISCOUNT = 'TOGGLE_FILTER_DISCOUNT'
const TOGGLE_FILTER_NEW ='TOGGLE_FILTER_NEW'

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        activeButton: action.payload,
      };
    case TOGGLE_FILTER_DISCOUNT:
      return {
        ...state,
        filterDiscount: !state.filterDiscount,
      };
    case TOGGLE_FILTER_NEW:
      return {
        ...state,
        filterNew: !state.filterNew,
      };
    default:
      return state;
  }
};

export const setProducts = (payload) => ({type: SET_PRODUCTS, payload });
export const setSortBy = (sortBy) => ({ type: SET_SORT_BY, payload: sortBy });
export const toggleFilterDiscount = () => ({ type: TOGGLE_FILTER_DISCOUNT });
export const toggleFilterNew = () => ({ type: TOGGLE_FILTER_NEW });

export default productsReducer;