import { useState, useContext } from 'react';
import CurrentUser from '../contexts/CurrentUser';
import Modal from 'react-bootstrap/Modal';


function DeleteUser( ) {

  const auth = useContext(CurrentUser);
  const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    const deleteUserByUsername = async () => {
      await deleteMyGardenByUsername();
      await deletePlanterByUsername();
    }

    const deleteMyGardenByUsername = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/api/my-garden/${auth.currentUser.myGarden.myGardenId}`, 
      { method: "DELETE",  headers: {"Authorization": `Bearer ${auth.currentUser.token}`}}
      )
        .then(response => {
          if (response.status === 204 || response.status === 404) {
        
          } else {
            return Promise.reject(`delete found with status ${response.status}`);
          }
        });
  }


    const deletePlanterByUsername = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/planter/${auth.currentUser.username}`, 
        { method: "DELETE",  headers: {"Authorization": `Bearer ${auth.currentUser.token}`}}
        )
          .then(response => {
            if (response.status === 204 || response.status === 404) {
          
            } else {
              return Promise.reject(`delete found with status ${response.status}`);
            }
          });
        
        auth.logout();

        hideModal();
    }

  return (
  <>
  <button onClick={showModal} className="btn btn-light text-center" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic', width: '125px'}}>Delete</button>
  <Modal show={show} onHide={hideModal}>
      <Modal.Header>
      <Modal.Title>
        <h4 className="card-title">
        Delete Account: @{auth.currentUser.username}</h4>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete your account {auth.currentUser.firstName}?</Modal.Body>
      <Modal.Footer>
          <button onClick={hideModal} className="btn" style={{color: 'rgba(150, 51, 42, 1)', borderColor: 'rgba(150, 51, 42, 1)'}}>No</button>
          <button onClick={deleteUserByUsername} className="btn text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)'}}>Yes</button>
      </Modal.Footer>
  </Modal>
  </>
    );
}

export default DeleteUser;