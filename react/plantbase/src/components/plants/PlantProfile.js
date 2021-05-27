import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";
import CurrentUser from '../contexts/CurrentUser';
import EditPlant from './EditPlant';
import Messages from '../Messages';
import EditIcon from './edit-icon.png';
import BackArrow from './back-arrow-icon.png';
import DeletePlant from './DeletePlant';
import PostList from '../post/PostList';

function PlantProfile() {
    const defaultPlant = {
    plantId: 0,
    plantDescription: "default",
    photo: "plant.png",
    plantName: "default",
    plantType: "default",
    gotchaDate: "2021-02-02",
    myGardenId: 1,
    posts: []
    }

    const { plantId } = useParams();
    const [plant, setPlant] = useState(defaultPlant);
    const [posts, setPosts] = useState([]);
    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    const [showEditForm, setShowEditForm] = useState(false);
    const [myGarden, setMyGarden] = useState({});

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/my-garden/${plant.myGardenId}`)
        .then(response => response.json())
        .then(data => setMyGarden(data))
        .catch(error => console.log(error));
    }, [plant.myGardenId])

    const { state: { from } = { from : `/my-garden/${myGarden.username}` } } = location;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.log(error));
    }, [plantId])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/post/plant/${plantId}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error));
    })

    const backButton = () => {
        history.push(from);
    }

    const deletePlant = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/plants/${plantId}`, { method: "DELETE", headers: {
            "Authorization": `Bearer ${auth.currentUser.token}`
        } })
        .then(response => {
            if (response.status === 204 || response.status === 404) {
            
            } else {
                return Promise.reject(`delete found with status ${response.status}`);
            }
        });
        history.push(from);
    }

    const editForm = (plant) => {
        if (showEditForm === true) {
            return (
                <EditPlant plant={plant} setShowEditForm={setShowEditForm}/>
            );
        }
    }

    const defaultForm = (plant) => {
        if (showEditForm === false) {
            return (
                <div className="row">
                    <div className="card mt-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'white', fontFamily: 'Century Gothic'}}>
                    <div className="">
                    <button onClick={() => backButton()} className="btn" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}><img src={BackArrow} alt="back-arrow" width="10px"></img></button>
                    {((auth.currentUser.username === myGarden.username) || (auth.currentUser && auth.currentUser.hasRole("ROLE_ADMIN"))) ? (
                    <>
                    <DeletePlant plantId={plant.plantId} deletePlant={deletePlant}/>
                    <button onClick={() => setShowEditForm(true)} className="btn" style={{backgroundColor: 'rgba(133, 166, 141, 1)', marginLeft: '0.5%'}}><img src={EditIcon} alt="back-arrow" width="20px"></img></button>
                    </>
                    ):("")}
                    
                    <strong style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic', fontSize: '30px', marginLeft: '2%'}}>{plant.plantName} 🌿</strong>
                    
                    </div>
                        <div className="row">
                            <div className="col">
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(89, 107, 93, 1)'}}>Plant Name: <strong>{plant.plantName}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(89, 107, 93, 1)'}}>Plant Type: <strong>{plant.plantType}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(89, 107, 93, 1)'}}>Gotcha Date: <strong>{plant.gotchaDate}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(89, 107, 93, 1)'}}>Plant Description: <strong>{plant.plantDescription}</strong></p>
                                <Messages messages={messages}/>
                            </div>
                            <div className="col">
                            <div>
                                <img src={plant.photo} alt="plant profile" width="630"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function editPostByPostId(post) {
        const newPosts = [];
        for(const p of posts ) {
            if (p.postId !== post.postId) {
                newPosts.push(p);
            } else {
                newPosts.push(post)
            }
        }

        setPosts(newPosts);
    }

    function deletePostByPostId(postId) {
        const newPosts = [];
        for(const post of posts ) {
            if (post.postId !== postId) {
                newPosts.push(post);
            }
        }

        setPosts(newPosts);
    }


    return (
        <div
            className="bg-image"
            style={{
                backgroundImage: 'url(https://media.istockphoto.com/vectors/horizontal-vector-illustration-of-an-empty-light-smoky-blue-gray-vector-id1177688756?b=1&k=6&m=1177688756&s=170667a&w=0&h=t3dpwnpMAT4jWgrrRbd47Umv4y-XI7mVUPtKzux5p04=)',
                height: ' 110vh auto',
                backgroundAttachment: 'fixed'
            }}>
        <div className="container">
            <div className="row">
            </div>
           {defaultForm(plant)}
           {editForm(plant)} 
            <div className="row">
                <div className="card mt-3 mb-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(89, 107, 93, 1)'}}>
                    <h2 className="text-center card-title">Related Posts</h2>
                    <PostList posts={posts} editPostByPostId={editPostByPostId} deletePostByPostId={deletePostByPostId}/>
                </div>
            </div>
        </div>
        </div>
    );
}

export default PlantProfile;