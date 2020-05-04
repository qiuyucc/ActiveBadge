import {fetchApi} from "../service/api";

//forget password function, verify the user input email.
export const forgetUser = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "FORGET_USER_LOADING"
            });
            const response = await fetchApi("reset/user_rest", "POST", payload, 200);
            if (response.success) {
                dispatch({
                    type: "FORGET_USER_EMAIL_VERIFY_SUCCESS",
                    payload:response.responseBody
                });
                return response;
            } else {
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "FORGET_USER_EMAIL_VERIFY_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}
//for create code
export const forgetCreateCode = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "CREATE_CODE_LOADING"
            });
            const response = await fetchApi("reset/forget_code_create", "POST", payload, 200);
            if (response.success) {
                dispatch({
                    type: "CREATE_CODE_SUCCESS",
                    payload:response.responseBody
                });
                return response;
            } else {
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "CREATE_CODE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}
///forget password function, user input code verify.
export const forgetVerify = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "VERIFY_CODE_LOADING"
            });
            const response = await fetchApi("reset/verify_code", "POST", payload, 200);
            if (response.success) {
                dispatch({
                    type: "VERIFY_CODE_SUCCESS",
                    payload:response.responseBody
                });
                return response;
            } else {
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "VERIFY_CODE_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

///forget password function, user input code verify.
export const forgetResetPwd = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "RESET_PWD_LOADING"
            });
            const response = await fetchApi("reset/updatePwd", "POST", payload, 200);
            if (response.success) {
                dispatch({
                    type: "RESET_PWD_SUCCESS",
                    payload:response.responseBody
                });
                return response;
            } else {
                throw response;
            }
        } catch (error) {
            dispatch({
                type: "RESET_PWD_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}
