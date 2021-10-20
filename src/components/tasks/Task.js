import React, { useContext } from "react";
import TaskContext from "../../context/tasks/TaskContext";

const Task = ({ task }) => {
  const { name, state } = task;
  const { delateTask, updateTask, selectTask } = useContext(TaskContext);

  const onClickDelate = () => {
    delateTask(task._id, task.project);
  };

  const onClickChange = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    updateTask(task);
  };

  const onClickEdit = (task) => {
    selectTask(task);
  };
  return (
    <li className="tarea sombra">
      <p>{name}</p>
      <div className="acciones">
        <div className="estado">
          {state ? (
            <button
              type="button"
              className="completo"
              onClick={() => onClickChange(task)}
            >
              completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => onClickChange(task)}
            >
              Incompleto
            </button>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => onClickEdit(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onClickDelate}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
