import ReactRoundedImage from "react-rounded-image";
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PlantApp from "../plants/PlantApp";
import CurrentUser from "../contexts/CurrentUser";



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

    const auth = useContext(CurrentUser);

    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/my-garden/${auth.currentUser.id}`)
            .then(response => response.json())
            .then(data => setMyGarden(data))
            .catch(error => console.log(error));
    }, [auth.currentUser.id])

    return (
        <div
            className="bg-image"
            style={{
                'backgroundImage': 'url(https://static.vecteezy.com/system/resources/previews/000/142/515/non_2x/leafy-background-daun-vector.jpg)',
                'height': ' 110vh auto',
                'background-attachment': 'fixed'
            }}>
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
        </div>
    );
}

export default MyGardenApp;