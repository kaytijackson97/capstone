import React, {useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CurrentUser from './contexts/CurrentUser';
import Messages from './Messages';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from : '/' } } = location;

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }
    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const LoginUser = async (event) => {
        event.preventDefault();

        try {
            await auth.authenticate(username, password);
            setMessages("Login successful! 😊");
            history.push(from);
        } catch (err) {
            setMessages([err.message] + ", try again. ");
        }
    }

    return (
        <div className="card border-success mt-3" style={{maxwidth: + 20}}>
                        <div className="card-body">
                            <h2 className="card-header">Login</h2>
                            <form onSubmit={LoginUser}>
                            <div className="form-group mt-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={updateUsername}></input>
                                    <label for="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={updatePassword}></input>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                </div>
                                {/* <Link to="/garden" style={{paddingLeft: 13, textDecoration: 'none'}}> */}
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg btn-success mt-3">Login</button>
                                    </div>
                                {/* </Link> */}
                                <Link to="/register" style={{paddingLeft: 13, textDecoration: 'none'}}>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg btn-outline-success mt-3" >Register</button>
                                    </div>
                                </Link>
                            </form>
                        </div>
                        <Messages messages={messages} />
                    </div>
    );
}

export default Login;