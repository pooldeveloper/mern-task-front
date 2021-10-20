import React from 'react';
import NewProject from '../projects/NewProject';
import ListProjects from '../projects/ListProjects';

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject/>
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListProjects/>
                <p className="copy">Desarrolloado por <a href="https://pooldeveloper.github.io" target="_blank" rel="noopener noreferrer">&copy;Pool Nuñez</a></p>
            </div>
        </aside>
    );
}
 
export default Sidebar;