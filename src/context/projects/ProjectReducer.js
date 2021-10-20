import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADDING_PROJECT,
    ACTIVE_PROJECT,
    DELATE_PROJECT
} from '../../types';

const ProjectReducer = (state, action) => {
    switch(action.type){
        case FORM_PROJECT:
            return{
                ...state,
                form: true
            }
        case GET_PROJECTS:
            return{
                ...state,
                projects: action.payload
            }
        case ADDING_PROJECT:
            return{
                ...state,
                projects:[action.payload, ...state.projects],
                form: false,
                showError: false
            }
        case ACTIVE_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELATE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        default:
            return state;
    }
}
 
export default ProjectReducer;