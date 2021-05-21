import { useEffect, useState } from "react";

import { findUserById } from '../../services/user-api';
import { findPlantById } from '../../services/plant-api';
import ReplyApp from '../reply/ReplyApp';
import { Link } from "react-router-dom";
import { updatePostById } from "../../services/post-api";
import ReactRoundedImage from 'react-rounded-image';
import LikeButton from '../like-button.png';

function Post( {postId, userId, plantId, gardenId, caption, photo, datetimePosted, likeCount} ) {

    const defaultUser = {
        userId: 0,
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    const defaultPlant = {
        plantId: 0,
        myGardenId: 0,
        plantDescription: 0,
        photo: "",
        plantName: "",
        plantType: "",
        gotchaDate: ""
    }

    const defaultPost = {
        postId: postId,
        userId: userId,
        plantId: plantId,
        gardenId: gardenId,
        caption: caption,
        photo: photo,
        datetimePosted: datetimePosted,
        likeCount: likeCount
    }

    const [user, setUser] = useState(defaultUser);
    const [plant, setPlant] = useState(defaultPlant);
    const [newPost, setNewPost] = useState(defaultPost);
    const [newCount, setNewCount] = useState(0);

    useEffect(() => {
        findUserById(userId)
            .then((data) => setUser(data))
    }, [userId]);

    useEffect(() => {
        findPlantById(plantId)
            .then((data) => setPlant(data))
    }, [plantId]);

    const increaseLikeCount = () => {
        setNewCount(newCount + 1);
    }

    const updatePost = () => {
        const updatedPost = {
            postId: postId,
            userId: userId,
            plantId: plantId,
            gardenId: gardenId,
            caption: caption,
            photo: photo,
            datetimePosted: datetimePosted,
            likeCount: newCount
        }
        updatePostById(updatedPost, postId)
            .then(setNewPost(updatedPost));
    }

    const handleClick = () => {
        increaseLikeCount();
        updatePost();
    }

    const postStyle = {
        "width": "1000px"
    }

    return(
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3 mb-3" style={postStyle}>

                <div className="card-header">
                    <div className="d-flex flex-row-reverse">
                        <div>{datetimePosted}</div>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="card-title">
                    <Link to={`/my-garden/${user.myGardenId}`} className="text-dark text-decoration-none">{user.firstName} {user.lastName}</Link>|
                    <Link to={`/plantprofile/${plant.plantId}`} className="text-dark text-decoration-none">{plant.plantName}</Link></h4>
                    <p class="card-text">{caption}</p>
                    <div className="d-flex justify-content-center">
                        <div style={{ display: "flex" }}>
                            <ReactRoundedImage
                                image={photo}
                                roundedColor=""
                                imageWidth="500"
                                imageHeight="350"
                                roundedSize="8"
                                borderRadius="30"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button onClick={handleClick} className="btn btn-outline-light">
                            <img src={LikeButton} width="30px" alt="like"></img>
                            </button>
                        <div className="ml-3">
                            <p>{newPost.likeCount}</p>
                        </div>
                    </div>
                    <ReplyApp postId={postId}/>
                </div>
            </div>
        </div>
    );
}

export default Post;