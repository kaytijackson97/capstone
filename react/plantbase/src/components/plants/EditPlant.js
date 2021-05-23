import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import Messages from '../Messages';

function EditPlant() {
    const defaultPlant = {
        plantId: 0,
        plantDescription: "default",
        photo: "plant.png",
        plantName: "default",
        plantType: "default",
        gotchaDate: "2021-02-02",
        myGardenId: 1,
        posts: []
        }
    
    const { plantId } = useParams();
    const [oldPlant, setOldPlant] = useState(defaultPlant);

    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    const [plantDescription, setPlantDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [plantName, setPlantName] = useState("");
    const [plantType, setPlantType] = useState("");
    const [gotchaDate, setGotchaDate] = useState();
    const [myGardenId, setMyGardenId] = useState(0);
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from : `/plantprofile/${plantId}` } } = location;

    useEffect(() => {
        fetch(`http://localhost:8080/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setOldPlant(data))
            .catch(error => console.log(error));
    }, [plantId])


    const handleEditPlant = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let plant = {};
        plant["plantId"] = plantId;
        plant["plantDescription"] = oldPlant.plantDescription;
        plant["photo"] = oldPlant.photo;
        plant["plantName"] = oldPlant.plantName;
        plant["plantType"] = oldPlant.plantType;
        plant["gotchaDate"] = oldPlant.gotchaDate;
        plant["myGardenId"] = oldPlant.myGardenId;
        plant["posts"] = oldPlant.posts;
        // auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
            console.log(plant);
        editPlant(plant)

        // ) : (console.log("denied"))
    }

    //update fetch
    const editPlant = (plant) => {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(plant)
        };
        fetch(`http://localhost:8080/api/plants/${plant.plantId}`, init)
            .then(response => {
                if (response.status === 204) {
                  console.log("success.")
                } else if (response.status === 404) {
                    return Promise.reject("agent not found.")
                } else {
                    return Promise.reject(`Edit failed with status: ${response.status} `)
                }
            })
            .then(() => { 
              history.push(from, setMessages("Confirmation ✅ - Agent edited successfully 👍🏻"));
            })
              .catch((err) => {
                history.push(setMessages("Error - Agent was not edited 👎🏻 " + err));
              })
    }

    const returnToList = () => {
        history.push(from);
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


    return (
        <div>
            <div className="container">
            <div className="card  text-center border-success mb-3">
            <Messages messages={messages}/>
      <h2 className="card-header card-title">Edit {oldPlant.plantName}</h2>
      <div className="card-body">
      <form onSubmit={handleEditPlant}>
        <div className="row form-group">
        <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="plantNameTextBox" defaultValue={oldPlant.plantName} onChange={handlePlantNameChange}/>
            <label htmlFor="plantNameTextBox">Plant Name:</label>
          </div> 
          <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="plantTypeTextBox" defaultValue={oldPlant.plantType} onChange={handlePlantTypeChange}/>
            <label htmlFor="plantTypeTextBox">Plant Type:</label>
          </div>
        </div>
        <div className="row form-group">
        <div className="form-floating mb-3 col">
            <textarea className="form-control" type="textarea" id="plantDescriptionTextBox" defaultValue={oldPlant.plantDescription} onChange={handlePlantDescriptionChange}/>
            <label htmlFor="plantDescriptionTextBox">Plant Description:</label>
          </div>
        </div>
        <div className="row">
        <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="photoTextBox" defaultValue={oldPlant.photo} onChange={handlePhotoChange}/>
            <label htmlFor="photoTextBox">Photo:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="gotchaDateTextBox" defaultValue={oldPlant.gotchaDate} onChange={handleGotchaDateChange}/>
            <label htmlFor="gotchaDateTextBox">Gotcha Date:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input className="form-control" type="text" id="myGardenIdTextBox" value={oldPlant.myGardenId} disabled={true} onChange={handleMyGardenIdChange}/>
            <label htmlFor="myGardenIdTextBox">My Garden Id:</label>
          </div>
        </div>
        <div className="text-center d-grid gap-2">
          <button type="submit" className="btn btn-lg btn-success">Edit Plant</button>
          <button onClick={returnToList} type="button" className="btn btn-lg btn-warning">Cancel</button>
        </div>
      </form>
      </div>
    </div>
        </div>
        </div>
    );
}

export default EditPlant;