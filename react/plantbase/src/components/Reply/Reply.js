import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findPlanterByUsername } from "../../services/planter-api";
import DeleteReply from './DeleteReply';
import EditReply from './EditReply';

import LikeButton from '../like-button.png';
import CurrentUser from "../contexts/CurrentUser";

function Reply({replyId, username, postId, reply, datetimePosted, likeCount, deleteReplyByReplyId, editReplyByReplyId}) {
    const defaultPlanter = {
        username: "",
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [planter, setPlanter] = useState(defaultPlanter);
    let newCount = likeCount;
    const auth = useContext(CurrentUser);

    useEffect(() => {
        findPlanterByUsername(username)
            .then((data) => setPlanter(data))
    }, [username]);

    const increaseLikeCount = () => {
        newCount = newCount + 1;
    }

    const updateReply = () => {
        const updatedReply = {
            replyId: replyId,
            username: username,
            postId: postId,
            reply: reply,
            datetimePosted: datetimePosted,
            likeCount: newCount
        }
    
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(updatedReply)
        };
    
        fetch(`http://localhost:8080/api/reply/${replyId}`, init)
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject("Post id not found");
                } else if (response.status !== 204) {
                    return Promise.reject("response is not 204 NO_CONTENT");
                }
            })
            .then(() => {
                editReplyByReplyId(updatedReply);
            })
    }

    const handleClick = () => {
        increaseLikeCount();
        updateReply();
    }

    return (
        <div className="card bg-light mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col">{datetimePosted}</div>
                    <div className="col d-flex flex-row-reverse">
                        <EditReply replyId={replyId} username={username} postId={postId} reply={reply} datetimePosted={datetimePosted} likeCount={likeCount}  editReplyByReplyId={editReplyByReplyId} />
                        <DeleteReply replyId={replyId} deleteReplyByReplyId={deleteReplyByReplyId}/>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Link to={`/my-garden/${planter.myGardenId}`} className="text-dark text-decoration-none">
                            <h6 className="card-title">{planter.firstName} {planter.lastName}</h6>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <p className="col card-text">{reply}</p>
                    <div className="col d-flex flex-row-reverse">
                            <button onClick={handleClick} className="btn btn-outline-light">
                                <img src={LikeButton} width="30px" alt="like"></img>
                            </button>
                        <div className="ml-3">
                            <p>{newCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reply;