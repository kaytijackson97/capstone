import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import Logout from './Logout';
import CurrentUser from './contexts/CurrentUser';
import AmongUsAlex from './among-us-green.png';
import EditUser from './user/EditUser';
import Dropdown from 'react-bootstrap/Dropdown';


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
                {auth.currentUser && auth.currentUser.isValid() ? (
                <Dropdown>
                    <strong style={{color: 'white'}}>
                            @{auth.currentUser && auth.currentUser.isValid() ? (
                                        auth.currentUser.username
                                    ) : (
                                        ""
                                    )}
                    </strong>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                    <Dropdown.Item><Link style={{color: 'green', textDecoration: 'none'}} className="nav-link nav-item dropdown" to={`/my-garden/${auth.currentUser.username}`}>My Garden</Link></Dropdown.Item>
                    <Dropdown.Item><Link style={{color: 'green', textDecoration: 'none'}} to="/post" className="nav-link nav-item dropdown"><li>Post</li></Link></Dropdown.Item>
                    <Dropdown.Item><Link style={{color: 'green', textDecoration: 'none'}} className="dropdown-item flex-row" to={`/editUser/${auth.currentUser.username}`}><li>Edit Account</li></Link></Dropdown.Item>
                    <Dropdown.Item><Link to={`/deleteUser/${auth.currentUser.username}`} className="nav-link nav-item dropdown" style={{color: 'green', textDecoration: 'none'}}><li>Delete Account</li></Link></Dropdown.Item>
                    <Dropdown.Item><li><Logout /></li></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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