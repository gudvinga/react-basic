import React from 'react';
import './Filter.css';

import { connect } from 'react-redux';

class Filter extends React.Component {
    showDoneTasks = () => {
        this.props.onShowDoneTasks(this.checkbox.checked);
    }

    searchTask = (e) => {
        e.preventDefault();
        this.props.onSearchTask(this.input.value);
    }

    render() {
        return(
            <div className="header__filter">
                <label><input type="checkbox" onChange={this.showDoneTasks} ref={checkbox => { this.checkbox = checkbox} } checked={this.props.showDone}/>Show done tasks</label>
                <form onSubmit = {this.searchTask}>
                    <input type="text" placeholder="Search tasks" onChange={this.searchTask} ref = { input => this.input = input }/>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        showDone: state.showDoneTasks
    }),
    dispatch => ({
        onShowDoneTasks: (bool)=> {
            dispatch({
                type: 'SHOW_DONE_TASKS',
                payload: bool
            })
        },
        onSearchTask: (input) => {
            dispatch({
                type: 'SEARCH_TASKS',
                payload: input
            })
        },
    })
)(Filter)