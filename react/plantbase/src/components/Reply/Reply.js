import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findPlanterByUsername } from "../../services/planter-api";
import DeleteReply from './DeleteReply';

function Reply({replyId, username, reply, datetimePosted, likeCount, deleteReplyByReplyId}) {
    const defaultPlanter = {
        username: "",
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [planter, setPlanter] = useState(defaultPlanter);
    const [newLikeCount, setNewLikeCount] = useState(likeCount);

    useEffect(() => {
        findPlanterByUsername(username)
            .then((data) => setPlanter(data))
    }, [username]);

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
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Link to={`/my-garden/${planter.myGardenId}`} className="text-dark text-decoration-none">
                            <h6 className="card-title">{planter.firstName} {planter.lastName}</h6>
                        </Link>
                    </div>
                    <div className="col d-flex flex-row-reverse">
                        <DeleteReply replyId={replyId} deleteReplyByReplyId={deleteReplyByReplyId}/>
                    </div>
                </div>
                <p className="card-text">{reply}</p>
                <button onClick={increaseLikeCount}></button>
            </div>
        </div>
    );
}

export default Reply;