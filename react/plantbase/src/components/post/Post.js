import { useEffect, useState } from "react";

import { findUserById } from '../../services/user-api';
import { findPlantById } from '../../services/plant-api';
import ReplyApp from "../reply/ReplyApp";
import { Link } from "react-router-dom";
import { updatePostById } from "../../services/post-api";
import Redcup from '../redcup-plant.png';

function Post( {post} ) {

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

    // const defaultPost = {
    //     postId: post.postId,
    //     userId: post.userId,
    //     plantId: post.plantId,
    //     gardenId: post.gardenId,
    //     caption: post.caption,
    //     photo: post.photo,
    //     datetimePosted: post.datetimePosted,
    //     likeCount: post.likeCount
    // }

    const [user, setUser] = useState(defaultUser);
    const [plant, setPlant] = useState(defaultPlant);
    const [newPost, setNewPost] = useState(post);
    const [newCount, setNewCount] = useState(0);

    useEffect(() => {
        findUserById(post.userId)
            .then((data) => setUser(data))
    }, [post.userId]);

    useEffect(() => {
        findPlantById(post.plantId)
            .then((data) => setPlant(data))
    }, [post.plantId]);

    const increaseLikeCount = () => {
        setNewCount(newCount + 1);
    }

    const updatePost = () => {
        const updatedPost = {
            postId: post.postId,
            userId: post.userId,
            plantId: post.plantId,
            gardenId: post.gardenId,
            caption: post.caption,
            photo: post.photo,
            datetimePosted: post.datetimePosted,
            likeCount: newCount
        }
        updatePostById(updatedPost, post.postId)
            .then(setNewPost(updatedPost));
    }

    const handleClick = () => {
        increaseLikeCount();
        updatePost();
    }

    const postStyle = {
        "width": "1000px"
    }

    //Post needs:
    // caption
    // photo
    // datetime posted
    // like button
    // replies

    return(
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3 mb-3" style={postStyle}>

                <div className="card-header">
                    <div className="d-flex flex-row-reverse">
                        <div>{post.datetimePosted}</div>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="card-title">
                    <Link>{user.firstName} {user.lastName}</Link> 
                    | 
                    <Link to={`/plantprofile/${plant.plantId}`} className="text-dark text-decoration-none">{plant.plantName}</Link></h4>
                    <p class="card-text">{post.caption}</p>
                    <div className="d-flex justify-content-center">
                        <img src={Redcup} width="400px" alt="redcup plant"></img>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <div className="ml-3">
                            <p>{newPost.likeCount}</p>
                        </div>
                        <button onClick={handleClick}></button>
                    </div>
                    <ReplyApp postId={post.postId}/>
                </div>
            </div>
        </div>
    );
}

export default Post;