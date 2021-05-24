import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CurrentUser from "../contexts/CurrentUser";

import { findPlantsByMyGardenId } from '../../services/plant-api';
import { findPlanterByUsername } from '../../services/planter-api';


function EditPost({postId, username, plantId, gardenId, caption, photo, datetimePosted, likeCount,  editPostByPostId}) {
    const auth = useContext(CurrentUser);

    const defaultPlanter = {
        username: "",
        roleId: 2,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [show, setShow] = useState(false);
    const [plants, setPlants] = useState([]);
    const [newPlantId, setNewPlantId] = useState(plantId);
    const [planter, setPlanter] = useState(defaultPlanter);
    const [newCaption, setNewCaption] = useState(caption);
    const [newPhoto, setNewPhoto] = useState(photo);

    useEffect(() => {
        findPlanterByUsername(username)
            .then((data) => setPlanter(data))
    }, [username])

    useEffect(() => {
        findPlantsByMyGardenId(gardenId)
            .then((data) => setPlants(data));
    }, [gardenId]);

    const handleSubmit = (event) => {
        const newPost = {
            postId: postId,
            username: username,
            plantId: parseInt(newPlantId),
            gardenId: gardenId,
            caption: newCaption,
            photo: newPhoto,
            datetimePosted: datetimePosted,
            likeCount: likeCount
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(newPost)
        };
    
        fetch(`http://localhost:8080/api/post/${postId}`, init)
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject("Post id not found");
                } else if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            })
            .then(() => {
                editPostByPostId(newPost);
            })

        hideModal();
    }

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    return (
        <>
        <button onClick={showModal} className="btn btn-success">Edit</button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>
                    <h4 className="card-title">
                        {planter.firstName} {planter.lastName}
                    </h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="caption" className="form-label mt-3">Caption:</label>
                        <input type="text" placeholder="Show off your plant!" defaultValue={caption} onChange={(event) => setNewCaption(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plants" className="form-label mt-3">Plants</label>
                        <select className="form-select" id="plants" onChange={(event) => (setNewPlantId(event.target.value))}>
                            {plants.map(p => <option value={p.plantId}>{p.plantName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="form-label mt-3">Photo:</label>
                        <input type="text" placeholder="Add photo url" defaultValue={photo} onChange={(event) => setNewPhoto(event.target.value)}></input>
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

export default EditPost;