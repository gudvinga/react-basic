import React from 'react';
import './ProgressBar.css';
import { connect } from 'react-redux';

class ProgressBar extends React.Component {
    render() {
        return(
            <div className="progressbar">
                <div className="progressbar__inner" style={{ width: `${this.props.progressBar}%`}}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        progressBar: state.progressBar
    }),
    dispatch => ({})
)(ProgressBar);