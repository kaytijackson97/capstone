import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CurrentUser from "../contexts/CurrentUser";

function AddPost({addPostToArray, plants}) {
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");
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

        console.log(newPost);
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(newPost)
        };

        fetch(`${process.env.REACT_APP_API_URL}/api/post`, init)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED");
            }
            return response.json();
        })
        .then((json) => addPostToArray(json));

        hideModal();
    }

    const showModal = async () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    const postStyle = {
        "width": "1000px"
    }

    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="d-grid gap-2" style={postStyle}>
                <button onClick={showModal} className="btn btn-lg text-white mt-3" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}>Add New Post</button>
            </div>
        </div>
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
                        <label htmlFor="plants" className="form-label mt-3">Plants:</label>
                        <select className="form-select" id="plants" onChange={(event) => (setPlantId(event.target.value))}>
                            <option value={0}>None</option>
                            {plants !== undefined ? (
                                plants.map(p => <option key={p.plantId} value={p.plantId}>{p.plantName}</option>)
                            ) : (
                                <>
                                </>
                            )};
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="form-label mt-3">Photo:</label>
                        <input type="text" placeholder="Add photo url" onChange={(event) => setPhoto(event.target.value)}></input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal} className="btn" style={{borderColor: 'rgba(133, 166, 141, 1)', color: 'rgba(133, 166, 141, 1)', marginLeft: '2%'}}>Cancel</button>
                <button onClick={handleSubmit} className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)', marginLeft: '2%'}}>Save</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddPost;