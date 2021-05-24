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
    }, []);

    return (
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://static.vecteezy.com/system/resources/previews/000/142/515/non_2x/leafy-background-daun-vector.jpg)',
                'height': 'auto'
            }}>
        <div>
            <PlantList plants={plants} setPlants={setPlants}/>
        </div>
        </div>
    );
}

export default PlantApp;