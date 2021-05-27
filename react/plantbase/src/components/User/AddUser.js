import { useState } from 'react';

function AddUser({ addUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = (event) => {
    event.stopPropagation();

    let canAdd = true;

    if (firstName.trim().length === 0) {
      canAdd = false;
    }

    if (canAdd) {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email
      };
      addUser(user);
    }
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


  return (
    <div className="card border-secondary mb-3" style={{marginRight: + 20, marginTop: + 20}}>
      <div className="card-body">
        <h4 className="card-title">Create Account</h4>
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label htmlFor="firstNameTextBox">First Name:</label>
            <input type="text" id="firstNameTextBox" onChange={handleFirstNameChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastNameTextBox">Last Name:</label>
            <input type="text" id="lastNameTextBox" onChange={handleLastNameChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="emailTextBox">Email Address:</label>
            <input type="text" id="emailTextBox" onChange={handleEmailChange} className="form-control"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
