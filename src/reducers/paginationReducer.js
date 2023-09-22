const initialState = {
  currentPage: 1,
  itemsPerPage: 9,
};

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export const setCurrentPage = (page) => {
  return { type: SET_CURRENT_PAGE, payload: page };
};

export default paginationReducer;