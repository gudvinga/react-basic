import { INITIAL_STATE_CATEGORIES_TREE } from '../constants/categoriesTreeInitialState'

export default function reducerCategories(state = INITIAL_STATE_CATEGORIES_TREE, action) {
    if (action.type === 'ADD_CATEGORY_TO_TREE') {
         
        if (action.payload.parentID) {
            let newState = JSON.parse(JSON.stringify(state)),
                parentID = action.payload.parentID;
            
            function AddNestedCategory(state) {
                for (let category of state) {
                    if (category.id === parentID) {
                        category.nestedCategory.unshift(action.payload);
                        break;
                    }
                    else if (category.nestedCategory.length !== 0) {
                        AddNestedCategory(category.nestedCategory)
                    }
                }
            }
            AddNestedCategory(newState)
            return newState;
        }
        else {
            return [
                action.payload,
                ...state,
            ];
        }
    }
    else if (action.type === 'DELETE_CATEGORY') {
        function filter(category) {
            return category.filter( item => {
                if (item.id === action.payload.categoryId) {
                    return false;
                }
                else if (item.nestedCategory) {
                    item.nestedCategory = filter(item.nestedCategory);
                    return true;
                }
                else {
                    return true;
                } 
            })
        }

        return filter(state);             
    }
    else return state;
}