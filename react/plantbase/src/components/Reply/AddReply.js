import { useContext, useState } from "react";
import CurrentUser from "../contexts/CurrentUser";

function AddReply( {postId, addReplyToArray} ) {
    const [reply, setReply] = useState("");
    const auth = useContext(CurrentUser);
    const now = new Date();

    const nowAsLocalDateTime = 
                now.getFullYear() + "-" + 
                ("0" + (now.getMonth() + 1)).slice(-2) + "-" + 
                ("0" + now.getDate()).slice(-2) + "T" + 
                now.getHours() + ":" + 
                now.getMinutes() + ":" + 
                now.getSeconds();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const newReply = {
            username: auth.currentUser.username,
            postId: postId,
            reply: reply,
            datetimePosted: nowAsLocalDateTime,
            likeCount: 0
        }

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(newReply),
            };
    
        fetch("http://localhost:8080/api/reply", init)
            .then((response) => {
                if (response.status !== 201) {
                    return Promise.reject("response is not 201 CREATED");
                }
            })
            .then(() => addReplyToArray(newReply));
        
    }

    const postStyle = {
        "width": "1000px"
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3" style={postStyle}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" size="850px" placeholder="Water the garden with words of love! <3" onChange={(event) => setReply(event.target.value)}></input>
                            <button type="submit" className="btn btn-success">Add Reply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddReply;