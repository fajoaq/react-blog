import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import PostsReducer from '../reducers/posts';
import userReducer from '../reducers/users';
import filtersReducer from '../reducers/filters';
import modalReducer from '../reducers/modal';

//WE ENABLE ACTION TRACING- DISABLE WHEN NOT TESTING FOR PERFORMANCE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose; */

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      postList: PostsReducer,
      userList: userReducer,
      filters: filtersReducer,
      modal: modalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};