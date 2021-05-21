import { useEffect, useState } from "react";
import { findPostById, findReplyById, findUserById } from "../../services/user-api";

function Reply({replyId, userId, postId, reply, datetimePosted, likeCount}) {

    const defaultUser = {
        userId: 0,
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [user, setUser] = useState(defaultUser);
    const [newLikeCount, setNewLikeCount] = useState(likeCount);

    useEffect(() => {
        findUserById(userId)
            .then((data) => setUser(data))
    }, [userId]);

    const increaseLikeCount = () => {
        setNewLikeCount(newLikeCount + 1)
        console.log(newLikeCount);
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