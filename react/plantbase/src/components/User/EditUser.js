import { useEffect, useContext, useState } from 'react';
import CurrentUser from '../contexts/CurrentUser';
import { Link, useHistory, useParams } from 'react-router-dom';
import User from './User';

function EditUser( { user }  ) {
  const auth = useContext(CurrentUser);
  const defaultUser = {
    username: user.username,
    roleId: user.roleId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const [oldUser, setOldUser] = useState(defaultUser);

  const [firstName, setFirstName] = useState(oldUser.firstName);
  const [lastName, setLastName] = useState(oldUser.lastName);
  const [email, setEmail] = useState(oldUser.email);

  // const { username } = useParams();
  const history = useHistory();

    useEffect(() => {
      fetch(`http://localhost:8080/api/planter/${user.username}`)
        .then(response => response.json())
        .then(data => setOldUser(data))
        .catch(error => console.log(error))
    }, [user.username]);

  const handleEdit = (evt) => {
    evt.preventDefault();

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
    fetch(`http://localhost:8080/api/planter/${auth.currentUser.username}`, init)
      .then(response => {
        if (response.status !== 204) {
          return Promise.reject("couldn't update user");
        }
      })
      // .then(() => ) 
      .catch(console.log);

  }

  const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
      setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  }

  const handleCancel = (event) => {
  }
 
  const navStyle = {
    color: 'white',
    'textDecoration': 'none'
  };

  return (
    <div className = "container mt-3" style={{maxwidth: 20}}>
    <div class="card text-white bg-success mb-3" style={{maxwidth: 20}}>
      <div class="card-header">Edit Account: @{auth.currentUser.username}</div>
      <div class="card-body">
        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label htmlFor="firstNameTextBox">First Name:</label>
            <input type="text" id="firstNameTextBox" className="form-control" onChange={handleFirstNameChange} defaultValue={auth.currentUser.firstName}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastNameTextBox">Last Name:</label>
            <input type="text" id="lastNameTextBox" className="form-control" onChange={handleLastNameChange} defaultValue={auth.currentUser.lastName}/>
          </div>
          <div className="form-group">
            <label htmlFor="emailTextBox">Email:</label>
            <input type="text" id="emailTextBox" className="form-control" onChange={handleEmailChange} defaultValue={auth.currentUser.email}/>
          </div>
          <Link onSubmit={handleCancel}> <button type="submit" className="btn btn-warning mt-2 mr-3" style={navStyle}>Cancel</button>
          </Link>
          <button type="submit" className="btn btn-outline-light mt-2" style={navStyle}>Edit User</button>
        </form>
        </div>
      </div>
  </div>
  );
}

export default EditUser;