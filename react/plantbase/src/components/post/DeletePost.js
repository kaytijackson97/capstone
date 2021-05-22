import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deletePostById } from '../../services/post-api';

function DeletePost( {postId, deletePostByPostId} ) {
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    const handleDelete = () => {
        deletePostById(postId);
        deletePostByPostId(postId);
        hideModal();
    }

    return(
        <>
        <button onClick={showModal} className="btn btn-success">Delete</button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title>Stop!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
            <Modal.Footer>
                <button onClick={hideModal}>No</button>
                <button onClick={handleDelete}>Yes</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeletePost;