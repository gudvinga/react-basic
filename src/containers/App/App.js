import React from 'react';
import './App.css';

import Header from '../../components/Header/Header.js';
import ProgressBar from '../../components/ProgressBar/ProgressBar.js';
import Categories from '../../components/Categories/Categories.js';
import Tasks from '../../components/Tasks/Tasks.js';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

class App extends React.Component {
  makeFullWidth = () => {    
    this.div.classList.toggle('full_width')
  }

  render() {
    let isCategoryActive = (props) => {
      if (props) {
        this.div.classList.add('full_width');
        return <Tasks changeWidthApp={this.makeFullWidth} />
      }
    }
    
    return (
      <div className="app" ref={ div => this.div = div}>
        <Header />
        <ProgressBar />
        <section className="app__main">
          <Categories/>
          {isCategoryActive(this.props.activeCategoryID)}
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({
    activeCategoryID: state.activeCategory
  }),
  dispatch => ({})
)(App);
