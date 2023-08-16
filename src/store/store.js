import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productsReducer';
import seedProductReducer from '../reducers/SeedProductReducer';
import productsDetailsReducer from '../reducers/productsDetailsReducer';
import basketReducer from '../reducers/basketReducer'

const rootReducer = combineReducers({
  products: productsReducer,
  seedProduct: seedProductReducer, 
  basket: basketReducer,
  productsDetailsReducer: productsDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;