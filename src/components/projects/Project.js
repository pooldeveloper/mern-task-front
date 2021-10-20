import React, { useContext } from "react";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const Project = ({ project }) => {
  const { activeProject } = useContext(ProjectContext);
  const { getTasks } = useContext(TaskContext);

  const selectProject = (id) => {
    activeProject(id); //fijar proyecto actual
    getTasks(id); // Filtrar tareas al hacer click
  };
  
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
