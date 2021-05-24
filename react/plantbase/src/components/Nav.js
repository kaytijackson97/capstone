import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import Logout from './Logout';
import CurrentUser from './contexts/CurrentUser';
import AmongUsAlex from './among-us-green.png';
import EditUser from './user/EditUser';



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
                {auth.currentUser && auth.currentUser.isValid() ? (

                <Link style={navStyle} className="nav-link nav-item dropdown" to={`/my-garden/${auth.currentUser.username}`}>
                        <strong>
                            @{auth.currentUser && auth.currentUser.isValid() ? (
                                        auth.currentUser.username
                                    ) : (
                                        ""
                                    )}
                        </strong>
                    <div className="dropdown-menu show" data-bs-popper="none">
                    <Link style={navStyle} to="/post" className="nav-link">
                            <li style={navStyle}>Post</li>
                        </Link>
                        <Link className="dropdown-item" to="/editUser">
                            <li className="dropdown-item">
                                <EditUser />
                            </li>
                        </Link>
                        <Link className="dropdown-item" to="/logout">
                            <li className="dropdown-item">
                                <Logout />
                            </li>
                        </Link>
                        <a className="dropdown-item" href="#">Delete Account</a>
                    </div>
                </Link>
                ) : (
                    ""
                )}
        
            </ul>
            <form className="d-flex">
                <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-light my-2 my-sm-0" type="submit"><strong>Search</strong></button>
            </form>
            </div>
        </div>
    </nav>
  );
}

export default Nav;
