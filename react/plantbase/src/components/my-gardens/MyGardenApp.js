import ReactRoundedImage from "react-rounded-image";
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import PlantApp from "../plants/PlantApp";
import CurrentUser from "../contexts/CurrentUser";
import EditMyGarden from './EditMyGarden';
import EditIcon from '../plants/edit-icon.png';
import BackArrow from '../plants/back-arrow-icon.png';
import Messages from '../Messages';


function MyGardenApp({previousMyGarden}) {
    const defaultMyGarden = {
        myGardenId: 0,
        gardenName: "Example",
        userId: 3,
        bio: "wowie wow",
        photo: "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2013/1/20/0/CI_intensive-gardening-allows-a-lot-of-produce-to-grow-in-a-small-space.jpg.rend.hgtvcom.616.493.suffix/1452644679836.jpeg",
        plants: []
    }
    
    const [messages, setMessages] = useState("");
    const [myGarden, setMyGarden] = useState(defaultMyGarden);
    const [showEditForm, setShowEditForm] = useState(false);
    const location = useLocation();

    const { state: { from } = { from : `/garden` } } = location;

    const auth = useContext(CurrentUser);

    const { username } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/my-garden/from-planter/${username}`)
            .then(response => response.json())
            .then(data => setMyGarden(data))
            .catch(error => console.log(error));
    }, [username])

    const editForm = (myGarden) => {
        if (showEditForm === true) {
            return (
                <EditMyGarden myGarden={myGarden} setShowEditForm={setShowEditForm}/>
            );
        }
    }

    const backButton = () => {
        history.push(from);
    }

    const defaultMyGardenForm = (myGarden) => {
        if (showEditForm === false) {
            return (
                <div>
                    <div className="row">
                    <div className="card-header">
                    <button onClick={() => backButton()} className="btn btn-success"><img src={BackArrow} alt="back-arrow" width="10px"></img></button>|
                    <button className="btn btn-success" onClick={() => setShowEditForm(true)} title="Edit MyGarden">
                        <img  src={EditIcon} alt="edit" width="20px"></img>
                    </button>- <strong style={{fontSize: '30px', fontFamily: 'Century Gothic'}}>{myGarden.gardenName} 🌿</strong>
                    </div>
                        <div className="col" >
                            <p className="card-body" style={{fontFamily: 'Century Gothic'}}>My Garden Name: 
                            <div className="card bg-light" style={{color: 'green'}}><strong>{myGarden.gardenName}</strong></div></p>
                            <p className="card-body" style={{fontFamily: 'Century Gothic'}}>Bio: <div className="card bg-light" style={{color: 'green'}}><strong>{myGarden.bio}</strong></div></p>
                            <Messages messages={messages}/>
                        </div>
                        <div className="col">
                        <div style={{ display: "flex" }}>
                            <ReactRoundedImage
                            image={myGarden.photo}
                            roundedColor=""
                            imageWidth="650"
                            imageHeight="350"
                            roundedSize="8"
                            borderRadius="30"
                            />
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
                backgroundImage: 'url(https://www.colourbox.com/preview/4787766-soil-background.jpg)',
                height: ' 110vh auto',
                backgroundAttachment: 'fixed'
            }}>
        <div className="container">
        {console.log(myGarden.myGardenId)}
            <div className="row">
                <div className="card mt-3"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'white'}}>
                    {defaultMyGardenForm(myGarden)}
                    {editForm(myGarden)}
                    <div className="row">
                        <PlantApp myGarden={myGarden}/>
                    </div>
                </div>
        </div>
        </div>
        </div>
    );
}

export default MyGardenApp;