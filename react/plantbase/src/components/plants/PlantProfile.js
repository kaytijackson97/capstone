import Post from '../post/Post';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";

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
    const [posts, setPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8080/api/plants/${plantId}`)
            .then(response => response.json())
            .then(data => setPlant(data))
            .catch(error => console.log(error));
    }, [plantId])

    const imageStyle = {
        alignSelf: 'center',
        'margin-bottom': '10px',
        'margin-left': '30px',
        'margin-top': '10px',
        'borderRadius': '10'
    }

    return (
        <div className="container">
            <div className="row">

            </div>
            <div className="row">
                <div className="card text-white bg-success mt-3">
                    <div className="row">
                        <div className="col">
                            <p className="card-body">Plant Name: {plant.plantName}</p>
                            <p className="card-body">Plant Type: {plant.plantType}</p>
                            <p className="card-body">Gotcha Date: {plant.gotchaDate}</p>
                            <p className="card-body">Plant Description: {plant.plantDescription}</p>
                        </div>
                        <div className="col">
                        <div style={{ display: "flex" }}>
                            <ReactRoundedImage
                            image={plant.photo}
                            roundedColor=""
                            imageWidth="500"
                            imageHeight="350"
                            roundedSize="8"
                            borderRadius="30"
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="card text-white bg-success mt-3">
                    <h2 className="card-header card-title">Related Posts</h2>
                <ul>
                    {/* list of posts that maps to post */}
                    <li>
                    {posts.map(p => (
                        <Post key={p.postId} posts={posts} post={p} />
                    ))}
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default PlantProfile;