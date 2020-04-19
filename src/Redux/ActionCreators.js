import * as ActionTypes from './ActionTypes';
import {baseUrl} from './baseUrl';

// export const fetchDishes = () => (dispatch) => {
//     //dispatch(dishesLoading());
//     return fetch(baseUrl + 'dishes')
//         .then(response => {
//                 if (response.ok) {
//                     return response;
//                 } else {
//                     var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                     error.response = response;
//                     throw error;
//                 }
//             },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(dishes => dispatch(dishesLoading(dishes)))
//         .catch(error => dispatch(dishesFailed(error.message)));
// };
// export const dishesLoading = (dishes) => ({
//     type: ActionTypes.DISHES_LOADING,
//     payload: dishes
// });
// export const addDishes = (dishes) => ({
//     type: ActionTypes.ADD_DISHES,
//     payload: dishes
// });
// export const dishesFailed = (errmess) => ({
//     type: ActionTypes.DISHES_FAILED,
//     payload: errmess
// });
export const fetchLogin = (username, pwd) => (dispatch) => {
    //dispatch(LoginLoading());
    return fetch(baseUrl + 'login')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': aaaaa' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(  login =>  dispatch(LoginLoading(login))
            // {
            //     const user = dispatch(LoginLoading(login)).login.login1.filter((user) => user.username = username);
            //     if (pwd === user.login.login1[0].username) {
            //         dispatch(LoginSuccess('Success'));
            //     } else {
            //         dispatch(LoginPwdFailed('Login failed.'))
            //     }
            // }
        )
        .catch(error => dispatch(LoginPwdFailed(error.message)));
};
export const LoginLoading = (login) => ({
    type: ActionTypes.LOGIN_LOADING,
    payload: login
});
export const LoginSuccess = (login) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: login
});
export const LoginPwdFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

//for Login token
export const actionCreator = (type, payload = null) => ({ type, payload });
