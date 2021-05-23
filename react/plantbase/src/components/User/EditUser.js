import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

function EditUser() {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
      fetch(`http://localhost:8080/api/${username}`) 
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.log(error));
  })

  const handleCancel = (event) => {
  }
   
  const handleEdit = (evt) => {

     const newUser = {
          username: user.username,
          firstName: firstName,
          lastName: lastName,
          email: email
        }

    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    };
    
    console.log(init);
    // 3. create fetch
    fetch(`http://localhost:8080/api/agent/${user.username}`, init)
      .then(response => {
        if (response.status !== 204) {
          return Promise.reject("couldn't update user");
        }
      })
      .then(history.push()) 
      .catch(console.log)
  }

  const handleFirstNameChange = (evt) => {
    setFirstName(evt.target.value);
  }
 
  const handleLastNameChange = (event) => {
   setLastName(event.target.value);
 }
 
 const handleEmailChange = (event) => {
  setEmail(event.target.value);
 }
 
 

  return (
        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label htmlFor="userIdTextBox">User ID:</label>
            <input type="text" id="userIdTextBox" className="form-control" readOnly="readOnly" value={user.username}/>
          </div>
          <div className="form-group">
            <label htmlFor="firstNameTextBox">First Name:</label>
            <input type="text" id="firstNameTextBox" className="form-control" onChange={handleFirstNameChange} defaultValue={user.firstName}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastNameTextBox">Last Name:</label>
            <input type="text" id="lastNameTextBox" className="form-control" onChange={handleLastNameChange} defaultValue={user.lastName}/>
          </div>
          <div className="form-group">
            <label htmlFor="emailTextBox">DOB:</label>
            <input type="text" id="emailTextBox" className="form-control" onChange={handleEmailChange} defaultValue={user.email}/>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Edit User</button>
          <button onSubmit={handleCancel} type="submit" className="btn btn-primary mt-2">Cancel</button>
          <Link className="btn btn-warning ml-2" to="/">Cancel</Link>
        </form>
  );
}

export default EditUser;