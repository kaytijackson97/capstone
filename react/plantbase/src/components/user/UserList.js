import User from './User';
import EditUser from './EditUser';

import { useState } from 'react';

function UserList({users = [], deleteUser, editUser}) {
  let newUser = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''

  };

  const [user, setUser] = useState(null);

  const update = (user) => {
      console.log(user);
      setUser(user);
    };


  return (
   <div className="card">
  {user &&  <EditUser user={user} updateView={editUser}/>}
      <h2 className="card-title ml-3">User List</h2>
      <ul className="list-group list-group-flush">
        {users.map(u => <User key={u.username} user={u} deleteUser={deleteUser} editUser={update} />)}
      </ul>
    </div>   
  );
}

export default UserList;