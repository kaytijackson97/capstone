import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CurrentUser from "../contexts/CurrentUser";

import { findPlanterByUsername } from '../../services/planter-api';


function EditPost({post, plants, editPostByPostId}) {
    const auth = useContext(CurrentUser);

    const defaultPlanter = {
        username: "",
        roleId: 2,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [show, setShow] = useState(false);
    const [newPlantId, setNewPlantId] = useState(post.plantId);
    const [planter, setPlanter] = useState(defaultPlanter);
    const [newCaption, setNewCaption] = useState(post.caption);
    const [newPhoto, setNewPhoto] = useState(post.photo);

    useEffect(() => {
        findPlanterByUsername(post.username)
            .then((data) => setPlanter(data))
    }, [post.username])

    const handleSubmit = (event) => {
        const newPost = {
            postId: post.postId,
            username: post.username,
            plantId: parseInt(newPlantId),
            gardenId: post.gardenId,
            caption: newCaption,
            photo: newPhoto,
            datetimePosted: post.datetimePosted,
            likeCount: post.likeCount
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(newPost)
        };
    
        fetch(`${process.env.REACT_APP_API_URL}/api/post/${post.postId}`, init)
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
        <button onClick={showModal} className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)', marginLeft: '2%'}}>Edit</button>
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
                        <input type="text" placeholder="Show off your plant!" defaultValue={post.caption} onChange={(event) => setNewCaption(event.target.value)} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plants" className="form-label mt-3">Plants</label>
                        <select className="form-select" id="plants" onChange={(event) => (setNewPlantId(event.target.value))}>
                            <option value={0}>None</option>
                            {plants.map(p => <option key={p.plantId} value={p.plantId}>{p.plantName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="form-label mt-3">Photo:</label>
                        <input type="text" placeholder="Add photo url" defaultValue={post.photo} onChange={(event) => setNewPhoto(event.target.value)}></input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal} className="btn btn-outline-success">Cancel</button>
                <button onClick={handleSubmit} className="btn btn-success">Save</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default EditPost;