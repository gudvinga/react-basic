import React from 'react';
import './Categories.css';
import CategoryList from '../CategoriesList/CategoryList'

import { connect } from 'react-redux';

class Categories extends React.Component {

    addCategory = (e) => {
        e.preventDefault();
        let ID =  Date.now();
        this.props.onAddCategoryToArray(this.input.value, ID);
        this.props.onAddCategory(this.input.value, ID);
        this.input.value = '';
    }

    render() {
        return(
            <div className="main__categories">
                <h2>Categories</h2>
                <form onSubmit={this.addCategory}>
                    <input type="text" placeholder="Add category" ref={input => { this.input = input; }} />
                    <button type="submit" onClick={this.addCategory}> Add category </button>
                </form>
                <CategoryList categories={this.props.categories} />    
            </div>
        )
    }
}

export default connect(
    state => ({
        categories: state.categoriesTree
    }),
    dispatch => ({
        onAddCategoryToArray: (categoryName, ID) => {
            const payloadItem = {
                id: ID,
                nestedCategory:[]
            }
            categoryName && dispatch({
                type:'ADD_CATEGORY_TO_TREE',
                payload: payloadItem
            })
        },
        onAddCategory: (categoryName, ID) => {
            const payloadItem = {
                id: ID,
                title: categoryName,
            };
            categoryName && dispatch({
                type: 'ADD_CATEGORY',
                payload: payloadItem
            })
        }
    })
)(Categories);