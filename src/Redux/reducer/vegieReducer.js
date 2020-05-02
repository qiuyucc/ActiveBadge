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

export default combineReducers(
    {
        getVegie
    });