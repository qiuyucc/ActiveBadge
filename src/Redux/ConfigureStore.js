import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {AsyncStorage} from "react-native";
import { persistStore, persistReducer} from "redux-persist";
import reducers from './Reducer';

const persistConfig={
    key:'root',
   storage:AsyncStorage,
    whitelist: ["authReducer", "userReducer"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default() => {
    let store = createStore(
        persistedReducer,{},
        applyMiddleware(thunk, logger)
    );
    let persistor = persistStore(store);

    return {store, persistor};
}
