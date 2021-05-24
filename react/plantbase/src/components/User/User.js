import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

function User() {

 return (
  <li>
   <button onClick={EditUser}>Edit User</button>
   <button onClick={DeleteUser}>Delete User</button>
  </li>

  );
}

export default User;