import AddUser from './user/AddUser';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Errors from './Errors';
import CurrentUser from './contexts/CurrentUser';
import jwt_decode from 'jwt-decode';

function Register() {
  const auth = useContext(CurrentUser);

  const roleId = 2;
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState(" ");
  const [error, setError] = useState([]);
  const [gardenName, setGardenName] = useState('');

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
        const token = await auth.authenticateRegistration(username, password)
        // const { id, sub: username, authorities: rolesString } = await jwt_decode(token);
        
        console.log(token);
          await addPlanter(token);
          await addMyGarden(token);
          history.push('/garden');
      } catch (err) {
        throw new Error('Unknown Error');
      }     
    } else if (response.status === 400) {
      throw new Error('Password must be at least length 8, contain a digit, character, and a symbol.');
    } else {
      throw new Error('Unknown Error');
    }
  } catch (err) {
    setError([err.message]);
  }
  }

const addPlanter = async (token) => {
  debugger
  console.log(username);
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    const planter = {
      roleId: roleId, 
      username: username, 
      firstName: firstName, 
      lastName: lastName,
      email: email
    };
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(
      planter
    )
  };
  console.log(init);

  await fetch("http://localhost:8080/api/planter", init)
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

const addMyGarden = async (token) => {
  const myGarden = {
    username: username,
    gardenName: gardenName
  };
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(
      myGarden
    )
  };
  await fetch("http://localhost:8080/api/my-garden", init)
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
  
const handleUsernameChange = (event) => {
  setUsername(event.target.value);
  
}
  

  return (
    <div>
      <h2>Register</h2>
      <Errors errors={error} />
      <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" onChange={handleUsernameChange} />
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
            <label>Garden Name:</label>
            <input type="text" onChange={(event) => setGardenName(event.target.value)} />
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