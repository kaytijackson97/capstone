import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CurrentUser from "../contexts/CurrentUser";

import {findPostById} from '../../services/post-api';
import {findPlantById, findPlantsByMyGardenId} from '../../services/plant-api';
import { findPlanterByUsername } from '../../services/planter-api';


function EditPost({postId, editPostByPostId}) {
    const auth = useContext(CurrentUser);

    const defaultPlant = {
        plantId: 1,
        myGardenId: 1,
        plantDescription: "",
        photo: "",
        plantName: "",
        plantType: "",
        gotchaDate: ""
    }

    const defaultPost = {
        postId: 1,
        username: "",
        plantId: 1,
        gardenId: 1,
        caption: "",
        photo: "",
        datetimePosted: "",
        likeCount: 0
    }

    const defaultPlanter = {
        username: "",
        roleId: 2,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [show, setShow] = useState(false);
    const [post, setPost] = useState(defaultPost);
    const [plants, setPlants] = useState([]);
    const [plantId, setPlantId] = useState(0);
    const [planter, setPlanter] = useState(defaultPlanter);
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        findPostById(postId)
            .then((data) => setPost(data))
    }, [postId]);

    useEffect(() => {
        findPlanterByUsername(post.username)
            .then((data) => setPlanter(data))
    }, [post.username])

    useEffect(() => {
        findPlantsByMyGardenId(1)
            .then((data) => setPlants(data));
    }, [1]);

    const handleSubmit = (event) => {
        const newPost = {
            postId: post.postId,
            username: post.username,
            plantId: parseInt(plantId),
            gardenId: post.gardenId,
            caption: caption,
            photo: photo,
            datetimePosted: post.datetimePosted,
            likeCount: post.likeCount
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

    const postStyle = {
        "width": "1000px"
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
                        <input type="text" placeholder="Show off your plant!" defaultValue={post.caption} onChange={(event) => setCaption(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plants" className="form-label mt-3">Plants</label>
                        <select className="form-select" id="plants" onChange={(event) => (setPlantId(event.target.value))}>
                            {plants.map(p => <option value={p.plantId}>{p.plantName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="form-label mt-3">Photo:</label>
                        <input type="text" placeholder="Add photo url" defaultValue={post.photo} onChange={(event) => setPhoto(event.target.value)}></input>
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