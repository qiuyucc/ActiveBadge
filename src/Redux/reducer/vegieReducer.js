import { combineReducers} from "redux";

const getVegie =(state ={},action)=>{
    switch(action.type){

        case "VEGIE_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                vegieDetails:[],
                errors:null
            }
        case "ADD_VEGIE":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                vegieDetails:action.payload,
                errors:null
            }
        case "VEGIE_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                vegieDetails: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

const getVegieRecord =(state ={},action)=>{
    switch(action.type){

        case "VEGIE_RECORD_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                vegieRecordDetails:[],
                errors:null
            }
        case "ADD_VEGIE_RECORD":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                vegieRecordDetails:action.payload,
                errors:null
            }
        case "VEGIE_RECORD_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                vegieRecordDetails: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

const getVegieRank =(state ={},action)=>{
    switch(action.type){

        case "VEGIE_RANK_LOADING":
            return {
                isLoading:true,
                isError: false,
                isSuccess:false,
                vegieRank:[],
                errors:null
            }
        case "ADD_VEGIE_RANK":
            return {
                isLoading:false,
                isError:false,
                isSuccess:true,
                vegieRank:action.payload,
                errors:null
            }
        case "VEGIE_RANK_FAILED":
            return {
                isLoading:false,
                isError: true,
                isSuccess: false,
                vegieRank: null,
                errors:action.payload
            }
        default:
            return state;
    }
}

export default combineReducers(
    {
        getVegie,
        getVegieRecord,
        getVegieRank
    });