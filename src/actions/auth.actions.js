import {fetchApi} from "../service/api";
const baseUrl = "http://172.27.243.241:3333/";

export const createNewUser = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({
                type: "CREATE_USER_LOADING"
            });
            //user/create
            const response = await fetchApi("user/create", "POST", payload, 200);

            if(response.success) {
                dispatch({
                    type: "CREAT_USER_SUCCESS"
                });
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response.token
                });
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });

                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "CREAT_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const changeAvatar = (image) => {
    return async (dispatch, getState) => {
        const state = getState();
    const newAvatar={
        image:image
    };

        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: "UPDATE_USER_LOADING"
            });
            //user/create
            const response = await fetchApi("user/avatar", "POST", newAvatar, 200,token);

            if(response.success) {
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });

                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const updatePoint = (point) => {
    return async (dispatch, getState) => {
        const state = getState();
        const newPiont={
            point:point
        };

        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: "UPDATE_USER_LOADING"
            });
            //user/create
            const response = await fetchApi("user/point", "POST", newPiont, 200,token);

            if(response.success) {
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });

                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const updateProfile = (age, gender,states,suburb) => {
    return async (dispatch, getState) => {
        const state = getState();
        const userProfile={
            age:age,
            gender:gender,
            state:states,
            suburb:suburb
        };

        try {
            const {authReducer: {authData: {token}}} = state;
            dispatch({
                type: "UPDATE_USER_LOADING"
            });
            //user/create
            const response = await fetchApi("user/profile", "POST", userProfile, 200,token);

            if(response.success) {
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const loginUser = (payload) => {

    return async (dispatch) => {

        try {
            dispatch({
                type: "LOGIN_USER_LOADING"
            });
            //user/login
            const response = await fetchApi("user/login", "POST", payload, 200);

            if(response.success) {
                dispatch({
                    type: "LOGIN_USER_SUCCESS",
                });
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response.token
                });
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            } else {
                throw response;
            }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const {authReducer: {authData: {token}}} = state;
            console.log(token);
            const response = await fetchApi("user/logout", "DELETE", null, 200, token);
            console.log(response);
            dispatch({
                type: "USER_LOGGED_OUT_SUCCESS"
            });
        } catch (e) {
            console.log(e);
        }
    }
}
