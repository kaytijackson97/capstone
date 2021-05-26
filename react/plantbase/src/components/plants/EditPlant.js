import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import Messages from '../Messages';

function EditPlant({plant, setShowEditForm}) {
    const defaultPlant = {
        plantId: plant.plantId,
        plantDescription: plant.plantDescription,
        photo: plant.photo,
        plantName: plant.plantName,
        plantType: plant.plantType,
        gotchaDate: plant.gotchaDate,
        myGardenId: plant.myGardenId,
        posts: plant.posts
        }
    
    const { plantId } = useParams();
    const [oldPlant, setOldPlant] = useState(defaultPlant);

    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    
    const [plantDescription, setPlantDescription] = useState(oldPlant.plantDescription);
    const [photo, setPhoto] = useState(oldPlant.photo);
    const [plantName, setPlantName] = useState(oldPlant.plantName);
    const [plantType, setPlantType] = useState(oldPlant.plantType);
    const [gotchaDate, setGotchaDate] = useState(oldPlant.gotchaDate);
    const [myGardenId, setMyGardenId] = useState(oldPlant.myGardenId);
    const [posts, setPosts] = useState(oldPlant.posts);
    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from : `/plantprofile/${plantId}` } } = location;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setOldPlant(data))
            .catch(error => console.log(error));
    }, [plantId])


    const handleEditPlant = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let plant = {};
        plant["plantId"] = plantId;
        plant["plantDescription"] = plantDescription;
        plant["photo"] = photo;
        plant["plantName"] = plantName;
        plant["plantType"] = plantType;
        plant["gotchaDate"] = gotchaDate;
        plant["myGardenId"] = myGardenId;
        plant["posts"] = oldPlant.posts;
        // auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
        console.log(plant);
        editPlant(plant)
        history.push(from);
        setShowEditForm(false);

        // ) : (console.log("denied"))
    }

    //update fetch
    const editPlant = async (plant) => {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(plant)
        };
        await fetch(`${process.env.REACT_APP_API_URL}/api/plants/${plantId}`, init)
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
              history.push(from, setMessages("Confirmation ✅ - Plant edited successfully 👍🏻"));
            })
              .catch((err) => {
                history.push(setMessages("Error - Plant was not edited 👎🏻 " + err));
              })
    }

    const returnToList = () => {
      setShowEditForm(false);
        // history.push(from);
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
            <div className="card  text-center border-success mb-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)', color: 'white'}}>
            <Messages messages={messages}/>
      <h2 className="card-title" style={{color: 'rgba(89, 107, 93, 1)'}}>Edit {oldPlant.plantName}</h2>
      <div className="card-body">
      <form onSubmit={handleEditPlant}>
        <div className="row form-group">
        <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="plantNameTextBox" defaultValue={oldPlant.plantName} onChange={handlePlantNameChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantNameTextBox">Plant Name:</label>
          </div> 
          <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="plantTypeTextBox" defaultValue={oldPlant.plantType} onChange={handlePlantTypeChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantTypeTextBox">Plant Type:</label>
          </div>
        </div>
        <div className="row form-group">
        <div className="form-floating mb-3 col">
            <textarea style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="textarea" id="plantDescriptionTextBox" defaultValue={oldPlant.plantDescription} onChange={handlePlantDescriptionChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantDescriptionTextBox">Plant Description:</label>
          </div>
        </div>
        <div className="row">
        <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="photoTextBox" defaultValue={oldPlant.photo} onChange={handlePhotoChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="photoTextBox">Photo:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="gotchaDateTextBox" defaultValue={oldPlant.gotchaDate} onChange={handleGotchaDateChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="gotchaDateTextBox">Gotcha Date:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="myGardenIdTextBox" value={oldPlant.myGardenId} disabled={true} onChange={handleMyGardenIdChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="myGardenIdTextBox">My Garden Id:</label>
          </div>
        </div>
        <div className="text-center d-grid gap-2">
          <button type="submit" className="btn btn-lg text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}>Edit Plant</button>
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