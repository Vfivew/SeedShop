const initialState = {
  filters: {
    hit: false,
    new: false,
    discount: false,
    selectedProducer: '',
    selectedProductTypes: []
  },
  sortBy: '', 
};

const SET_SEED_FILTERS = 'SET_SEED_FILTERS';
const SET_SEED_PRODUCER_FILTER = 'SET_SEED_PRODUCER_FILTER';
const SET_SEED_SORT = 'SET_SEED_SORT';
const TOGGLE_FILTER_HIT = 'TOGGLE_FILTER_HIT';
const TOGGLE_FILTER_NEW = 'TOGGLE_FILTER_NEW';
const TOGGLE_FILTER_DISCOUNT = 'TOGGLE_FILTER_DISCOUNT';

const seedVegetableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEED_FILTERS:
      console.log('1')
      return {
        ...state,
        filters: action.payload,
      };
    case SET_SEED_PRODUCER_FILTER:
       console.log('2')
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedProducer: action.payload,
        },
      };
    case SET_SEED_SORT:
       console.log('3')
      return {
        ...state,
        sortBy: action.payload,
      };
    case TOGGLE_FILTER_HIT:
       console.log('4')
      return {
        ...state,
        filters: {
          ...state.filters,
          hit: !state.filters.hit,
        },
      };
    case TOGGLE_FILTER_NEW:
       console.log('5')
      return {
        ...state,
        filters: {
          ...state.filters,
          new: !state.filters.new,
        },
      };
    case TOGGLE_FILTER_DISCOUNT:
       console.log('6')
      return {
        ...state,
        filters: {
          ...state.filters,
          discount: !state.filters.discount,
        },
      };
    default:
      return state;
  }
};

export const setSeedFilters = (filters) => {
  return { type: SET_SEED_FILTERS, payload: filters };
};

export const setSeedProducerFilter = (producer) => {
  return { type: SET_SEED_PRODUCER_FILTER, payload: producer };
};

export const setSeedSort = (sortMethod) => {
  return { type: SET_SEED_SORT, payload: sortMethod };
};

export const toggleFilterHit = () => {
  return { type: TOGGLE_FILTER_HIT };
};

export const toggleFilterNew = () => {
  return { type: TOGGLE_FILTER_NEW };
};

export const toggleFilterDiscount = () => {
  return { type: TOGGLE_FILTER_DISCOUNT };
};

export default seedVegetableReducer;