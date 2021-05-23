import Plant from './Plant';
import { Link } from 'react-router-dom';
import AddPlant from './AddPlant';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import Messages from '../Messages';

function PlantList({plants = [], setPlants }) {
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
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(plant)
        };
        await fetch("http://localhost:8080/api/plants", init)
        .then(response => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED.");
            }
            return response.json();
            })
            .then(json => setPlants([...plants, json]))
            .then(() => {
                history.push( setMessages("Confirmation ✅ - Agent added successfully 👍🏻"));
              })
              .catch(() => {
                history.push( setMessages("Error - Agent was not added 👎🏻" ));
              })
            // .then(() => {
            //     history.push(`/my-garden/${auth.currentUser.userId}`);
            
    }

    function addForm() {
        if (showAddForm === true) {
            return (
                <div>
                    <button onClick={() => setShowAddForm(false)} className="btn btn-lg btn-warning mt-3 mb-3">Cancel</button>
                    <AddPlant addPlant={addPlant}/>
                </div>
            );
        }
    }

    return (
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://static.vecteezy.com/system/resources/previews/000/142/515/non_2x/leafy-background-daun-vector.jpg)',
                'height': ' 110vh auto',
                'background-attachment': 'fixed'
            }}>
        <div className="container">
            <div className="card bg-success">
                <h2 className="card-header text-white bg-success card-title text-center" style={navStyle}>Plant List</h2>
                <div className="row card-body text-center">
                    {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p}/> ))}
                    <button onClick={() => setShowAddForm(true)} className="btn btn-lg btn-light mt-3">Add a Plant</button>
                    {addForm()}
                </div>
                <div className="row">
                </div>
            </div>
        </div>
        </div>
    );
}

export default PlantList;