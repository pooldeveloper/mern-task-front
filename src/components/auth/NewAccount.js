import { React, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertContext from "../../context/alerts/AlertContext";
import LoginContext from "../../context/login/LoginContext";
import PWAButton from "../layout/PWAButton";


const NewAccount = () => {

  const history = useHistory();
  const{alert, showAlert} = useContext(AlertContext);
  const{messageError, auth, newUser} = useContext(LoginContext);

  useEffect(() => {
    document.title = 'Crear cuenta'
    if(auth) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [messageError, auth])

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //State para iniciar sesion
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cfmPassword: "",
  });
  //Extraer valores destructuring de user
  const { name, email, password, cfmPassword } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar campos ''
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || cfmPassword.trim() === ''){
      showAlert("Todos los campos son obligatorios", 'alert alert-error');
      return;
    }
    //Password minimo 6 caracteres
    if(password.length < 6){
      showAlert("Password minimo de 6 caracteres", 'alert alert-error');
      return;
    }
    //Validar password iguales
    if (password !== cfmPassword) {
      showAlert("Los password no son iguales", 'alert alert-error');
      return;
    }
    //Pasar al action
    newUser(user);
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              onChange={onChange}
              value={name}
            />
          </div>
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
            <label htmlFor="cfmPassword">Confirmar Password</label>
            <input
              type="password"
              id="cfmPassword"
              name="cfmPassword"
              placeholder="Confirma tu Password"
              onChange={onChange}
              value={cfmPassword}
            />
          </div>
          <div className="campo-form">
            <input
              className="btn btn-primario btn-block"
              type="submit"
              value="Registrarse"
            />
          </div>
        </form>
        {alert ? <p className={alert.category}>{alert.msg}</p>: null}
        {messageError ? (<p className="alert alert-error">{messageError}</p>) : null}
        <Link className="enlace-cuenta" to={"/login"}>
          Volver a Iniciar Sesión
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

export default NewAccount;
