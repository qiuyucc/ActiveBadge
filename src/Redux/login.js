import * as ActionTypes from './ActionTypes';

const initial_state = {
    auth_checked: false,
    already_logged: false,
    loaded_from_login: false
}

//Reducers
export default function AppReducer (state = initial_state, action){
    switch (action.type) {
        case ActionTypes.LOGOUT:
            return { ...state, already_logged: false };
        case ActionTypes.LOGIN:
            return { ...state, already_logged: true };
        case ActionTypes.LOADED_FROM_LOGIN:
            return { ...state, loaded_from_login: true };
        case ActionTypes.AUTH_CHECKED:
            return { ...state, auth_checked: true };
        default:
            return state;
    }
}









// export const login = (state = {
//     isLoading: true,
//     errMess: null,
//     login1: []
// }, action) => {
//     switch (action.type) {
//         case ActionTypes.LOGIN_LOADING:
//             return {...state, isLoading: false, errMess: null, login1: action.payload}
//         case ActionTypes.LOGIN_SUCCESS:
//             return {...state, isLoading: false, errMess: null, login1: action.payload};
//         case ActionTypes.LOGIN_FAILED:
//             return {...state, isLoading: false, errMess: action.payload};
//
//         default:
//             return state;
//     }
// };
