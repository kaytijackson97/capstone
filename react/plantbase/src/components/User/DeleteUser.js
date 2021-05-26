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

        console.log(auth.currentUser.firstName);

  
    }

 return (
  <>
  <button onClick={showModal} className="btn btn-light nav-link nav-item dropdown" style={{color: 'rgba(133, 166, 141, 1)', textDecoration: 'none', width: '115px'}}>Delete</button>
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
          <button onClick={deleteByUsername} className="btn text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)'}}>Yes</button>
      </Modal.Footer>
  </Modal>
  </>
    );
}

export default DeleteUser;