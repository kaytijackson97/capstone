import { useEffect, useState } from "react";
import { findPostById, findReplyById, findUserById } from "../../services/api";

function Reply({replyId, userId, postId, reply, datetimePosted, likeCount}) {

    const defaultUser = {
        userId: 0,
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    // const defaultPost = {
    //     postId: 0,
    //     userId: 0,
    //     plantId: 0,
    //     caption: "",
    //     photo: "",
    //     datetimePosted: "",
    //     likeCount: 0
    // }

    const [user, setUser] = useState(defaultUser);
    // const [post, setPost] = useState(defaultPost);
    const [newLikeCount, setNewLikeCount] = useState(likeCount);

    // useEffect(() => {
    //     findReplyById(replyId)
    //         .then((data) => setReply(data))
    // }, [replyId]);

    useEffect(() => {
        findUserById(userId)
            .then((data) => setUser(data))
    }, [userId]);

    // useEffect(() => {
    //     findPostById(postId)
    //         .then((data) => setPost(data))
    // }, [postId]);

    const increaseLikeCount = () => {
        setNewLikeCount(newLikeCount + 1)
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-header">
                <div className="d-flex flex-row-reverse">
                    <div>{datetimePosted}</div>
                </div>
            </div>
            <div class="card-body">
                <h4 class="card-title">{user.firstName} {user.lastName}</h4>
                <p class="card-text">{reply}</p>
                <button onClick={increaseLikeCount}></button>
            </div>
        </div>
    );
}

export default Reply;