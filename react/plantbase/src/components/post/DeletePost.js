import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CurrentUser from '../contexts/CurrentUser';

function DeletePost( {postId, deletePostByPostId} ) {
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

        fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, init)
            .then((response) => {
                if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            });

        deletePostByPostId(postId);
        hideModal();
    }

    return(
        <>
        <button onClick={showModal} className="btn btn-success">Delete</button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title><div className="text-center">⚠️ Caution! ⚠️</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal} className="btn btn-outline-success">Cancel</button>
                <button onClick={handleDelete} className="btn btn-success">Delete</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeletePost;