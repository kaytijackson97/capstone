import { useState, useContext } from 'react';
import CurrentUser from '../contexts/CurrentUser';
import Modal from 'react-bootstrap/Modal';

function AddPlant({plants =[], setPlants, myGardenId}) {
    const auth = useContext(CurrentUser);
    const [plantDescription, setPlantDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [plantName, setPlantName] = useState("");
    const [plantType, setPlantType] = useState("");
    const [gotchaDate, setGotchaDate] = useState();
    const [show, setShow] = useState(false);

    const handleAddPlant = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let plant = {};
        plant["plantId"] = 0;
        plant["plantDescription"] = plantDescription;
        plant["photo"] = photo;
        plant["plantName"] = plantName;
        plant["plantType"] = plantType;
        plant["gotchaDate"] = gotchaDate;
        plant["myGardenId"] = myGardenId;
        addPlant(plant)
    }

    const handlePlantDescriptionChange = (event) => {
        setPlantDescription(event.target.value);
    }

    const handlePhotoChange = (event) => {
        setPhoto(event.target.value);
    }

    const handlePlantNameChange = (event) => {
        setPlantName(event.target.value);
    }

    const handlePlantTypeChange = (event) => {
        setPlantType(event.target.value);
    }

    const handleGotchaDateChange = (event) => {
        setGotchaDate(event.target.value);
    }

    //add plant fetch
    const addPlant = async (plant) => {
      const init = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${auth.currentUser.token}`
        },
        body: JSON.stringify(plant)
      };
      await fetch(`${process.env.REACT_APP_API_URL}/api/plants`, init)
      .then(response => {
          if (response.status !== 201) {
            return Promise.reject("response is not 201 CREATED.");
          }
          return response.json();
          })
          .then(json => setPlants([...plants, json]))

      hideModal();
    }

    const showModal = () => {
      setShow(true);
    };

    const hideModal = () => {
      setShow(false);
    };

    return (
      <>
      <div className="col"><button onClick={showModal} className="btn" style={{backgroundColor: 'rgba(133, 166, 141, 1)', color: 'white'}}>
          +
        </button></div>
        <Modal show={show} onHide={hideModal} >
            <Modal.Header style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(133, 166, 141, 1)', alignSelf: 'center'}}>
                <Modal.Title style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(133, 166, 141, 1)', alignSelf: 'center'}}>
                    <h4 className="card-title" >
                    Add a Plant
                    </h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(133, 166, 141, 1)', alignSelf: 'center'}}>
              <div className="container">
                <div className="card text-center  mb-3" >
                  <div className="card-body">
                    <form>
                      <div className="row form-group">
                        <div className="form-floating mb-3 col">
                          <input className="form-control" type="text" id="plantNameTextBox" placeholder="Plant Name:" onChange={handlePlantNameChange}/>
                          <label htmlFor="plantNameTextBox">Plant Name:</label>
                        </div> 
                        <div className="form-floating mb-3 col">
                          <input className="form-control" type="text" id="plantTypeTextBox" placeholder="Plant Type:" onChange={handlePlantTypeChange}/>
                          <label htmlFor="plantTypeTextBox">Plant Type:</label>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="form-floating mb-3 col">
                          <textarea className="form-control" type="textarea" id="plantDescriptionTextBox" placeholder="Plant Description:" onChange={handlePlantDescriptionChange}/>
                          <label htmlFor="plantDescriptionTextBox">Plant Description:</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-floating mb-3 col">
                          <input className="form-control" type="text" id="photoTextBox" placeholder="Photo:" onChange={handlePhotoChange}/>
                          <label htmlFor="photoTextBox">Photo:</label>
                        </div>
                        <div className="form-floating mb-3 col">
                          <input className="form-control" type="text" id="gotchaDateTextBox" placeholder="Gotcha Date:" onChange={handleGotchaDateChange}/>
                          <label htmlFor="gotchaDateTextBox" style={{fontSize: '14px'}}>Gotcha Date:</label>
                        </div>
                        <div className="form-floating mb-3 col">
                          <input className="form-control" type="text" id="myGardenIdTextBox" value={myGardenId} disabled={true}/>
                          <label htmlFor="myGardenIdTextBox" style={{fontSize: '13px'}}>My Garden Id:</label>
                        </div>
                      </div>
                      <div className="text-center row">
                        <div className="col">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'rgba(133, 166, 141, 1)', alignSelf: 'center'}}>
                <button onClick={hideModal} className="btn" style={{borderColor: 'rgba(133, 166, 141, 1)', color: 'rgba(133, 166, 141, 1)'}}>Cancel</button>
                <button onClick={handleAddPlant} className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}>Add Plant</button>
            </Modal.Footer>
        </Modal>
      </>
    );
}

export default AddPlant;