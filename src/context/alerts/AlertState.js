import React, { useReducer} from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import{
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types/index'

const AlertState = (props) => {
    const initialState ={
        alert: null
    }
    const[state, dispatch] = useReducer(AlertReducer, initialState)

    const showAlert = (msg, category) =>{
        dispatch({
            type: SHOW_ALERT,
            payload:{msg, category}
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }
    
    const hideAlert = ()=>{
        dispatch({
            type: HIDE_ALERT
        });
    }
    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert,
                hideAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
}
 
export default AlertState;