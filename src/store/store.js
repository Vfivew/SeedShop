import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productsReducer';
import seedVegetableReducer from '../reducers/SeedProductReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  seedVegetable: seedVegetableReducer, 
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;