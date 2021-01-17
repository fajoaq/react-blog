import { persistStore, persistCombineReducers } from 'redux-persist'
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage' 
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import draftsReducer from '../reducers/drafts'
import PostsReducer from '../reducers/posts';
import filtersReducer from '../reducers/filters';
import modalReducer from '../reducers/modal';
import errorReducer  from '../reducers/error';

//WE ENABLE ACTION TRACING WHEN TESTING- DISABLE WHEN NOT TESTING FOR PERFORMANCE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose; */

const persistConfig = {
  key: 'root',
  storage
}


export default () => {
  const rootReducer = {
    auth: authReducer,
    postList: PostsReducer,
    draftList: draftsReducer,
    filters: filtersReducer,
    modal: modalReducer,
    errors: errorReducer
  };

  const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

  const store = createStore(persistCombinedReducers,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  const persistor = persistStore(store);

  return {store, persistor};
};