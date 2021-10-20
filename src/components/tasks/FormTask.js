import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const FormTask = () => {
  const {project} = useContext(ProjectContext);

  const {addingTask, validateTask, showError, selectTaskEdit, updateTask} = useContext(TaskContext);

  const [task, setTask] = useState({
    name: "",
  });
  const { name } = task;

  useEffect(() => {
    if (selectTaskEdit !== null) {
      setTask(selectTaskEdit);
    } else {
      setTask({
        name: "",
      });
    }
  }, [selectTaskEdit]);

  if (!project) return null;

  //Array destructuring para proyecto actual
  const [activeProject] = project;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (name.trim() === "") {
      validateTask();
      return;
    }
    
    if (selectTaskEdit === null) {
      //Agregar nueva tarea al state de tareas
      task.project = activeProject._id;
      addingTask(task);
    }else{
      updateTask(task)
    }
    //Reiniciar form
    setTask({
      name: "",
    });
  };
  
  return (
    <div className="formulario">
      <form className="form" onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selectTaskEdit !== null ? "Editar tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {showError ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTask;
