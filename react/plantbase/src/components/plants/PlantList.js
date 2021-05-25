import Plant from './Plant';
import { Link } from 'react-router-dom';
import AddPlant from './AddPlant';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import Messages from '../Messages';

function PlantList({plants = [], setPlants, myGardenId }) {
    const auth = useContext(CurrentUser);
    const [messages, setMessages] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const history = useHistory();

    const navStyle = {
        color: 'green',
        'text-decoration': 'none'
    };

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
        await fetch(`http://localhost:8080/api/plants`, init)
        .then(response => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED.");
            }
            return response.json();
            })
            .then(json => setPlants([...plants, json]))
            .then(() => {
                history.push( setMessages("Confirmation ✅ - Plant added successfully 👍🏻"));
              })
              .catch(() => {
                history.push( setMessages("Error - Plant was not added 👎🏻" ));
              })
            // .then(() => {
            //     history.push(`/my-garden/${auth.currentUser.userId}`);
            
    }

    function addForm() {
        if (showAddForm === true) {
            return (
                <div>
                    <AddPlant addPlant={addPlant} setShowAddForm={setShowAddForm} myGardenId={myGardenId}/>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="card bg-success">
                <h2 className="card-header bg-light card-title text-center" style={navStyle}>Plant List</h2>
                <div className="row card-body text-center">
                    {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p} myGardenId={myGardenId}/> ))}
                    <button onClick={() => setShowAddForm(true)} className="btn btn-lg btn-light mt-3 text-center" style={{ color: 'green', alignSelf: 'center', marginBottom: '10px', marginTop: '10px', marginLeft: '40px', textAlign: 'center', maxHeight: '200px', maxWidth: '60px' }}><strong>+</strong></button>
                    {addForm()}
                </div>
                <div className="row">
                </div>
            </div>
        </div>
    );
}

export default PlantList;