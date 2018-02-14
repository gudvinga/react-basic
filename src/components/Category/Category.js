import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.id = this.props.id;
    }

    deleteCategory = (e) => {
        this.props.onDeleteCategory(this.id, this.props.categoriesTree);
        this.props.onWriteActiveCategory(0);
        e.stopPropagation();
    }

    editCategory = (e) => {
        e.stopPropagation();
        let newName = prompt('Please, enter new category name...', this.props.category[this.props.id].title);
        this.props.onEditCategory(this.id, newName);
    }

    addCategory = (e) => {
        e.stopPropagation();
        let ID = Date.now(),
            categoryName = prompt('Please, enter category name...');
        this.props.onAddCategoryToArray(categoryName, ID, this.id);
        this.props.onAddCategory(categoryName, ID);
    }

    makeActiveCategory = () => {
        this.props.onWriteActiveCategory(this.id);
    }

    componentDidUpdate() {
        this.props.onCalculateProgressBar(this.props.category, this.props.categoriesTree);
    }

    componentDidMount() {
        this.props.onCalculateProgressBar(this.props.category, this.props.categoriesTree);
    }

    render() {      
        return (
           // <Link to={`/categories/${this.props.categoryID}`}>
                <div className={this.props.category[this.id].isActive ? "categories__item category-active" : "categories__item"} onClick={this.makeActiveCategory} ref={(div)=>this.div = div}>
                    <p>{this.props.category[this.id].title}</p>
                    <div className="buttons">
                        <button onClick={this.editCategory}><i className="icon-edit"></i></button>
                        <button onClick={this.deleteCategory}><i className="icon-trash"></i></button>
                        <button onClick={this.addCategory}><i className="icon-doc-add"></i></button>
                    </div>
                </div>
           // </Link>
        )
    }
}

export default connect(
    state => ({
        category: state.categories,
        categoriesTree: state.categoriesTree,
        task: state.tasks,
        categoryID: state.activeCategory
    }),
    dispatch => ({
        onDeleteCategory: (categoryId, categoriesTree) => {
            dispatch({
                type: 'DELETE_CATEGORY',
                payload: {
                    categoryId: categoryId,
                    categoriesTree: categoriesTree
                }
            })
        },
        onEditCategory: (categoryID, newName) => {
            dispatch({
                type: 'EDIT_CATEGORY',
                payload: {
                    categoryID: categoryID,
                    newName: newName
                }
            })
        },
        onAddCategoryToArray: (categoryName, ID, parentID) => {
            const payloadItem = {
                id: ID,
                parentID: parentID,
                nestedCategory: []
            }
            categoryName && dispatch({
                type: 'ADD_CATEGORY_TO_TREE',
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
        },
        onWriteActiveCategory: (categoryID) => {
            dispatch({
                type: 'WRITE_ACTIVE_CATEGORY',
                payload: categoryID
            })
        },
        onCalculateProgressBar(categories) {
            dispatch({
                type: 'CALCULATE_PROGRESS_BAR',
                payload: categories
            })
        }
    })
)(Category);