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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create_account`, {
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

  await fetch(`${process.env.REACT_APP_API_URL}/api/planter`, init)
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
  await fetch(`${process.env.REACT_APP_API_URL}/api/my-garden`, init)
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
    <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://media.istockphoto.com/vectors/horizontal-vector-illustration-of-an-empty-light-smoky-blue-gray-vector-id1177688756?b=1&k=6&m=1177688756&s=170667a&w=0&h=t3dpwnpMAT4jWgrrRbd47Umv4y-XI7mVUPtKzux5p04=)',
                'height': '110vh',
                'backgroundAttachment': 'fixed'
            }}>
    <div className="container-fluid">
    <div className="card" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', padding: '30px'}}>
      <h2 className="text-center mb-4" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}}>Register New Account</h2>
      <Errors errors={error} />
      <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="text" placeholder="Username:" onChange={handleUsernameChange} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>Username:</label>
          </div>
      </div>
      <div className="col">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="password" placeholder="Password:" onChange={(event) => setPassword(event.target.value)} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>Password:</label>
          </div>
      </div>
      </div>
      <div className="row">
      <div className="col">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="text" placeholder="First Name:" onChange={(event) => setFirstName(event.target.value)} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>First Name:</label>
          </div>
      </div>
      <div className="col">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="text" placeholder="Last Name:" onChange={(event) => setLastName(event.target.value)} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>Last Name:</label>
          </div>
      </div>
      <div className="col">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="text" placeholder="Garden Name:" onChange={(event) => setGardenName(event.target.value)} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>Garden Name:</label>
          </div>
      </div>
      </div>
      <div className="row">
          <div className="form-floating mb-3">
            <input style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}} required className="form-control" type="text" placeholder="Email:" onChange={(event) => setEmail(event.target.value)} />
            <label style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>Email:</label>
          </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button className="btn btn-lg text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}} type="submit">Register</button>
        </div>
        <div className="col  text-center">
          <Link to={'/'} className="btn btn-lg" style={{borderColor: 'rgba(133, 166, 141, 1)', color: 'rgba(133, 166, 141, 1)'}}>I already have an account</Link>
        </div>
      </div>
      </form>
      </div>
    </div>
    </div>
  );


 
}

export default Register;