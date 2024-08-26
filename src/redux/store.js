import { combineReducers, configureStore } from '@reduxjs/toolkit';
import memberReducer from './actionReducer';
const rootReducer = combineReducers({
  members: memberReducer,
});

const store = configureStore({
  reducer: rootReducer, 
});;

export default store;