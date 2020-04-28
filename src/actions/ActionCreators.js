const baseUrl = "http://172.27.243.241:3333/";

export const fetchAvatar = () => (dispatch) => {
    dispatch(avatarLoading());
    return fetch(baseUrl + 'avatar/fetch')
        .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    const error  = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message)
                throw errMess;
            })
        .then(response => response.json())
        .then(avatarDetails => dispatch(addAvatar(avatarDetails)))
        .catch(error => dispatch(avatarFailed(error.message)))
};

export const avatarLoading = () => ({
    type: "AVATAR_LOADING",
});

export const avatarFailed = (errMess) => ({
    type: "AVATAR_FAILED",
    payload: errMess
});

export const addAvatar = (avatarDetails) => ({
    type: "ADD_AVATAR",
    payload: avatarDetails
});

