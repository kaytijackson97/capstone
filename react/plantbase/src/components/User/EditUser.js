import { useEffect, useContext, useState } from 'react';
import CurrentUser from '../contexts/CurrentUser';
import { Link, useHistory, useParams } from 'react-router-dom';
import User from './User';
import Modal from 'react-bootstrap/Modal';
import UserApp from './UserApp';


function EditUser( { user }  ) {
  const auth = useContext(CurrentUser);
  const [show, setShow] = useState(false);

  const defaultUser = {
    username: user.username,
    roleId: user.roleId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const [oldUser, setOldUser] = useState(defaultUser);

  const [firstName, setFirstName] = useState(auth.currentUser.firstName);
  const [lastName, setLastName] = useState(auth.currentUser.lastName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const [password, setPassword] = useState('');

  // const { username } = useParams();
  const history = useHistory();

    useEffect(() => {
      fetch(`http://localhost:8080/api/planter/${user.username}`)
        .then(response => response.json())
        .then(data => setOldUser(data))
        .catch(error => console.log(error))
    }, [user.username]);

  const handleEdit = async (evt) => { 

    const newUser = {
      roleId: 2,
      username: auth.currentUser.username,
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.currentUser.token}`
      },  
      body: JSON.stringify(newUser)
    };
  
    // 3. create fetch
     await fetch(`http://localhost:8080/api/planter/${auth.currentUser.username}`, init)
      .then(response => {
        if (response.status !== 204) {
          return Promise.reject("couldn't update user");
        }
      })
      .then(() => auth.authenticate(auth.currentUser.username, password)
      ) 
      .catch(console.log);

      hideModal();
      // login again?
      console.log(auth.currentUser.firstName);

  }

  const showModal = () => {
    setShow(true);
    };

const hideModal = () => {
    setShow(false);
    };

  const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
      setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
}



  return (
    <>
      <button onClick={showModal} className="btn btn-light" style={{color: 'green'}}>Edit Account</button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>
                    <h4 className="card-title">
                    Edit Account Information: @{auth.currentUser.username}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="firstNameTextBox">First Name:</label>
            <input type="text" id="firstNameTextBox" className="form-control" onChange={handleFirstNameChange} defaultValue={firstName}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastNameTextBox">Last Name:</label>
            <input type="text" id="lastNameTextBox" className="form-control" onChange={handleLastNameChange} defaultValue={lastName}/>
          </div>
          <div className="form-group">
            <label htmlFor="emailTextBox">Email:</label>
            <input type="text" id="emailTextBox" className="form-control" onChange={handleEmailChange} defaultValue={email}/>
          </div>
          <div className="form-group">
            <label htmlFor="PasswordTextBox">Please re-enter your password:</label>
            <input type="password" id="PasswordTextBox" className="form-control" onChange={handlePasswordChange}/>
          </div>
        </form>
        </Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal} className="btn btn-outline-success">Cancel</button>
                <button onClick={handleEdit} className="btn btn-success">Save</button>
            </Modal.Footer>
        </Modal>
  </>
  );
}

export default EditUser;