import Redcup from './redcup-plant.png';
import Login from './Login';

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
                    <Login/>
                </div>
            </div>
        </div>
    );
}

export default Welcome;