import React, {useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CurrentUser from './contexts/CurrentUser';
import Messages from './Messages';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    let history = useHistory();
    let location = useLocation();

    const { state: { from } = { from : '/garden' } } = location;

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }
    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const LoginUser = async (event) => {
        event.preventDefault();

        try {

            const validUser = await auth.authenticate(username, password);
             console.log(validUser);
            if (validUser === null) {
                setMessages("Login failed! ")
                return;
            };
            setMessages("Login successful! 😊")
            history.push(from);
        } catch (err) {
            setMessages([err.message] + ", try again. ");
        }
    }

    return (
        <div className="card mt-3 text-center" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', maxwidth: + 20}}>
                        <div className="card-body">
                            <h2 className="" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}}>Login</h2>
                            <form onSubmit={LoginUser}>
                            <div className="form-group mt-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={updateUsername}></input>
                                    <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={updatePassword}></input>
                                    <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="floatingPassword">Password</label>
                                </div>
                                </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg mt-3 text-white" style={{fontFamily: 'Century Gothic', backgroundColor: 'rgba(133, 166, 141, 1)'}}>Login</button>
                                    </div>
                                <Link to="/register" style={{paddingLeft: 13, textDecoration: 'none'}}>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg" style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic', borderColor: 'rgba(133, 166, 141, 1)'}}>Register</button>
                                    </div>
                                </Link>
                            </form>
                        </div>
                        <Messages messages={messages} />
                    </div>
    );
}

export default Login;