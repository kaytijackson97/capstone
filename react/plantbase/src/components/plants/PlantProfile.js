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

    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from : `/plant` } } = location;

    useEffect(() => {
        fetch(`http://localhost:8080/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.log(error));
    }, [plantId])

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
        await fetch(`http://localhost:8080/api/plants/${plant.plantId}`, {method: "DELETE"})
            .then(response => {
                if (response.status !== 204) {
                    return Promise.reject(`delete found with status ${response.status}`);
                }
            });
    }

    const editForm = (plant) => {
        if (showEditForm === true) {
            return (
                <EditPlant/>
                // <div className="row">
                //         <div className="card text-white bg-success mt-3">
                //         <div className="card-header"><Link to={`/plant/edit/${plant.plantId}`} title="Edit an Agent">
                //             <img src={EditIcon} alt="edit" width="20px"></img>
                //         </Link> | {plant.plantName} 🌿
                //         </div>
                //             <div className="row">
                //                 <div className="col">
                //                     <p className="card text-dark bg-light mt-3">Plant Name: <strong>{plant.plantName}</strong></p>
                //                     <p className="card text-dark bg-light mt-3">Plant Type: <strong>{plant.plantType}</strong></p>
                //                     <p className="card text-dark bg-light mt-3">Gotcha Date: <strong>{plant.gotchaDate}</strong></p>
                //                     <p className="card text-dark bg-light mt-3">Plant Description: <strong>{plant.plantDescription}</strong></p>
                //                     <Messages messages={messages}/>
                //                 </div>
                //                 <div className="col">
                //                 <div style={{ display: "flex" }}>
                //                     <ReactRoundedImage
                //                     image={plant.photo}
                //                     roundedColor=""
                //                     imageWidth="500"
                //                     imageHeight="350"
                //                     roundedSize="8"
                //                     borderRadius="30"
                //                     />
                //                 </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
            );
        }
    }

    const defaultPlantProfile = (plant) => {
        if (showEditForm === false) {
            return (
                <div className="row">
                    <div className="card text-white bg-success mt-3">
                    <div className="card-header">
                    <button onClick={() => backButton()} className="btn btn-success"><img src={BackArrow} alt="back-arrow" width="10px"></img></button>
                    |<DeletePlant plantId={plant.plantId} deletePlant={deletePlant}/>
                    |<Link className="btn btn-success" to={`/plant/edit/${plant.plantId}`} title="Edit an Agent">
                        <img  src={EditIcon} alt="edit" width="20px"></img>
                    </Link>- {plant.plantName} 🌿
                    </div>
                        <div className="row">
                            <div className="col">
                                <p className="card text-dark bg-light mt-3">Plant Name: <strong>{plant.plantName}</strong></p>
                                <p className="card text-dark bg-light mt-3">Plant Type: <strong>{plant.plantType}</strong></p>
                                <p className="card text-dark bg-light mt-3">Gotcha Date: <strong>{plant.gotchaDate}</strong></p>
                                <p className="card text-dark bg-light mt-3">Plant Description: <strong>{plant.plantDescription}</strong></p>
                                <Messages messages={messages}/>
                            </div>
                            <div className="col">
                            <div style={{ display: "flex" }}>
                                <ReactRoundedImage
                                image={plant.photo}
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
                </div>
            );
        }
    }

    return (
        <div className="container">
            <div className="row">

            </div>
            {defaultPlantProfile(plant)}
            {editForm(plant)}
            <div className="row">
                <div className="card text-white bg-success mt-3 mb-3">
                    <h2 className="card-header card-title">Related Posts</h2>
                <ul>
                    {/* list of posts that maps to post */}
                    <li>
                    {posts.map(p => (
                        <Post key={p.postId} posts={posts} post={p} />
                    ))}
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default PlantProfile;