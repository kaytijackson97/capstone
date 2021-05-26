import { useContext, useState } from "react";
import CurrentUser from "../contexts/CurrentUser";
import Send from '../send-arrow.png';

function AddReply( {postId, addReplyToArray} ) {
    const [reply, setReply] = useState("");
    const auth = useContext(CurrentUser);
    const now = new Date();

    const nowAsLocalDateTime = 
        now.getFullYear() + "-" + 
        ("0" + (now.getMonth() + 1)).slice(-2) + "-" + 
        ("0" + now.getDate()).slice(-2) + "T" + 
        ("0" + (now.getHours())).slice(-2)  + ":" + 
        ("0" + now.getMinutes()).slice(-2)  + ":" + 
        ("0" + now.getSeconds()).slice(-2) ;
    
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
                "Authorization": `Bearer ${auth.currentUser.token}`
            },
            body: JSON.stringify(newReply)
        };

        fetch(`${process.env.REACT_APP_API_URL}/api/reply`, init)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.reject("response is not 201 CREATED");
            }
            return response.json();
        })
        .then((json) => addReplyToArray(json));
        setReply('');
    }

    const postStyle = {
        "width": "1000px"
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3" style={postStyle}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" onChange={(event) => setReply(event.target.value)} placeholder="Water the garden with words of love! <3" aria-label="comment" aria-describedby="basic-addon2" required/>
                            <div className="input-group-append">
                                <button type="submit" className="btn text-white" style={{backgroundColor: 'rgba(133, 166, 141, 1)', marginLeft: '2%'}}>
                                <img src={Send} alt="send" width='30px'/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddReply;