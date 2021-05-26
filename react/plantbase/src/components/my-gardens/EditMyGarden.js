import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import Messages from '../Messages';

function EditMyGarden({myGarden, setShowEditForm}) {
    const defaultMyGarden = {
        myGardenId: myGarden.myGardenId,
        gardenName: myGarden.gardenName,
        username: myGarden.username,
        bio: myGarden.bio,
        photo: myGarden.photo,
        plants: myGarden.plants
    }
    
    const { username } = useParams();
    const [oldMyGarden, setOldMyGarden] = useState(defaultMyGarden);

    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    
    const [gardenName, setGardenName] = useState(oldMyGarden.gardenName);
    const [bio, setBio] = useState(oldMyGarden.bio);
    const [photo, setPhoto] = useState(oldMyGarden.photo);
    const [plants, setPlants] = useState(oldMyGarden.plants);
    const history = useHistory();
    const location = useLocation();

    const { state: { from } = { from : `/my-garden/${username}` } } = location;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/my-garden/from-planter/${username}`)
            .then(response => response.json())
            .then(data => setOldMyGarden(data))
            .catch(error => console.log(error));
    }, [username])

    const handleEditMyGarden = async (event) => {
        event.preventDefault();

        let myGarden = {};
        myGarden["myGardenId"] = oldMyGarden.myGardenId;
        myGarden["gardenName"] = gardenName;
        myGarden["username"] = username;
        myGarden["bio"] = bio;
        myGarden["photo"] = photo;
        myGarden["plants"] = oldMyGarden.plants;
        // auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
        console.log(myGarden);
        await editMyGarden(myGarden)
    
        // setShowEditForm(false);

        // ) : (console.log("denied"))
    }

    //update fetch
    const editMyGarden = async (myGarden) => {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(myGarden)
        };
        await fetch(`${process.env.REACT_APP_API_URL}/api/my-garden/${oldMyGarden.myGardenId}`, init)
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
              history.push('/edit-confirmation')
            })
              .catch((err) => {
                history.push(setShowEditForm(false));
              })
    }

    const returnToList = () => {
        setShowEditForm(false);
          // history.push(from);
    }

    const handleGardenNameChange = (event) => {
        setGardenName(event.target.value);
    }

    const handleBioChange = (event) => {
        setBio(event.target.value);
    }

    const handlePhotoChange = (event) => {
        setPhoto(event.target.value);
    }

    return (
    <div className="row">
      <form onSubmit={handleEditMyGarden}>
      <h2 className="card-header" style={{color: 'rgba(89, 107, 93, 1)'}}>Edit My Garden</h2>
        <div className="row form-group">
        <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="plantNameTextBox" defaultValue={oldMyGarden.gardenName} onChange={handleGardenNameChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantNameTextBox">My Garden Name:</label>
          </div>
        </div>
        <div className="row form-group">
        <div className="form-floating mb-3">
            <textarea style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="textarea" id="plantDescriptionTextBox" defaultValue={oldMyGarden.bio} onChange={handleBioChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantDescriptionTextBox">Bio:</label>
          </div>
          <div className="form-floating mb-3 col">
            <input style={{color: 'rgba(89, 107, 93, 1)'}} className="form-control" type="text" id="plantTypeTextBox" defaultValue={oldMyGarden.photo} onChange={handlePhotoChange}/>
            <label style={{color: 'rgba(133, 166, 141, 1)'}} htmlFor="plantTypeTextBox">Photo:</label>
          </div>
        </div>
        <div className="text-center d-grid gap-2">
          <button type="submit" className="btn btn-lg text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)'}}>Edit My Garden</button>
          <button onClick={returnToList} type="button" className="btn btn-lg text-white" style={{backgroundColor: 'rgba(150, 51, 42, 1)'}}>Cancel</button>
        </div>
      </form>
    </div>
    );
}



export default EditMyGarden;