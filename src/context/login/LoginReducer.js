import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGN_OFF,
    GET_USER,
    RESET_PWD,
    NEW_USER_SUCCESS,
    NEW_USER_ERROR
} from '../../types/index';

const LoginReducer = (state, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case NEW_USER_SUCCESS:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                load: true,
                auth: true,
            }
        case LOGIN_ERROR:
        case NEW_USER_ERROR:
        case SIGN_OFF: 
            localStorage.removeItem('token')
            return{
                ...state,
                load:false,
                auth: null,
                token: null,
                user: null,
                messageError: action.payload
            }
        case GET_USER:
            return{
                ...state,
                load:false,
                auth: true,
                user: action.payload
            }
        case RESET_PWD:
            return{
                ...state,
                redirectLogin: true,
                rpSuccess: action.payload
            }
        default:
            return state;
    }
}
 
export default LoginReducer;