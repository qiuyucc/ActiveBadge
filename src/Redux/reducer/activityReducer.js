import { combineReducers} from "redux";

const getActivity =(state ={},action)=>{
    switch(action.type){

        case "ACTIVITY_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                activityDetails:[],
                errors:null
            }
        case "ADD_ACTIVITY":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                activityDetails:action.payload,
                errors:null
            }
        case "ACTIVITY_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                activityDetails: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

export default combineReducers(
    {
        getActivity
    });