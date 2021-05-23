import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import Logout from './Logout';
import CurrentUser from './contexts/CurrentUser';
import AmongUsAlex from './among-us-green.png';



function Nav() {
    const auth = useContext(CurrentUser);

    const navStyle = {
        color: 'white',
        'textDecoration': 'none'
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link style={navStyle} to="/" ><strong>🌱 Plantbase</strong>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
            <ul  className=" navbar-nav me-auto nav-links">
                <Link style={navStyle} to="/garden" className="nav-link">
                    <li style={navStyle} >Garden</li>
                </Link>
                <Link style={navStyle} to="/post" className="nav-link">
                    <li style={navStyle}>Post</li>
                </Link>
                <Link style={navStyle} to="/plant" className="nav-link">
                    <li style={navStyle}>Plant</li>
                </Link>
                {auth.currentUser && auth.currentUser.isValid() ? (
                    <Link style={navStyle} className="nav-link btn btn-light text-dark" to={`/my-garden/${auth.currentUser.username}`}>
                        <li className="nav-item"> 
                            <strong>
                                My Garden: {auth.currentUser && auth.currentUser.isValid() ? (
                                        auth.currentUser.username
                                    ) : (
                                        ""
                                    )}
                            </strong>
                        </li>
                    </Link>
                ) : (
                    ""
                )}
                <Link style={navStyle} className="nav-link" to="/logout">
                    <li className="nav-item">
                        <Logout />
                    </li>
                </Link>
        
            </ul>
            <form className="d-flex">
                <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-light my-2 my-sm-0" type="submit"><strong>Search</strong></button>
            </form>
            <Link style={navStyle} className="nav-link btn btn-light text-dark" to="/profile">
                    <li className="nav-item"> 
                        <strong>
                            user: {auth.currentUser && auth.currentUser.isValid() ? (
                                        auth.currentUser.username
                                    ) : (
                                        ""
                                    )}
                        </strong>
                    </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="http://localhost:3000/garden" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
                    <div className="dropdown-menu show" data-bs-popper="none">
                        <a className="dropdown-item" href="#">Add a Post</a>
                        <a className="dropdown-item" href="#">Edit Account</a>
                        <Link style={navStyle} className="dropdown-item" to="/logout">
                            <li className="dropdown-item">
                                <Logout />
                            </li>
                        </Link>
                        <a className="dropdown-item" href="#">Delete Account</a>
                    </div>
                </li>
                </Link>
        </div>
        </div>
    </nav>
  );
}

export default Nav;
