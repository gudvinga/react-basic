
import { INITIAL_STATE_TASKS } from '../constants/tasksInitialState'

export default function reducerTasks(state = INITIAL_STATE_TASKS, action) {
    if (action.type === 'ADD_TASK') {
        return {
            ...state,
            [action.payload.taskID]: action.payload
        }
    }
    else if (action.type === 'MAKE_DONE_TASK') {
        let newState = JSON.parse(JSON.stringify(state));
        newState[action.payload.taskID].isDone = action.payload.isDone;
        return newState;
    }
    else return state;
}