import React, {useContext} from 'react';
import LoginContext from '../../context/login/LoginContext';
import PWAButton from './PWAButton';
const Header = () => {
    const{user, signOff} = useContext(LoginContext);

    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola {user ? <span>{user.name}</span> : null}</p>
            <nav className="nav-principal">
                <button className="btn-nav" type="button" onClick={signOff}>Cerrar Sesion</button>
                <PWAButton styles={'btn-nav'}/>
            </nav>
        </header>
    );
}
 
export default Header;