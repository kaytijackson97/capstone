import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import Logout from './Logout';
import CurrentUser from './contexts/CurrentUser';
import AmongUsAlex from './among-us-green.png';
import EditUser from './user/EditUser';
import Logo from './plantbase-logo2.png'
import Dropdown from 'react-bootstrap/Dropdown';
import UserApp from './user/UserApp';
import DeleteUser from './user/DeleteUser';


function Nav() {
    const auth = useContext(CurrentUser);

    const navStyle = {fontFamily: 'Century Gothic', color: 'white', textDecoration: 'none', paddingRight: '10px',  borderRight: '1px solid #ffffff'};

    return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: 'rgba(133, 166, 141, 0.7)'}}>
        <div className="container-fluid">
            <Link style={navStyle} to="/" ><strong><img src={Logo} alt="logo" width="20px" style={{position: 'relative', bottom: '3px'}}/> Plantbase</strong>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
            <ul  className=" navbar-nav me-auto nav-links">
                {auth.currentUser && auth.currentUser.isValid() ? (
                <Link to="/garden" className="nav-link">
                    <li style={navStyle} >Garden</li>
                </Link>
                ) : (
                    ""
                )}
                {auth.currentUser && auth.currentUser.isValid() ? (
                <Dropdown>
                    <strong style={{color: 'white'}}>
                            @{auth.currentUser && auth.currentUser.isValid() ? (
                                        auth.currentUser.username
                                    ) : (
                                        ""
                                    )}
                    </strong>
                    <Dropdown.Toggle split variant="none" style={{ marginLeft: '7px', color: 'white'}} id="dropdown-split-basic" />
                    <Dropdown.Menu  style={{backgroundColor: 'rgba(133, 166, 141, 0.5)', backdropFilter: 'blur(3px)'}}>
                    <Dropdown.Item><Link style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} className="btn btn-light nav-link nav-item dropdown" to={`/my-garden/${auth.currentUser.username}`}>My Garden</Link></Dropdown.Item>
                    <Dropdown.Item><button style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} className="btn btn-light nav-link nav-item dropdown"><li><UserApp/></li></button></Dropdown.Item>
                    <Dropdown.Item><button style={{color: 'rgba(133, 166, 141, 1)', textDecoration: 'none'}} className="btn btn-light nav-link nav-item dropdown"><li><DeleteUser /></li></button></Dropdown.Item>
                    <Dropdown.Item><li><Logout /></li></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                ) : (
                    ""
                )}
            </ul>
            <form className="d-flex">
                <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} className="form-control me-sm-2" type="text" placeholder="Search"/>
                <button style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} className="btn btn-light btn-md" type="submit"><strong>Search</strong></button>
            </form>
            </div>
        </div>
    </nav>
  );
}

export default Nav;