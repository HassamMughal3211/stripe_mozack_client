import { createStore, applyMiddleware , combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginReducer from './reducers/authReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    debug: true
};

// const enhancer = compose(applyMiddleware(thunk));
const initialState = {};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    user : LoginReducer
  }));

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };