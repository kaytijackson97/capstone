import { useState, useContext, useHistory } from 'react';
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


    const deleteByUsername = async (evt) => {
        await fetch(`http://localhost:8080/api/planter/${auth.currentUser.username}`, 
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

        console.log(auth.currentUser.firstName);

  
    }

 return (
  <>
  <button onClick={showModal} className="dropdown-item flex-row" style={{color: 'green', textDecoration: 'none'}}>Delete</button>
  <Modal show={show} onHide={hideModal}>
      <Modal.Header>
      <Modal.Title>
        <h4 className="card-title">
        Delete Account: @{auth.currentUser.username}</h4>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete your account {auth.currentUser.firstName}?</Modal.Body>
      <Modal.Footer>
          <button onClick={hideModal} className="btn btn-outline-warning">No</button>
          <button onClick={deleteByUsername} className="btn btn-warning">Yes</button>
      </Modal.Footer>
  </Modal>
  </>
    );
}

export default DeleteUser;