import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import CurrentUser from "../contexts/CurrentUser";

import {findPostById} from '../../services/post-api';
import {findPlantById, findPlantsByMyGardenId} from '../../services/plant-api';


function EditPost({postId, editPostByPostId}) {
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

    const [show, setShow] = useState(false);
    const [post, setPost] = useState(defaultPost);
    const [plant, setPlant] = useState(defaultPlant);
    const [plants, setPlants] = useState([]);
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");
    const auth = useContext(CurrentUser);

    useEffect(() => {
        findPostById(postId)
            .then((data) => setPost(data))
    }, [postId]);

    useEffect(() => {
        findPlantById(post.plantId)
            .then((data) => setPlant(data))
    }, [post.plantId]);

    useEffect(() => {
        findPlantsByMyGardenId(1)
            .then((data) => setPlants(data));
    }, [1]);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const newPost = {
            postId: post.postId,
            username: post.username,
            plantId: post.plantId,
            gardenId: post.gardenId,
            caption: caption,
            photo: photo,
            datetimePosted: post.datetimePosted,
            likeCount: post.likeCount
        }

        console.log(newPost);

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(newPost),
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
                        <Link to={`/my-garden/${auth.currentUser.username}`} className="text-dark text-decoration-none">{auth.currentUser.firstName} {auth.currentUser.lastName}</Link>
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
                        <select className="form-select" id="plants">
                            {plants.map(p => <option>{p.plantName}</option>)}
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