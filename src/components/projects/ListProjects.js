import React, { useContext } from "react";
import Project from "./Project";
import ProjectContext from "../../context/projects/ProjectContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListProjects = () => {

  const { projects } = useContext(ProjectContext);

  if(!projects) return null;
  //Revisar si proyectos tiene contenido
  if(projects.length === 0 ) return <p>No hay proyectos, empienza creando uno</p>;
  return (
    <ul className="listado-proyectos">
      {
        <TransitionGroup>
          {projects.map((project) => (
            <CSSTransition
              classNames="proyecto"
              timeout={200}
              key={project._id}
            >
              <Project project={project} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      }
    </ul>
  );
};

export default ListProjects;
