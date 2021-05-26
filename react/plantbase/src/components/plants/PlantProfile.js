import Post from '../post/Post';
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, Link, useLocation } from "react-router-dom";
import CurrentUser from '../contexts/CurrentUser';
import ReactRoundedImage from "react-rounded-image";
import EditPlant from './EditPlant';
import Messages from '../Messages';
import EditIcon from './edit-icon.png';
import BackArrow from './back-arrow-icon.png';
import DeletePlant from './DeletePlant';
import PostApp from '../post/PostApp';
import MyGardenApp from '../my-gardens/MyGardenApp';

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

    const imageStyle = {
        alignSelf: 'center',
        'margin-bottom': '10px',
        'margin-left': '30px',
        'margin-top': '10px',
        'borderRadius': '10'
    }

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

    const defaultPlantProfile = (plant) => {
        if (showEditForm === false) {
            return (
                <div className="row">
                    <div className="card mt-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'white', fontFamily: 'Century Gothic'}}>
                    <div className="card-header">
                    <button onClick={() => backButton()} className="btn" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}><img src={BackArrow} alt="back-arrow" width="10px"></img></button>
                    |<DeletePlant plantId={plant.plantId} deletePlant={deletePlant}/>
                    |<button className="btn" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}} onClick={() => setShowEditForm(true)} title="Edit an Agent">
                        <img  src={EditIcon} alt="edit" width="20px"></img>
                    </button>- <strong style={{fontSize: '30px', color: 'rgba(133, 166, 141, 1)'}}>{plant.plantName} 🌿</strong>
                    </div>
                        <div className="row">
                            <div className="col">
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(133, 166, 141, 1)'}}>Plant Name: <strong>{plant.plantName}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(133, 166, 141, 1)'}}>Plant Type: <strong>{plant.plantType}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(133, 166, 141, 1)'}}>Gotcha Date: <strong>{plant.gotchaDate}</strong></p>
                                <p className="card bg-light mt-3" style={{fontFamily: 'Century Gothic', color: 'rgba(133, 166, 141, 1)'}}>Plant Description: <strong>{plant.plantDescription}</strong></p>
                                <Messages messages={messages}/>
                            </div>
                            <div className="col">
                            <div style={{ display: "flex" }}>
                                <ReactRoundedImage
                                image={plant.photo}
                                roundedColor=""
                                imageWidth="630"
                                imageHeight="400"
                                roundedSize="8"
                                borderRadius="30"
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div
            className="bg-image"
            style={{
                backgroundImage: 'url(https://wallpapercave.com/wp/wp4465057.jpg)',
                height: ' 110vh auto',
                backgroundAttachment: 'fixed'
            }}>
        <div className="container">
            <div className="row">

            </div>
            {defaultPlantProfile(plant)}
            {editForm(plant)}
            <div className="row">
                <div className="card mt-3 mb-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(133, 166, 141, 1)'}}>
                    <h2 className="card-header card-title">Related Posts</h2>
                    <PostApp/>
                </div>
            </div>
        </div>
        </div>
    );
}

export default PlantProfile;