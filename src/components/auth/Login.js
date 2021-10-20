import { React, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertContext from "../../context/alerts/AlertContext";
import LoginContext from "../../context/login/LoginContext";
import PWAButton from "../layout/PWAButton";

const Login = () => {
  const history = useHistory();
  const { alert, showAlert } = useContext(AlertContext);
  const { messageError, auth, login } = useContext(LoginContext);

  useEffect(() => {
    document.title = "Iniciar sesión";
    if (auth) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [messageError, auth]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //State para iniciar sesion
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //Extraer valores destructuring de user
  const { email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar campos ''
    if (email.trim() === "") {
      showAlert("Ingresa su email", "alert alert-error");
      return;
    }
    if (password.trim() === "") {
      showAlert("Ingrese su contraseña", "alert alert-error");
      return;
    }
    //Pasar al action
    login(user);
  };
  return (
    <div className="form-usuario">
      {alert ? <p className={alert.category}>{alert.msg}</p> : null}
      {messageError ? (
        <p className="alert alert-error">{messageError}</p>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>
          MERN<span>Tasks</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              className="btn btn-primario btn-block"
              type="submit"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link className="enlace-cuenta" to={"/nueva-cuenta"}>
          Obtener cuenta
        </Link>
        <div className="wrap-btn-pwa">
          <PWAButton
            styles={'btn btn-primario btn-pwa'}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
