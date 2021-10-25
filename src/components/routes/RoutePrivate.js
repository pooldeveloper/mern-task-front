import React,{useEffect, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoginContext from '../../context/login/LoginContext';


const RoutePrivate = ({component: Component, ...props}) => {

    const{load, auth, getUserAuth} = useContext(LoginContext)
    
    useEffect(() => {
        getUserAuth();
        //eslint-disable-next-line
    }, [])

    return (
        <Route {...props} render = {props => !auth && load ? (
            <Redirect to="/login"/>
        ) : (
            <Component {...props}/>
        )}/>
    );
}
 
export default RoutePrivate;