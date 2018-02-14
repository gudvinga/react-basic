import { combineReducers } from 'redux';

import categoriesTree from './reducerCategoriesTree';
import categories from './reducerCategories';
import activeCategory from './reducerActiveCategory';
import showDoneTasks from './showDoneTasks';
import tasks from './reducerTasks';
import searchTask from './reducerSearchTask';
import progressBar from './reducerProgressBar';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    categories,
    categoriesTree,
    tasks,
    activeCategory,
    showDoneTasks,
    searchTask,
    progressBar, 
    router: routerReducer
})