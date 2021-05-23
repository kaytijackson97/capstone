import Redcup from './redcup-plant.png';
import Login from './Login';

function Welcome() {
    return (
        
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://static.vecteezy.com/system/resources/previews/000/142/515/non_2x/leafy-background-daun-vector.jpg)',
                'height': '110vh',
                'backgroundAttachment': 'fixed'
            }}>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card text-white bg-success mt-3 mb-10">
                        <h1 className="card-header">Welcome to Plantbase. 🌱</h1>
                        <p className="card-body">A safe space for the plant community.</p>
                        <img className="mb-5" src={Redcup} style={{ alignSelf: 'center' }} width="500px" alt="redcup plant"></img>
                    </div>
                </div>
                <div className="col-3">
                    <Login/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Welcome;