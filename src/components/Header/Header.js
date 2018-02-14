import React from 'react';
import './Header.css'
import MainLogo from '../MainLogo/MainLogo.js';
import Filter from '../Filter/Filter.js';

export default class Header extends React.Component {
    render() {
        return(
            <header className="app__header">
                <MainLogo />
                <Filter />
            </header>
        )
    }
}