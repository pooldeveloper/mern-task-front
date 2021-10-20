import {
    TASKS_PROJECT,
    ADDING_TASK,
    VALIDATE_TASK,
    DELATE_TASK,
    SELECT_TASK,
    UPDATE_TASK
}from '../../types';

const TaskReducer = (state, action) => {
    switch(action.type){
        case TASKS_PROJECT:
            return{
                ...state,
                activeTasks: action.payload
            }
        case ADDING_TASK:
            return{
                ...state,
                activeTasks: [action.payload, ...state.activeTasks],
                showError: false
            }
        case VALIDATE_TASK:
            return{
                ...state,
                showError: action.payload
            }
        case DELATE_TASK:
            return{
                ...state,
                activeTasks: state.activeTasks.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return{
                ...state,
                activeTasks: state.activeTasks.map(task => task._id === action.payload._id ? action.payload : task),
                selectTaskEdit: null
            }
        case SELECT_TASK:
            return{
                ...state,
                selectTaskEdit: action.payload
            }
        default:
            return state;
    }
}
 
export default TaskReducer;
