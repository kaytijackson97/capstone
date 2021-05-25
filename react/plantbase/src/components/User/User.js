import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import CurrentUser from '../contexts/CurrentUser';
import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";


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