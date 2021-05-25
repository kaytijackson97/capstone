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
            //// history.push("/garden");

            setMessages("Login successful! 😊")

            // (auth.currentUser && auth.currentUser.isValid() ? (
            //     setMessages("Login successful! 😊")
            //   ) : (
            //     setMessages("Login failed! ")
            //     ))
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
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={updatePassword}></input>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                </div>
                                {/* <Link to="/garden" > */}
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