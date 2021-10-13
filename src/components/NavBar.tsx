import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavBar.css';
const style = {
    navBar: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #aaa',
        padding: '10px 15px',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 1
    } as React.CSSProperties,
    link: {
        color: '#555',
        textDecoration: 'none'
    } as React.CSSProperties,
}

export default class NavBar extends Component {
    public render() {
        return (
            <div className='NavBar'>
                <div className='navbar-menu'>
                    <div >
                        <Link style={style.link} to="/app/newsfeed">
                            <FontAwesomeIcon icon={faNewspaper} /> Instacool
                        </Link>
                    </div>
                    <div >
                        <Link style={style.link} to="/app/profile">
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}