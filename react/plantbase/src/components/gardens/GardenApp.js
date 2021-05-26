import { useState, useContext } from 'react';
import Messages from '../Messages';
import PostApp from '../post/PostApp';
import CurrentUser from '../contexts/CurrentUser';

function GardenApp() {
    const [messages, setMessages] = useState("");

    const auth = useContext(CurrentUser);

    return (
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://www.colourbox.com/preview/4787766-soil-background.jpg)',
                'height': 'auto',
                'backgroundAttachment': 'fixed'
            }}>
        <div>
            <div className="App container">
        <div className="row">
          <div className="col">
          <div className="card card-title text-center" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)'}}>
          <h1 className="mt-2" style={{color: 'white', fontFamily: 'Century Gothic'}}>Welcome {auth.currentUser.username}! 🌿</h1>
          </div>
            <Messages messages={messages} />
                <div className="row">
                <div className="card text-dark mt-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)'}}>
                    <h2 className="card-header card-title" style={{color: 'white'}}>Related Posts</h2>
                <PostApp/>
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