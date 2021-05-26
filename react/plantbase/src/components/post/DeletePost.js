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
        <button onClick={showModal} className="btn text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)', marginLeft: '2%', maxHeight: '50px'}}><img src="https://gis.littleelm.org/gismaps/images/close-icon.png" width="20px" alt='cancel'></img></button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title>Stop!</Modal.Title>
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