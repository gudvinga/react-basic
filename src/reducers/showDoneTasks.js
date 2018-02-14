const INITIAL_STATE = true;

export default function showDoneTasks(state = INITIAL_STATE, action) {
    if (action.type === 'SHOW_DONE_TASKS') {
        return action.payload;
    }
    else return state
}