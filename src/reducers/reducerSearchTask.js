const INITIAL_STATE = '';

export default function searchTask(state = INITIAL_STATE, action) {
    if (action.type === 'SEARCH_TASKS') {
        return action.payload
    }
    else return state;
}