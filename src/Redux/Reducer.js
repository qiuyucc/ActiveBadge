

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";
import avatarReducer from "./reducer/avatarReducer";
import activityReducer from "./reducer/activityReducer";
import vegieReducer from "./reducer/vegieReducer";
import userPwdReducer from "./reducer/userPwdReducer";

const reducers = {
    authReducer,
    userReducer,
    avatarReducer,
    activityReducer,
    vegieReducer,
    userPwdReducer,
    form: formReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

    if (action.type === "USER_LOGGED_OUT_SUCCESS") {
        state = {}
    }

    return appReducer(state, action);
}

export default rootReducer;
