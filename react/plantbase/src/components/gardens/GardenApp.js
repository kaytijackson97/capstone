import Messages from '../Messages';
import PostApp from '../post/PostApp';

function GardenApp() {

    return (
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://media.istockphoto.com/vectors/horizontal-vector-illustration-of-an-empty-light-smoky-blue-gray-vector-id1177688756?b=1&k=6&m=1177688756&s=170667a&w=0&h=t3dpwnpMAT4jWgrrRbd47Umv4y-XI7mVUPtKzux5p04=)',
                'height': 'auto',
                'backgroundAttachment': 'fixed'
            }}>
            <div>
                <div className="App container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="text-center"></div>
                            <div className="row">
                                <div className="col" style={{maxWidth: '15rem'}}>
                                    <Messages messages="" />
                                </div>
                                <div className="col">
                                    <div className="card text-dark mt-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)'}}>
                                        <h2 className="card-header card-title" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic'}}>Garden</h2>
                                        <PostApp/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GardenApp;