import Snake from './snake-plant.png';
import Login from './Login';
import ReactRoundedImage from "react-rounded-image";

function Welcome() {
    return (
        
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://media.istockphoto.com/vectors/horizontal-vector-illustration-of-an-empty-light-smoky-blue-gray-vector-id1177688756?b=1&k=6&m=1177688756&s=170667a&w=0&h=t3dpwnpMAT4jWgrrRbd47Umv4y-XI7mVUPtKzux5p04=)',
                'height': 'auto',
                'backgroundAttachment': 'fixed'
            }}>
        <div className="container-fluid" >
            <div className="row">
                <div className="col">
                    <div className="card text-white mt-3 mb-3 text-center" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', paddingTop: '20px'}}>
                        <h1 className="text-center" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}}>Plantbase 🌱</h1>
                        <p className="card-body" style={{color: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>A social media specifically for the plant community</p>
                        <div className="text-center">
                        <img src={Snake} alt="snake plant" style={{justifyContent: 'center', alignItems: 'center', marginBottom: '50px', maxWidth: '400px'}}/>
                        <img src="https://images.vexels.com/media/users/3/208691/isolated/preview/59155c4f2bba13e0aeeec8867113f8bf-cute-plant-in-pot-by-vexels.png" alt="pretty plant" style={{justifyContent: 'center', alignItems: 'center', marginBottom: '50px', maxWidth: '500px'}}/>
                        </div>
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