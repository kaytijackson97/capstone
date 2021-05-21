import Redcup from './redcup-plant.png';
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card text-white bg-success mt-3">
                        <h1 className="card-header">Welcome to Plantbase. 🌱</h1>
                        <p className="card-body">A safe space for the plant community.</p>
                        <img src={Redcup} style={{ alignSelf: 'center' }} width="400px" alt="redcup plant"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card border-success mt-3" style={{maxwidth: + 20}}>
                        <div className="card-body">
                            <h2 className="card-header">Login</h2>
                            <form>
                            <div className="form-group mt-3">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                                    <label for="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                </div>
                                <Link to="/garden" style={{paddingLeft: 13, textDecoration: 'none'}}>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg btn-success mt-3">Login</button>
                                    </div>
                                </Link>
                                <Link to="/register" style={{paddingLeft: 13, textDecoration: 'none'}}>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg btn-outline-success mt-3" >Register</button>
                                    </div>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;