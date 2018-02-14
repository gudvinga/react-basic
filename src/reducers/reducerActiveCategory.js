const INITIAL_STATE = 0;

export default function activeCategory(state = INITIAL_STATE, action) {
    if (action.type === 'WRITE_ACTIVE_CATEGORY') {
        return action.payload;
    }
    else return state;
}