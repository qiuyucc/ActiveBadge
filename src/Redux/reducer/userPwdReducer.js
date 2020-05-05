import {combineReducers} from 'redux';

const forgetUser = (state = {}, action) => {
    switch (action.type) {
        case "FORGET_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "FORGET_USER_EMAIL_VERIFY_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                response: action.payload
            }
        case "FORGET_USER_EMAIL_VERIFY_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}
//generate the code
const forgetCreateCode = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_CODE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "CREATE_CODE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                response: action.payload
            }
        case "CREATE_CODE_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}
//verify user email in forget password function.
const forgetVerify = (state = {}, action) => {
    switch (action.type) {
        case "VERIFY_CODE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        // case "CREATE_CODE":
        //     return {
        //         isLoading: false,
        //         isError: false,
        //         isSuccess: true,
        //         errors: null,
        //         response: action.payload
        //     }
        case "VERIFY_CODE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                response: action.payload
            }
        case "VERIFY_CODE_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

//delete the code
const forgetDeleteCode = (state = {}, action) => {
    switch (action.type) {
        case "DELETE_CODE_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "DELETE_CODE_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                response: action.payload
            }
        case "DELETE_CODE_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

//generate the code
const forgetResetPwd = (state = {}, action) => {
    switch (action.type) {
        case "RESET_PWD_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "RESET_PWD_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
                response: action.payload
            }
        case "RESET_PWD_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

export default combineReducers({
    forgetUser,
    forgetCreateCode,
    forgetVerify,
    forgetDeleteCode,
    forgetResetPwd
});
