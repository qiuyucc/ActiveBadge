import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import login from "./login";
import dashboardReducer from "./dashboardReducer";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           // dishes,
            appState: login,
            dashboardState: dashboardReducer,

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
