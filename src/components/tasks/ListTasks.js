import React, { Fragment, useContext } from "react";
import Task from "./Task";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListTasks = () => {
  const { project, delateProject } = useContext(ProjectContext);

  const { activeTasks } = useContext(TaskContext);

  if (!project) return <h2>Selecciona un proyecto</h2>;
  const[activeProject] = project;

  const onClickDelate = ()=>{
    delateProject(activeProject._id);
  }

  if(!activeTasks) return null;
  return (
    <Fragment>
      <h2>Proyecto: {activeProject.name}</h2>
      <ul className="listado-tareas">
        {activeTasks.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {activeTasks.map((task) => <CSSTransition timeout={200} classNames='tarea' key={task._id}><Task task={task}/></CSSTransition>)}
          </TransitionGroup>
        )}
      </ul>
      <button type="button" className="btn btn-eliminar" onClick={onClickDelate}>
        Eliminar Projecto &times;
      </button>
    </Fragment>
  );
};

export default ListTasks;
