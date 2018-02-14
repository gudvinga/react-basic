import React from 'react';
import './TaskEditForm.css'

export default class TaskEditForm extends React.Component {
    render() {
        return(
            <form className="taskEditForm">
                <input className="text" type="text"/>
                <label><input type="checkbox"/>Done</label>
                <textarea className="textarea"  />
                <div>
                    <button type="submit">Save change</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        )
    }
}