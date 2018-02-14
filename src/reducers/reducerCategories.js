
import { INITIAL_STATE_CATEGORIES } from '../constants/categoriesInitialState';

export default function reducerCategory(state = INITIAL_STATE_CATEGORIES, action) {
    if (action.type === 'ADD_CATEGORY') {
        return {
            ...state,
            [action.payload.id]: {
                title: action.payload.title,
                isActive: false,
                completed: true,
                tasksID: []
            }
        }            
    }

    else if (action.type === 'DELETE_CATEGORY'){
        let newState = JSON.parse(JSON.stringify(state));
        
        let categoriesID = [];
        function findID(categories) {
            categories.forEach( item => {
                categoriesID.push(item.id);
                if (item.nestedCategory.length !== 0) {
                    findID(item.nestedCategory);
                }
            })
            return categoriesID;
        }
        
        let result;
        function findCategory(categories) {
            for (let item of categories) {
                
                if ( item.id === action.payload.categoryId ) {
                    result = item;
                    break;
                }
                else if ( item.nestedCategory.length !== 0 ) {
                    findCategory(item.nestedCategory)
                }
            }
            return result;
        }

        let temp = findCategory(action.payload.categoriesTree);
        temp = findID(temp.nestedCategory);        
        temp.unshift(action.payload.categoryId);
        temp.forEach(id => {delete newState[id]});

        return newState;
    }

    else if (action.type === 'EDIT_CATEGORY') {
        let newState = JSON.parse(JSON.stringify(state));
        newState[action.payload.categoryID].title = action.payload.newName;
        return newState;
    }

    else if (action.type === 'ADD_TASK_TO_CATEGORY') {
        let newState = JSON.parse(JSON.stringify(state));      
        newState[action.payload.categoryID].tasksID.unshift(action.payload.taskID);
        return newState;
    }

    else if (action.type === 'WRITE_ACTIVE_CATEGORY') {
        let newState = JSON.parse(JSON.stringify(state));

        for (let key in newState) {      
            if (key === (action.payload).toString()) {
                newState[key].isActive = true;
            }
            else {
                newState[key].isActive = false;
            }
        }

        return newState;
    }

    else if (action.type === 'MAKE_COMPLITED_CATEGORY') {
        let isCompleted = state[action.payload.categoryID].tasksID.filter( id => !action.payload.tasks[id].isDone ).length === 0;
        let newState = JSON.parse(JSON.stringify(state));
        newState[action.payload.categoryID].completed = isCompleted;
        
        return newState;
    }

    else return state;
}