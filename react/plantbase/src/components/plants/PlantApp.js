import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import PlantList from './PlantList';

function PlantApp({myGarden}) {
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    const history = useHistory();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/plants/byMyGarden/${myGarden.myGardenId}`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Plants fetch failed.")
                }
                return response.json();
            })
            .then(json => setPlants(json))
            .catch(console.log);
    }, [myGarden.myGardenId]);

    function editPlantByPlantId(plant) {
        const newPlants = [];
        for(const p of plants ) {
            if (p.plantId !== plant.plantId) {
                newPlants.push(p);
            } else {
                newPlants.push(plant)
            }
        }

        setPlants(newPlants);
    }

    return (
        <div className="mt-3 mb-3">
            <PlantList plants={plants} setPlants={setPlants} myGardenId={myGarden.myGardenId} editPlantByPlantId={editPlantByPlantId}/>
        </div>
    );
}

export default PlantApp;