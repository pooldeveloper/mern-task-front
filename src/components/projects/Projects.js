import React, {useContext, useEffect} from 'react';
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import FormTask from "../tasks/FormTask";
import ListTasks from "../tasks/ListTasks";
import ProjectContext from '../../context/projects/ProjectContext';

const Projects = () => {
 const{getProjects}= useContext(ProjectContext);
  
 useEffect(() => {
  document.title = 'Mis proyectos'
  getProjects();
  // eslint-disable-next-line
 }, [])

  return (
    <div className="contenedor-app">
      <Sidebar/>
      <div className="seccion-principal">
        <Header />
        <main>
          <FormTask />
          <div className="contenedor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
