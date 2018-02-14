import React from 'react';
import './Task.css';
import { connect } from 'react-redux';

class Task extends React.Component {
    makeDone = () => {
        this.props.onMakeDone(this.props.taskID, !this.props.task.isDone);
        setTimeout(this.props.makeCompleted,0);
    }

    // editTask = () => {
    //     alert("Comming soon")
    // }

    render() {    
        return (
            <div className={this.props.task.isDone ? "task__item active" : "task__item" } ref={ div => this.div = div}>
                <div className="title">
                    <input type="checkbox" onChange={this.makeDone} ref={checkbox => this.checkbox = checkbox} checked={this.props.task.isDone}/>
                    <p>{this.props.task.title}</p>
                </div>                
                <button onClick={this.props.edit}><i className="icon-edit"></i></button>
            </div>
        )
    }
}

export default connect( 
    state => ({
    }),
    dispatch => ({
        onMakeDone(taskID, isDone) {
            dispatch({
                type: "MAKE_DONE_TASK",
                payload: {
                    taskID: taskID,
                    isDone: isDone
                }
            })
        }
    })
)(Task);