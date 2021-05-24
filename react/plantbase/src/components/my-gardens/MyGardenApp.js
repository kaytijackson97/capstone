import ReactRoundedImage from "react-rounded-image";
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import PlantApp from "../plants/PlantApp";
import CurrentUser from "../contexts/CurrentUser";
import EditMyGarden from './EditMyGarden';
import EditIcon from '../plants/edit-icon.png';
import BackArrow from '../plants/back-arrow-icon.png';
import Messages from '../Messages';


function MyGardenApp() {
    const defaultMyGarden = {
        myGardenId: 0,
        gardenName: "Rachel",
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
        fetch(`http://localhost:8080/api/my-garden/from-planter/${username}`)
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
                    </button>- {myGarden.gardenName} 🌿
                    </div>
                        <div className="col">
                            <p className="card-body">My Garden Name: 
                            <div className="card bg-light" style={{color: 'green'}}><strong>{myGarden.gardenName}</strong></div></p>
                            <p className="card-body">Bio: <div className="card bg-light" style={{color: 'green'}}><strong>{myGarden.bio}</strong></div></p>
                            <Messages messages={messages}/>
                        </div>
                        <div className="col">
                        <div style={{ display: "flex" }}>
                            <ReactRoundedImage
                            image={myGarden.photo}
                            roundedColor=""
                            imageWidth="500"
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
                backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/000/142/515/non_2x/leafy-background-daun-vector.jpg)',
                height: ' 110vh auto',
                backgroundAttachment: 'fixed'
            }}>
        <div className="container">
        {console.log(myGarden.myGardenId)}
            <div className="row">
            </div>
            <div className="row">
                <div className="card text-white bg-success mt-3">
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