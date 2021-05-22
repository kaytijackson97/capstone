import AddUser from './user/AddUser';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';
import Errors from './Errors';

function Register({ parentAddUser }) {
    const auth = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/create_account', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });

      if (response.status === 201) {
        try {
          await auth.authenticate(username, password);
        history.push('/');
        } catch (err) {
          throw new Error('Unknown Error');
        }     
      } else if (response.status === 400) {
        throw new Error('The account is already in use');
      } else {
        throw new Error('Unknown Error');
      }
    } catch (err) {
      setError([err.message]);
    }
    
  }

  return (
    <div>
      <h2>Register</h2>
      <Errors errors={error} />
      <form onSubmit={handleSubmit}>
      <div>
          <label>Username:</label>
          <input type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <AddUser addUser={parentAddUser}/>
        <div>
          <button type="submit">Register</button>
          <Link to={'/login'}>I already have an account</Link>
        </div>
      </form>
    </div>
  );


 
}

export default Register;