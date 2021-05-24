import AddUser from './user/AddUser';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';
import Errors from './Errors';

function Register( ) {
  const auth = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState(" ");
  const [error, setError] = useState([]);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    addAppUser();
  }

  const addAppUser = async () => {
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
  
     const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          firstName,
          lastName,
          email
        )
      };
  
      fetch("http://localhost:8080/api/user", init)
        .then(response => {
          if (response.status !== 201) {
            return Promise.reject("ERROR");
          }
          return response.json();
        })
        .then(json => {
          setUsers([...users, json]);
          setMessages("");
        })
        .catch(console.log);
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
          <div>
            <label>First Name:</label>
            <input type="text" onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <button type="submit">Register</button>
            <Link to={'/'}>I already have an account</Link>
          </div>
      </form>
    </div>
  );


 
}

export default Register;