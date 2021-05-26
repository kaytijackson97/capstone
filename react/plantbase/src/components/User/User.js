import EditUser from './EditUser';

function User( { user }) {


  return (
    <>
    <div>
      <EditUser user = {user} />  
    </div>
  </>

  );
}

export default User;