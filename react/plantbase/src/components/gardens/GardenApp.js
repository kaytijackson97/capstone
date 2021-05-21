import PostList from '../post/PostList';
import { useState } from 'react';
import Messages from '../Messages';

function GardenApp() {
    const [messages, setMessages] = useState("");

    return (
        <div>
            <div className="App container">
    <div className="mt-2 card card-title text-center">
        <h1 className="text-center mt-2">🌿 Garden 🌿</h1>
    </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Messages messages={messages} />
            <div className="card text-white bg-success mt-3 text-center">
                ~Placeholder~
                {/* <PostList /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
}

export default GardenApp;