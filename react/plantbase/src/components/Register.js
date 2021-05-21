import AddUser from "./User/AddUser";

function Register({ parentAddUser }) {
    


 return (
  <>
      <AddUser addUser={parentAddUser}/>
  </>
 );
}

export default Register;