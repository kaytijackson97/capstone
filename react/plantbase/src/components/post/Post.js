import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from 'react-rounded-image';

import { findPlanterByUsername } from '../../services/planter-api';
import { findPlantById } from '../../services/plant-api';

import ReplyApp from '../reply/ReplyApp';
import DeletePost from './DeletePost';
import LikeButton from '../like-button.png';
import CurrentUser from "../contexts/CurrentUser";
import EditPost from "./EditPost";

function Post( {post, plants, deletePostByPostId, editPostByPostId} ) {

    const defaultPlanter = {
        username: "",
        roleId: 2,
        firstName: "",
        lastName: "",
        email: ""
    }

    const defaultPlant = {
        plantId: 1,
        myGardenId: 1,
        plantDescription: "",
        photo: "",
        plantName: "",
        plantType: "",
        gotchaDate: ""
    }

    const [planter, setPlanter] = useState(defaultPlanter);
    const [plant, setPlant] = useState(defaultPlant);
    let newCount = post.likeCount;
    const auth = useContext(CurrentUser);

    useEffect(() => {
        findPlanterByUsername(post.username)
            .then((data) => setPlanter(data))
    }, [post.username]);

    useEffect(() => {
        findPlantById(post.plantId)
            .then((data) => setPlant(data))
    }, [post.plantId]);

    const increaseLikeCount = () => {
        newCount = newCount + 1;
    }

    const updatePost = () => {
        const updatedPost = {
            postId: post.postId,
            username: post.username,
            plantId: post.plantId,
            gardenId: post.gardenId,
            caption: post.caption,
            photo: post.photo,
            datetimePosted: post.datetimePosted,
            likeCount: newCount
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(updatedPost),
        };
        
        fetch(`${process.env.REACT_APP_API_URL}/api/post/${post.postId}`, init)
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject("Post id not found");
                } else if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            });

        editPostByPostId(updatedPost);
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
                        <div>{post.datetimePosted}</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">
                            <Link to={`/my-garden/${planter.username}`} className="text-dark text-decoration-none">{planter.firstName} {planter.lastName}</Link>
                            <Link to={`/plantprofile/${plant.plantId}`} className="text-dark text-decoration-none"> | {plant.plantName}</Link></h4>
                        </div>
                        {((auth.currentUser.username === planter.username) || (auth.currentUser && auth.currentUser.hasRole("ROLE_ADMIN")))? (
                            <div className="col d-flex flex-row-reverse">
                                <EditPost post={post} plants={plants} editPostByPostId={editPostByPostId}/>
                                <DeletePost postId={post.postId} deletePostByPostId={deletePostByPostId}/>
                            </div>                                
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <p className="card-text">{post.caption}</p>
                    <div className="d-flex justify-content-center">
                        <div style={{ display: "flex" }}>
                        {post.photo == null || post.photo.trim().length === 0 ? (
                            <>
                            </>
                        ) : (
                            <ReactRoundedImage
                                image={post.photo}
                                roundedColor=""
                                imageWidth="500"
                                imageHeight="350"
                                roundedSize="8"
                                borderRadius="30"
                            />
                        )}
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button onClick={handleClick} className="btn btn-outline-light">
                            <img src={LikeButton} width="30px" alt="like"></img>
                        </button>
                    <div className="ml-3">
                        <p>{newCount}</p>
                    </div>
                    </div>
                    <ReplyApp postId={post.postId}/>
                </div>
            </div>
        </div>
    );
}

export default Post;