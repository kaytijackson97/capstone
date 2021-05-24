import { useState, useContext } from 'react';
import CurrentUser from '../contexts/CurrentUser';

function AddPlant({addPlant, setShowAddForm}) {
    const auth = useContext(CurrentUser);
    const [plantDescription, setPlantDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [plantName, setPlantName] = useState("");
    const [plantType, setPlantType] = useState("");
    const [gotchaDate, setGotchaDate] = useState();
    const [myGardenId, setMyGardenId] = useState(0);
    const [posts, setPosts] = useState([]);

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
        plant["posts"] = posts;
        // auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
        addPlant(plant)

        // ) : (console.log("denied"))
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

    const handleMyGardenIdChange = (event) => {
        setMyGardenId(event.target.value);
    }

    const handlePostsChange = (event) => {
        setPosts(event.target.value);
    }

    // const disableAddFormInputs = () => {
    //   return ((!auth.currentUser.hasRole("ADMIN")))
    // }

    return (
        <div className="container" style={{maxwidth: + 20}}>
            <div className="card text-center border-success mb-3" style={{color: 'green'}}>
      <h2 className="card-header card-title">
      <div className="col d-flex flex-row-reverse"><button onClick={() => setShowAddForm(false)} className="btn btn-lg btn-light mt-3 mb-3" style={{backgroundColor: 'green'}}>
      <img src="https://gis.littleelm.org/gismaps/images/close-icon.png" width="20px" alt='cancel'></img>
      </button></div>
      Add a Plant</h2>
      <div className="card-body">
      <form onSubmit={handleAddPlant}>
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
            <label htmlFor="gotchaDateTextBox">Gotcha Date:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="myGardenIdTextBox" placeholder="My Garden Id:" onChange={handleMyGardenIdChange}/>
            <label htmlFor="myGardenIdTextBox">My Garden Id:</label>
          </div>
        </div>
        <div className="text-center row">
        <div className="col">
        <button type="submit" className="btn btn-lg btn-success">Add Plant</button>
        </div>
        {/* <div className="col">
        <button onClick={() => setShowAddForm(false)} className="btn btn-lg btn-warning mt-3 mb-3">Cancel</button>
        </div> */}
        </div>
      </form>
      </div>
    </div>
        </div>
    );
}

export default AddPlant;