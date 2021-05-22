import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findPlanterById } from "../../services/planter-api";

function Reply({planterId, reply, datetimePosted, likeCount}) {

    const defaultPlanter = {
        planterId: 0,
        roleId: 0,
        firstName: "",
        lastName: "",
        email: ""
    }

    const [planter, setPlanter] = useState(defaultPlanter);
    const [newLikeCount, setNewLikeCount] = useState(likeCount);

    useEffect(() => {
        findPlanterById(planterId)
            .then((data) => setPlanter(data))
    }, [planterId]);

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
                <Link to={`/my-garden/${planter.myGardenId}`} className="text-dark text-decoration-none">
                    <h6 className="card-title">{planter.firstName} {planter.lastName}</h6>
                </Link>
                <p className="card-text">{reply}</p>
                <button onClick={increaseLikeCount}></button>
            </div>
        </div>
    );
}

export default Reply;