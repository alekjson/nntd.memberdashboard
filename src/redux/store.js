import { combineReducers } from '@reduxjs/toolkit';
import memberReducer from './actionReducer';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit'; 
import { all } from 'redux-saga/effects'; 
import { watchMemberSagas } from './actionSaga'; 


const rootReducer = combineReducers({
  members: memberReducer,
});


function* rootSaga() {
  yield all([
    watchMemberSagas(), 
  ]);
}


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);

export default store;
