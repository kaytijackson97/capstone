import Silverdust from './silverdust.png';
import Login from './Login';
import ReactRoundedImage from "react-rounded-image";

function Welcome() {
    return (
        
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://www.colourbox.com/preview/4787766-soil-background.jpg)',
                'height': 'auto',
                'backgroundAttachment': 'fixed'
            }}>
        <div className="container" >
            <div className="row">
                <div className="col">
                    <div className="card text-white mt-3 mb-10" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)'}}>
                        <h1 className="card-header" style={{color: 'white', fontFamily: 'Century Gothic'}}>Welcome to Plantbase. 🌱</h1>
                        <p className="card-body" style={{color: 'white'}}>A social media specifically for the plant community.</p>
                        <div className="text-center" style={{justifyContent: 'center', alignItems: 'center', marginLeft: '160px', marginBottom: '50px'}}>
                        <ReactRoundedImage
                            image={Silverdust}
                            roundedColor=""
                            imageWidth="500"
                            imageHeight="500"
                            roundedSize="8"
                            borderRadius="30"
                            />
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