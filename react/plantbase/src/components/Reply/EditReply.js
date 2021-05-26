import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { findPlanterByUsername } from '../../services/planter-api';
import EditIcon from '../plants/edit-icon.png';

import CurrentUser from "../contexts/CurrentUser";

function EditReply({reply, editReplyByReplyId}) {
    const defaultPlanter = {
        username: "",
        roleId: 2,
        firstName: "",
        lastName: "",
        email: ""
    }
    
    const auth = useContext(CurrentUser);
    const [show, setShow] = useState(false);
    const [planter, setPlanter] = useState(defaultPlanter);
    const [newReply, setNewReply] = useState(reply);

    useEffect(() => {
        findPlanterByUsername(reply.username)
            .then((data) => setPlanter(data))
    }, [reply.username])

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const updatedReply = {
            replyId: reply.replyId,
            username: reply.username,
            postId: reply.postId,
            reply: newReply,
            datetimePosted: reply.datetimePosted,
            likeCount: reply.likeCount
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(updatedReply)
        };
    
        fetch(`${process.env.REACT_APP_API_URL}/api/reply/${reply.replyId}`, init)
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject("Post id not found");
                } else if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            })
            .then(() => {
                editReplyByReplyId(updatedReply);
            })

        hideModal();
    }

    const showModal = async () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    return (
        <>
        <button onClick={showModal} className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)', marginLeft: '2%', maxHeight: '50px'}}>
        <img src={EditIcon} alt="edit" width='20px'/>
        </button>
        <form onSubmit={handleSubmit}>
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
                            <label htmlFor="caption" className="form-label mt-3">Reply:</label>
                            <input type="text" placeholder="Show off your plant!" defaultValue={reply.reply} onChange={(event) => setNewReply(event.target.value)}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>Save</button>
                </Modal.Footer>
            </Modal>
        </form>
        </>
    );
}

export default EditReply;