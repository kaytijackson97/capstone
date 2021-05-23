import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../contexts/CurrentUser';
import PlantList from './PlantList';

function PlantApp() {
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    const history = useHistory();

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

    // //add plant fetch
    // const addPlant = (plant) => {
    //     const init = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": `Bearer ${auth.token}`
    //         },
    //         body: JSON.stringify(plant)
    //     };
    //     fetch("http://localhost:8080/api/plants", init)
    //     .then(response => {
    //         if (response.status !== 201) {
    //             return Promise.reject("response is not 201 CREATED.");
    //         }
    //         return response.json();
    //         })
    //         .then(json => setPlants([...plants, json]))
    //         .then(() => {
    //             history.push(`/my-garden/${auth.currentUser.userId}`);
    //         })
    //         .catch(console.log);
    // }

    //edit plant fetch

    return (
        <div>
            <PlantList plants={plants} setPlants={setPlants}/>
        </div>
    );
}

export default PlantApp;