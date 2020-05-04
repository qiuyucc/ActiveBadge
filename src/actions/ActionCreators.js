const baseUrl = "http://localhost:3333/";

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

export const fetchActivityRecord = () => (dispatch) => {
    dispatch(activityRecordLoading());
    return fetch(baseUrl + 'activityrecord/record')
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
        .then(activitiesRecord => dispatch(addActivityRecord(activitiesRecord)))
        .catch(error => dispatch(activityRecordFailed(error.message)))
};

export const activityRecordLoading = () => ({
    type: "ACTIVITY_RECORD_LOADING",
});

export const activityRecordFailed = (errMess) => ({
    type: "ACTIVITY_RECORD_FAILED",
    payload: errMess
});

export const addActivityRecord = (activitiesRecord) => ({
    type: "ADD_ACTIVITY_RECORD",
    payload: activitiesRecord
});

export const postActivityRecord =(email, name, description, mins, date) =>(dispatch) =>{
    const newRecord={
        email:email,
        name:name,
        description:description,
        mins:mins,
        date:date
    };

    return fetch(baseUrl+'activityrecord/post',{
        method:'POST',
        body: JSON.stringify(newRecord),
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => dispatch(fetchActivityRecord(response)))
        .catch(error => { console.log('post activity record', error.message);
        alert('Your record cannot be posted\nError: ' + error.message); });
};



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



export const fetchVegieRecord = () => (dispatch) => {
    dispatch(vegieRecordLoading());
    return fetch(baseUrl + 'vegierecord/record')
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
        .then(vegiesRecord => dispatch(addVegieRecord(vegiesRecord)))
        .catch(error => dispatch(vegieRecordFailed(error.message)))
};

export const vegieRecordLoading = () => ({
    type: "VEGIE_RECORD_LOADING",
});

export const vegieRecordFailed = (errMess) => ({
    type: "VEGIE_RECORD_FAILED",
    payload: errMess
});

export const addVegieRecord = (vegiesRecord) => ({
    type: "ADD_VEGIE_RECORD",
    payload: vegiesRecord
});

export const postVegieRecord =(email, name, description, date,count) =>(dispatch) =>{
    const newRecord={
        email:email,
        name:name,
        description:description,
        date:date,
        count:count
    };

    return fetch(baseUrl+'vegierecord/post',{
        method:'POST',
        body: JSON.stringify(newRecord),
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => dispatch(fetchVegieRecord(response)))
        .catch(error => { console.log('post vegie record', error.message);
            alert('Your record cannot be posted\nError: ' + error.message); });
};
