import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import PlantList from './PlantList';

function PlantApp({myGarden}) {
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/plants/byMyGarden/${myGarden.myGardenId}`)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Plants fetch failed.")
                }
                return response.json();
            })
            .then(json => setPlants(json))
            .catch(console.log);
    }, [myGarden.myGardenId]);

    return (
        <div className="mt-3 mb-3">
            <PlantList plants={plants} setPlants={setPlants} myGardenId={myGarden.myGardenId}/>
        </div>
    );
}

export default PlantApp;