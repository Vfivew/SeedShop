const initialState = {
  filters: {
    hit: false,
    new: false,
    discount: false,
    selectedProducer: "",
    selectedProductTypes: [],
  },
  sortBy: "",
};

const SET_SEED_FILTERS = "SET_SEED_FILTERS";
const SET_SEED_PRODUCER_FILTER = "SET_SEED_PRODUCER_FILTER";
const SET_SEED_SORT = "SET_SEED_SORT";
const TOGGLE_FILTER_HIT = "TOGGLE_FILTER_HIT";
const TOGGLE_FILTER_NEW = "TOGGLE_FILTER_NEW";
const TOGGLE_FILTER_DISCOUNT = "TOGGLE_FILTER_DISCOUNT";
const RESET_SEED_FILTERS = "RESET_SEED_FILTERS";
const SET_CURRENT_FILTERS = "SET_CURRENT_FILTERS";

const seedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SEED_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
      };
    case SET_SEED_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_SEED_PRODUCER_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedProducer: action.payload,
        },
      };
    case SET_SEED_SORT:
      return {
        ...state,
        sortBy: action.payload,
      };
    case TOGGLE_FILTER_HIT:
      return {
        ...state,
        filters: {
          ...state.filters,
          hit: !state.filters.hit,
        },
      };
    case TOGGLE_FILTER_NEW:
      return {
        ...state,
        filters: {
          ...state.filters,
          new: !state.filters.new,
        },
      };
    case TOGGLE_FILTER_DISCOUNT:
      return {
        ...state,
        filters: {
          ...state.filters,
          discount: !state.filters.discount,
        },
      };
    case SET_CURRENT_FILTERS:
      return {
        ...state,
        filters: action.payload,
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

export const resetSeedFilters = () => {
  return { type: RESET_SEED_FILTERS };
};

export const setCurrentFilters = (filters) => {
  return { type: SET_CURRENT_FILTERS, payload: filters };
};

export default seedProductReducer;
