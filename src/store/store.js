import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productsReducer';
import seedProductReducer from '../reducers/SeedProductReducer';
import basketReducer from '../reducers/basketReducer'

const rootReducer = combineReducers({
  products: productsReducer,
  seedProduct: seedProductReducer, 
  basket: basketReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;