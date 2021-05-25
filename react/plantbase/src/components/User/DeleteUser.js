import { useState } from 'react';

function DeleteUser( {user, deleteUser} ) {

 const [ username, setUsername ] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleDeleteUser = (event) => {
    event.preventDefault();
    deleteUser(username);
  }
 fetch(`http://localhost:8080/api/agent/${user.username}`, { method: "DELETE" })
     .then(response => {
       if (response.status === 204 || response.status === 404) {
         deleteUser(user.username);
       } else {
         return Promise.reject(`delete found with status ${response.status}`);
       }
     });

 return (
    <div className="card border-secondary mb-3" style={{marginRight: + 20, marginTop: + 15}}>
   <div className="card-body">
   <h4 className="card-title">Delete User</h4>
      <div className="card-body">
        <form onSubmit={handleDeleteUser}>
          <div className="form-group">
            <label htmlFor="UsernameTextBox">Username:</label>
            <input type="text" id="UsernameTextBox" onChange={handleUsernameChange} className="form-control"/>
          </div>
          
          <button type="submit" className="btn btn-primary mt-2">Delete User</button>
        </form>
      </div>
    </div>
    </div> 
    );
}

export default DeleteUser;