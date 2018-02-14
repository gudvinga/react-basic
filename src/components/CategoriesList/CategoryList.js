import React from 'react';
import Category from '../Category/Category';
import nanoid from 'nanoid';
import { Route } from 'react-router-dom';

export default class CategoryList extends React.Component {
    render() {
        return(
            <ul>
                {this.props.categories.map((category) => {
                    if (category.nestedCategory.length !== 0) {
                        return (
                            <li key={nanoid()}>
                                <Category id={category.id} />
                                <CategoryList categories={category.nestedCategory} />
                            </li>
                        )
                    }
                    else {
                        return (
                            <li key={nanoid()}>
                                <Category id={category.id} />
                            </li>
                        )
                    }
                })
                }
            </ul>
        )
    }
}