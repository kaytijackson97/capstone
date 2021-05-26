import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteReplyById } from '../../services/reply-api';
import CurrentUser from '../contexts/CurrentUser';

function DeleteReply( {replyId, deleteReplyByReplyId} ) {
    const [show, setShow] = useState(false);
    const auth = useContext(CurrentUser);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    const handleDelete = () => {
        const init = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth.currentUser.token}`
            }
        };

        fetch(`${process.env.REACT_APP_API_URL}/api/reply/${replyId}`, init)
            .then((response) => {
                if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            });
            
        deleteReplyByReplyId(replyId);
        hideModal();
    }

    return(
        <>
        <button onClick={showModal} className="btn text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)', marginLeft: '2%', maxHeight: '50px'}}><img src="https://gis.littleelm.org/gismaps/images/close-icon.png" width="20px" alt='cancel'></img></button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title><div className="text-center">⚠️ Caution! ⚠️</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this reply?</Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal}>No</button>
                <button onClick={handleDelete}>Yes</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeleteReply;