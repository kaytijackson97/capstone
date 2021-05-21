import ReactRoundedImage from "react-rounded-image";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PlantApp from "../plants/PlantApp";



function MyGardenApp() {
    const defaultMyGarden = {
        myGardenId: 0,
        gardenName: "Rachel",
        userId: 3,
        bio: "wowie wow",
        photo: "plant.jpeg",
        plants: []
    }

    const [myGarden, setMyGarden] = useState(defaultMyGarden);
    const { myGardenId } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/my-garden/${myGardenId}`)
            .then(response => response.json())
            .then(data => setMyGarden(data))
            .catch(error => console.log(error));
    }, [myGardenId])

    return (
        <div className="container">
            <div className="row">
            </div>
            <div className="row">
                <div className="card text-white bg-success mt-3">
                    <div className="row">
                        <div className="col">
                            <p className="card-body">My Garden Name: {myGarden.gardenName}</p>
                            <p className="card-body">Bio: {myGarden.bio}</p>
                        </div>
                        <div className="col">
                        <div style={{ display: "flex" }}>
                            <ReactRoundedImage
                            image={myGarden.photo}
                            roundedColor=""
                            imageWidth="500"
                            imageHeight="350"
                            roundedSize="8"
                            borderRadius="30"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <PlantApp/>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default MyGardenApp;