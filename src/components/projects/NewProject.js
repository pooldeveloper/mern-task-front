import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/projects/ProjectContext";
import AlertContext from "../../context/alerts/AlertContext";
const NewProject = () => {
  const { form, showForm, addingProject} = useContext(ProjectContext);
  const{alert, showAlert} = useContext(AlertContext);

  const [newProject, setNewProject] = useState({
    name: "",
  });
  const { name } = newProject;

  const onChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const onClickForm = () => {
    showForm();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar campos ''
    if (name.trim() === "") {
      showAlert('El nombre del Proyecto es obligatorio', 'mensaje error')
      return;
    }
    //Agregar al state
    addingProject(newProject);
    //Reiniciar el form
    setNewProject({
      name: "",
    });
  };
  
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickForm}
      >
        Nuevo Proyecto
      </button>

      {form ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {alert ? (
        <p className={alert.category}>{alert.msg}</p>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
