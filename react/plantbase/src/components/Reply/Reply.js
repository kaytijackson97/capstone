import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findUserById } from "../../services/user-api";

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
                <Link to={`/my-garden/${user.myGardenId}`} className="text-dark text-decoration-none">
                    <h6 class="card-title">{user.firstName} {user.lastName}</h6>
                </Link>
                <p class="card-text">{reply}</p>
                <button onClick={increaseLikeCount}></button>
            </div>
        </div>
    );
}

export default Reply;