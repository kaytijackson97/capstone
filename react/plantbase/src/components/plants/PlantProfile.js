import Plant from "./Plant";
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";

function PlantProfile() {
    const defaultPlant = {
    plantId: 0,
    plantDescription: "default",
    photo: "plant.png",
    plantName: "default",
    plantType: "default",
    gotchaDate: "2021-02-02",
    myGardenId: 1,
    posts: []
    }

    const { plantId } = useParams();
    const [plant, setPlant] = useState(defaultPlant);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.log(error));
    }, [plantId])

    return (
        <div className="container mt-3">
            <div className="row">

            </div>
            <div className="row">
                <div className="card">
                    <div className="row">
                        <div className="col">
                            <p className="card-body">Plant Name: {plant.plantName}</p>
                            <p className="card-body">Plant Type: {plant.plantType}</p>
                            <p className="card-body">Gotcha Date: {plant.gotchaDate}</p>
                            <p className="card-body">Plant Description: {plant.plantDescription}</p>
                        </div>
                        <div className="col">
                            <img src="{plant.photo}" style={{ alignSelf: 'center' }} alt="plant list item" width="20px"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <ul>
                    {/* list of posts that maps to post */}
                </ul>
            </div>
        </div>
    );
}

export default PlantProfile;