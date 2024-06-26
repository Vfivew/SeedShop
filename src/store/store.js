import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import productsReducer from "../reducers/productsReducer";
import basketReducer from "../reducers/basketReducer";
import paginationReducer from "../reducers/paginationReducer";
import formReducer from "../reducers/formReducer";
import seedProductReducer from "../reducers/SeedProductReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  seedProduct: seedProductReducer,
  basket: basketReducer,
  pagination: paginationReducer,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
