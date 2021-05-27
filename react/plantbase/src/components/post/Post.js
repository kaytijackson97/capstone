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
        "width": "1000px", 'backgroundColor': 'rgba(255, 255, 255, 0.5)', 'backdropFilter': 'blur(3px)'
    }

    return(
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3 mb-3" style={postStyle}>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="card-title">
                            <Link to={`/my-garden/${planter.username}`} style={{fontFamily: 'Century Gothic'}} className="text-dark text-decoration-none">{planter.firstName} {planter.lastName}</Link>
                            <Link to={`/plantprofile/${plant.plantId}`} style={{fontFamily: 'Century Gothic'}} className="text-dark text-decoration-none"> | {plant.plantName}</Link></h4>
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
                    <div className="d-flex justify-content-center">
                        <div style={{ display: "flex" }}>
                        {post.photo == null || post.photo.trim().length === 0 ? (
                            <>
                            </>
                        ) : (
                            <img src={post.photo} alt="post" style={{width: '100%', objectFit: 'cover', marginTop: '2%', marginBottom: '2%'}}/>
                        )}
                        </div>
                    </div>
                    <div className="">
                        <button onClick={handleClick} className="btn btn-outline-light">
                            <img src={LikeButton} width="30px" alt="like"></img>
                        </button>
                    <div className="ml-3">
                        <p style={{fontFamily: 'Century Gothic'}}>Liked by {newCount} people</p>
                    </div>
                    </div>
                    <p className="card-title" style={{fontFamily: 'Century Gothic'}}><strong>
                            <Link to={`/my-garden/${planter.username}`} style={{fontFamily: 'Century Gothic'}} className="text-dark text-decoration-none">{planter.firstName} {planter.lastName}</Link>
                            <Link to={`/plantprofile/${plant.plantId}`} style={{fontFamily: 'Century Gothic'}} className="text-dark text-decoration-none"> | {plant.plantName}</Link></strong>
                    : {post.caption}</p>
                    </div>
                    <ReplyApp postId={post.postId}/>
                    <div className="">
                        <div style={{fontFamily: 'Century Gothic'}}>posted: {post.datetimePosted}</div>
                    </div>
                </div>
            </div>
    );
}

export default Post;