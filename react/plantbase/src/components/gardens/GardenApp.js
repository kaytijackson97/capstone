import PostList from '../post/PostList';
import Post from '../post/Post';
import { useState, useContext } from 'react';
import Messages from '../Messages';
import PostApp from '../post/PostApp';
import CurrentUser from '../contexts/CurrentUser';

function GardenApp({posts = []}) {
    const [messages, setMessages] = useState("");

    const auth = useContext(CurrentUser);

    return (
        <div>
            <div className="App container">
    <div className="mt-2 card card-title text-center">
        <h1 className="text-center mt-2">🌿 Garden 🌿</h1>
    </div>
        <div className="row">
          <div className="col">
          {/* <h1 className="mt-2">Agents | Welcome {auth.currentUser.username}!</h1> */}
            <Messages messages={messages} />
                <div className="row">
                <div className="card text-dark bg-success mt-3">
                    <h2 className="card-header card-title">Related Posts</h2>
                <PostApp/>
                </div>
            </div>
          </div>
        </div>
    </div>
        </div>
    );
}

export default GardenApp;