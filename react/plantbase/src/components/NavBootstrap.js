import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Logout from "./Logout";
import CurrentUser from "./contexts/CurrentUser";
import Logo from "./images/plantbase-logo2.png";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import DeleteUser from "./user/DeleteUser";
import EditUser from "./user/EditUser";

function NavBootstrap() {

    const auth = useContext(CurrentUser);


    // const userTag = () => {
    //         return (
    //         <strong style={{color: 'white'}}>
    //                             @{auth.currentUser && auth.currentUser.isValid() ? (
    //                                         auth.currentUser.username
    //                                     ) : (
    //                                         ""
    //                                     )}
    //                     </strong>
    //                     );
    // }

  return (
    <Navbar expand="lg" fixed="top" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}>
      <Navbar.Brand className="text-white" href="#home">
      <Link style={{textDecoration: 'none', color: 'white'}} to="/" ><strong><img src={Logo} alt="logo" width="20px" style={{position: 'relative', bottom: '4px'}}/>lantbase</strong></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="text-white">
          {auth.currentUser && auth.currentUser.isValid() ? (
                    <Link to="/garden" className="nav-link">
                        <li style={{textDecoration: 'none', color: 'white'}}>Garden</li>
                    </Link>
                    ) : (
                        ""
                    )}
          </Nav.Link>
          {auth.currentUser && auth.currentUser.isValid() ? (
            <strong className="text-white">
          <NavDropdown className="mt-2 text-white" title={`@${auth.currentUser.username}`} id="basic-nav-dropdown">
            <strong style={{color: 'white'}}>
                                @{auth.currentUser && auth.currentUser.isValid() ? (
                                            auth.currentUser.username
                                        ) : (
                                            ""
                                        )}
                        </strong>
            <NavDropdown.Item>
                <Link style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} className="btn btn-light nav-link nav-item dropdown" to={`/my-garden/${auth.currentUser.username}`}>My Garden</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
                                <li className="btn btn-light nav-link nav-item dropdown text-center">
                                    <EditUser />
                                </li>
            </NavDropdown.Item>
            <NavDropdown.Item>
                                <li className="btn btn-light nav-link nav-item dropdown">
                                    <DeleteUser />
                                </li>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
                    <li>
                        <Logout />
                    </li>
            </NavDropdown.Item>
          </NavDropdown></strong>
          ) : (
            ""
          )}
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" style={{borderColor: 'white', color: 'white'}}>Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBootstrap;
