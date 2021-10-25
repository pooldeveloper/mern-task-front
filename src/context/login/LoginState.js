import React, { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";
import clientAxios from "../../config/clientAxios";
import tokenAuth from "../../config/tokenAuth";
import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OFF,
  GET_USER,
  RESET_PWD,
  NEW_USER_SUCCESS,
  NEW_USER_ERROR,
} from "../../types";

const LoginState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: false,
    messageError: null,
    user: null,
    load: false,
    rpSuccess: null,
    redirectLogin: false,
  };

  const [state, dispatch] = useReducer(LoginReducer, initialState);

  //Funciones dispatch
  //payload es para cambiar el state en reducer

  //Iniciar sesion
  const login = async (user) => {
    try {
      const result = await clientAxios.post("/api/login", user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data.token,
      });
      getUserAuth();
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: LOGIN_ERROR,
          payload: null,
        });
      }, 5000);
    }
  };

  //Obtener ifo de usuario y registrar token en tokenAuth
  const getUserAuth = async () => {
    const token = localStorage.getItem("token");
    if(token){
      //Funcion para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const response = await clientAxios.get("/api/login");
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Nuevo usuario
  const newUser = async (user) => {
    try {
      const result = await clientAxios.post("/api/users", user);
      dispatch({
        type: NEW_USER_SUCCESS,
        payload: result.data.token,
      });
      getUserAuth();
    } catch (error) {
      dispatch({
        type: NEW_USER_ERROR,
        payload: error.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: NEW_USER_ERROR,
          payload: null,
        });
      }, 5000);
    }
  };

  //Cerrar sesion
  const signOff = () => {
    dispatch({
      type: SIGN_OFF,
    });
  };

  //Restaurar contraseña
  const resetPwd = async (user) => {
    try {
      const result = await axios.post(`/api/reset-pwd`, user);
      dispatch({
        type: RESET_PWD,
        payload: result.data,
      });
      setTimeout(() => {
        dispatch({
          type: RESET_PWD,
          payload: null,
        });
      }, 5000);
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: LOGIN_ERROR,
          payload: null,
        });
      }, 5000);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        messageError: state.messageError,
        auth: state.auth,
        user: state.user,
        load: state.load,
        rpSuccess: state.rpSuccess,
        redirectLogin: state.redirectLogin,
        login,
        getUserAuth,
        signOff,
        resetPwd,
        newUser,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
