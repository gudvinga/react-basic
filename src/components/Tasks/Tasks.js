import React from 'react';
import { connect } from 'react-redux'
import './Tasks.css';
import Task from '../Task/Task';
import TaskEditForm from '../TaskEditForm/TaskEditForm'
import nanoid from 'nanoid';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.edit = false;
    }
    addTask = (e) => {
        e.preventDefault();
        let taskID = nanoid();

        if (this.input.value) {
            this.props.onAddTaskToCategory(this.props.categoryID, taskID);
            this.props.onAddTask(this.input.value, taskID);
            setTimeout(this.ComplitedCategory, 0);
        }  
              
        this.input.value = '';
    }

    ComplitedCategory = () => {
        this.props.onMakeComplitedCategory(this.props.categoryID, this.props.allTasks);
        this.props.onCalculateProgressBar(this.props.allCategories);
    }

    editHendler = () => {
        this.edit = this.edit ? false : true;
        console.log('work');
        
    }

    componentWillUnmount() {
        this.props.changeWidthApp();
    }

    render() {        
        return(
            <div className="main__tasks">
                <h2>Tasks of the {this.props.category.title}</h2>
                <form onSubmit={this.addTask}>
                    <input type="text" placeholder="Add task" ref={input => { this.input = input; }} />
                    <button type="submit" onClick={this.addTask}> Add task </button>
                </form>
                
                {this.edit 
                    ? <TaskEditForm /> 
                    : this.props.category.tasksID.map( taskID => (                    
                        this.props.tasks.hasOwnProperty(taskID) 
                            ? <Task key={nanoid()} task={this.props.tasks[taskID]} edit={this.editHendler} makeCompleted={this.ComplitedCategory} taskID={taskID}/> 
                            : null
                    )
                )}

                
            </div>
        )
    }
}

export default connect(
    state => ({
        category: state.categories[state.activeCategory],

        tasks: Object.entries(state.tasks).filter(
            item => ((item[1].isDone === state.showDoneTasks || item[1].isDone === false) && item[1].title.includes(state.searchTask))
        ).reduce(
          (prev, current) => ( {...prev, [current[0]]: {...current[1]}})  ,{}
        ),

        allTasks : state.tasks,
        allCategories : state.categories,
        categoryID: state.activeCategory
    }),
    dispatch => ({
        onAddTaskToCategory: (categoryID, taskID) => {
            dispatch({
                type: 'ADD_TASK_TO_CATEGORY',
                payload: {
                    categoryID: categoryID,
                    taskID: taskID
                }
            })
        },
        onAddTask: (taskTitle, taskID) => {
            dispatch({
                type: 'ADD_TASK',
                payload: {
                    title: taskTitle,
                    description: '',
                    isDone: false,
                    taskID: taskID
                }
            })
        },
        onMakeComplitedCategory(activeCategory, tasks) {
            dispatch({
                type: "MAKE_COMPLITED_CATEGORY",
                payload: {
                    categoryID: activeCategory,
                    tasks: tasks
                }
            })
        },
        onCalculateProgressBar(categories) {
            dispatch({
                type: 'CALCULATE_PROGRESS_BAR',
                payload: categories
            })
        }
    })
)(Tasks);