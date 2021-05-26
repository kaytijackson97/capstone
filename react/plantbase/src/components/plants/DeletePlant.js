import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function DeletePlant( {plantId, deletePlant} ) {
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    const handleDelete = () => {
        deletePlant(plantId);
        hideModal();
    }

    return(
        <>
        <button onClick={showModal} className="btn" style={{backgroundColor: 'rgba(150, 51, 42, 1)', marginLeft: '0.5%'}}><img src="https://gis.littleelm.org/gismaps/images/close-icon.png" width="20px" alt='cancel'></img></button>
        <Modal show={show} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title><div className="text-center">⚠️ Caution! ⚠️</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this plant?</Modal.Body>
            <Modal.Footer>
                <button className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}} onClick={hideModal}>No</button>
                <button className="btn text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)', marginLeft: '0.5%'}} onClick={handleDelete}>Yes</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeletePlant;