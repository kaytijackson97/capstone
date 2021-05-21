import { useState, useEffect, useContext } from 'react';
import { addPlant } from '../../services/plant-api';
import CurrentUser from '../contexts/CurrentUser';
import PlantList from './PlantList';

function PlantApp() {
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    useEffect(() => {
        fetch("http://localhost:8080/api/plants")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Plants fetch failed.")
                }
                return response.json();
            })
            .then(json => setPlants(json))
            .catch(console.log);
    }, []);

    //add plant fetch
    const addPlant = (plant) => {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
        } 
    }

    return (
        <div>
            <PlantList plants={plants} addPlant={addPlant}/>
        </div>
    );
}

export default PlantApp;