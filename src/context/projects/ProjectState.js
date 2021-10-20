import React, { useReducer } from 'react';
import clientAxios from '../../config/clientAxios';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADDING_PROJECT,
    ACTIVE_PROJECT,
    DELATE_PROJECT,
} from '../../types';

const ProjectState = (props) => {

    const initialState ={
        form : false,
        projects: null,
        showError: false,
        project: null
    }

    //Dispatch para ejecutar las funciones
    const[state, dispatch] = useReducer(ProjectReducer, initialState)
    
    const showForm = ()=>{
        dispatch({
            type: FORM_PROJECT
        })
    }

    const getProjects = async ()=>{
        try{
            const result = await clientAxios.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: result.data
            })
        }catch(error){
           console.log(error)
        }
    }

    const addingProject = async project =>{
        try{
            const result = await clientAxios.post('/api/projects', project)
            dispatch({
                type: ADDING_PROJECT,
                payload: result.data
            })
        }catch(error){
           console.log(error)
        }
    }

    const activeProject = id =>{
        dispatch({
            type: ACTIVE_PROJECT,
            payload: id
        })
    }

    const delateProject = async id =>{
        try{
            await clientAxios.delete(`/api/projects/${id}`)
            dispatch({
                type: DELATE_PROJECT,
                payload: id
            })
        }catch(error){
           console.log(error)
        }
    }
    
    return (
        <ProjectContext.Provider
            value={{
                form: state.form,
                projects: state.projects,
                showError: state.showError,
                project: state.project,
                showForm,
                getProjects,
                addingProject,
                activeProject,
                delateProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
}
 
export default ProjectState;

