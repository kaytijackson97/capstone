import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from 'react-rounded-image';

import { updatePostById } from "../../services/post-api";
import { findPlanterById } from '../../services/planter-api';
import { findPlantById } from '../../services/plant-api';

import ReplyApp from '../reply/ReplyApp';
import DeletePost from '../post/DeletePost';
import LikeButton from '../like-button.png';

function Post( {postId, planterId, plantId, gardenId, caption, photo, datetimePosted, likeCount} ) {

    const defaultPlanter = {
        planterId: 0,
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
        planterId: planterId,
        plantId: plantId,
        gardenId: gardenId,
        caption: caption,
        photo: photo,
        datetimePosted: datetimePosted,
        likeCount: likeCount
    }

    const [planter, setPlanter] = useState(defaultPlanter);
    const [plant, setPlant] = useState(defaultPlant);
    const [newPost, setNewPost] = useState(defaultPost);
    const [newCount, setNewCount] = useState(0);
    const [deleteModal, setDeleteModal] = useState(true);

    useEffect(() => {
        findPlanterById(planterId)
            .then((data) => setPlanter(data))
    }, [planterId]);

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
            planterId: planterId,
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

    const handleDelete = () => {
        setDeleteModal(true)
        return (
            <DeletePost show={deleteModal} />
        );
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
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">
                            <Link to={`/my-garden/${planter.myGardenId}`} className="text-dark text-decoration-none">{planter.firstName} {planter.lastName}</Link>|
                            <Link to={`/plantprofile/${plant.plantId}`} className="text-dark text-decoration-none">{plant.plantName}</Link></h4>
                        </div>
                        <div className="col d-flex flex-row-reverse">
                            <DeletePost />
                        </div>
                    </div>
                    <p className="card-text">{caption}</p>
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