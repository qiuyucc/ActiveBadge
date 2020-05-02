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
        .then(avatars => dispatch(addAvatar(avatars)))
        .catch(error => dispatch(avatarFailed(error.message)))
};

export const avatarLoading = () => ({
    type: "AVATAR_LOADING",
});

export const avatarFailed = (errMess) => ({
    type: "AVATAR_FAILED",
    payload: errMess
});

export const addAvatar = (avatars) => ({
    type: "ADD_AVATAR",
    payload: avatars
});

export const fetchActivity = () => (dispatch) => {
    dispatch(activityLoading());
    return fetch(baseUrl + 'activity/fetch')
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
        .then(activities => dispatch(addActivity(activities)))
        .catch(error => dispatch(activityFailed(error.message)))
};

export const activityLoading = () => ({
    type: "ACTIVITY_LOADING",
});

export const activityFailed = (errMess) => ({
    type: "ACTIVITY_FAILED",
    payload: errMess
});

export const addActivity = (activities) => ({
    type: "ADD_ACTIVITY",
    payload: activities
});

export const fetchVegie = () => (dispatch) => {
    dispatch(vegieLoading());
    return fetch(baseUrl + 'vegie/fetch')
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
        .then(vegies => dispatch(addVegie(vegies)))
        .catch(error => dispatch(vegieFailed(error.message)))
};

export const vegieLoading = () => ({
    type: "VEGIE_LOADING",
});

export const vegieFailed = (errMess) => ({
    type: "VEGIE_FAILED",
    payload: errMess
});

export const addVegie = (vegies) => ({
    type: "ADD_VEGIE",
    payload: vegies
});