import { useEffect, useState } from "react";

import { findPlantById, findUserById } from '../../services/api';
import ReplyApp from "../reply/ReplyApp";

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

    const [user, setUser] = useState(defaultUser);
    const [plant, setPlant] = useState(defaultPlant);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        findUserById(post.userId)
            .then((data) => setUser(data))
    }, [post.userId]);

    useEffect(() => {
        findPlantById(post.plantId)
            .then((data) => setPlant(data))
    }, [post.plantId]);

    const increaseLikeCount = () => {
        setLikeCount(likeCount + 1)
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
            <div className="card bg-light mb-3" style={postStyle}>
                <div className="card-header">
                    <div className="d-flex flex-row-reverse">
                        <div>{post.datetimePosted}</div>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="card-title">{user.firstName} {user.lastName} | {plant.plantName}</h4>
                    <p class="card-text">{post.caption}</p>
                    <button onClick={increaseLikeCount}></button>
                    <ReplyApp postId={post.postId}/>
                </div>
            </div>
        </div>
    );
}

export default Post;