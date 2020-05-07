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

const getActivityRecord =(state ={},action)=>{
    switch(action.type){

        case "ACTIVITY_RECORD_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                activityRecordDetails:[],
                errors:null
            }
        case "ADD_ACTIVITY_RECORD":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                activityRecordDetails:action.payload,
                errors:null
            }
        case "ACTIVITY_RECORD_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                activityRecordDetails: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

const getActivityRank =(state ={},action)=>{
    switch(action.type){

        case "ACTIVITY_RANK_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                activityRank:[],
                errors:null
            }
        case "ADD_ACTIVITY_RANK":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                activityRank:action.payload,
                errors:null
            }
        case "ACTIVITY_RANK_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                activityRank: null,
                errors:action.payload
            }
        default:
            return state;
    }
}
export default combineReducers(
    {
        getActivity,
        getActivityRecord,
        getActivityRank
    });