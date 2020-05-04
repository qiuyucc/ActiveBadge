import { combineReducers} from "redux";

const getAvatar =(state ={},action)=>{
    switch(action.type){

        case "AVATAR_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                avatarDetails:[],
                errors:null
            }
        case "ADD_AVATAR":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                avatarDetails:action.payload,
                errors:null
            }
        case "AVATAR_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                avatarDetails: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

export default combineReducers(
    {
        getAvatar
    });