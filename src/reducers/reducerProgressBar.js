
const INITIAL_STATE_PROGRESS_BAR = 100;

export default function reducerProgressBar(state = INITIAL_STATE_PROGRESS_BAR, action) {
    if (action.type === 'CALCULATE_PROGRESS_BAR') {
        const FULL_LENGTH = Object.entries(action.payload).length - 1;
        let CURRENT_LENGTH = Object.entries(action.payload).filter(
             item => item[1].completed
            ).length;
                
        return CURRENT_LENGTH / FULL_LENGTH * 100;
    }
    else return state;
}