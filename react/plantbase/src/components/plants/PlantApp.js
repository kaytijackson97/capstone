import { useState, useEffect } from 'react';
import PlantList from './PlantList';

function PlantApp() {
    const [plants, setPlants] = useState([]);

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

    return (
        <div>
            <PlantList plants={plants}/>
        </div>
    );
}

export default PlantApp;