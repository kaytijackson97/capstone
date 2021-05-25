import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import CurrentUser from '../contexts/CurrentUser';
import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";


function User( { user, setUser }) {

 const auth = useContext(CurrentUser);

 function checkUsers(user, auth) {
  
  if (user.username === auth.currentUser.username) {
    return setUser(user);
  }
  
 }

 // const defaultUser = {
 //  username: "default",
 //  firstName: "default",
 //  lastName: "default",
 //  email: "default",
 //  }

  // const { username } = useParams();

 return (
  <>
   {checkUsers( user, auth )}
   <div>
    <EditUser user = {user} />   
   </div>
  </>

  );
}

export default User;