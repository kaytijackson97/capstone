import { useState } from 'react';

function DeleteUser( {user, deleteUser} ) {

 const [ userId, setUserId ] = useState(0);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  }

  const handleDeleteUser = (event) => {
    event.preventDefault();
    deleteUser(userId);
  }
 fetch(`http://localhost:8080/api/agent/${user.userId}`, { method: "DELETE" })
     .then(response => {
       if (response.status === 204 || response.status === 404) {
         deleteUser(user.userId);
       } else {
         return Promise.reject(`delete found with status ${response.status}`);
       }
     });

 return (
    <div className="card border-secondary mb-3" style={{marginRight: + 20, marginTop: + 15}}>
   <div className="card-body">
   <h4 className="card-title">Delete Agent</h4>
      <div className="card-body">
        <form onSubmit={handleDeleteUser}>
          <div className="form-group">
            <label htmlFor="UserIdTextBox">Agent ID:</label>
            <input type="text" id="UserIdTextBox" onChange={handleUserIdChange} className="form-control"/>
          </div>
          
          <button type="submit" className="btn btn-primary mt-2">Delete User</button>
        </form>
      </div>
    </div>
    </div> 
    );
}

export default DeleteUser;