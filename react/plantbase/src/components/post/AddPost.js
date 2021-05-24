import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { findPlantsByMyGardenId } from "../../services/plant-api";
import CurrentUser from "../contexts/CurrentUser";

function AddPost({addPostToArray}) {
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");
    const [plants, setPlants] = useState([]);
    const [plantId, setPlantId] = useState(0);
    const auth = useContext(CurrentUser);
    const now = new Date();

    const handleSubmit = async () => {
        const nowAsLocalDateTime = 
                now.getFullYear() + "-" + 
                ("0" + (now.getMonth() + 1)).slice(-2) + "-" + 
                ("0" + now.getDate()).slice(-2) + "T" + 
                now.getHours() + ":" + 
                now.getMinutes() + ":" + 
                now.getSeconds();

        const newPost = {
            username: auth.currentUser.username,
            plantId: parseInt(plantId),
            gardenId: 1,
            caption: caption,
            photo: photo,
            datetimePosted: nowAsLocalDateTime,
            likeCount: 0
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(newPost)
        };

        fetch("http://localhost:8080/api/post", init)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED");
            }
            return response.json;
        })
        .then(() => addPostToArray(newPost));

        hideModal();
    }

    const showModal = async () => {
        await findPlantsByMyGardenId(auth.currentUser.myGarden.myGardenId)
            .then((data) => setPlants(data));
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    return (
        <>
        <button onClick={showModal} className="btn btn-success btn-xl">Add</button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>
                    <h4 className="card-title">
                        Add a new Post!
                    </h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="caption" className="form-label mt-3">Caption:</label>
                        <input type="text" placeholder="Show off your plant!" onChange={(event) => setCaption(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plants" className="form-label mt-3">Plants</label>
                        <select className="form-select" id="plants" onChange={(event) => (setPlantId(event.target.value))}>
                            <option value={0}>None</option>
                            {plants.map(p => <option value={p.plantId}>{p.plantName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="form-label mt-3">Photo:</label>
                        <input type="text" placeholder="Add photo url" onChange={(event) => setPhoto(event.target.value)}></input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>
                <button onClick={handleSubmit}>Save</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddPost;