import { useState } from "react";
import { addReply } from "../../services/reply-api";

function AddReply( {postId} ) {
    //change datetime from hard coded
    //change planterId from hard coded
    const [reply, setReply] = useState("");
    // const [dateTime, setDateTime] = useState("");
    
    const handleSubmit = async (event) => {
        const newReply = {
            planterId: 1,
            postId: postId,
            reply: reply,
            datetimePosted: "2021-05-18T06:43:18",
            likeCount: 0
        }

        addReply(newReply);
        
    }

    // const makeDate = () => {
    //     let now = new Date(); 
    //     let datetime = now.getFullYear() + "/"
    //                     + now.getMonth() + "/"
    //                     + (now.getDate()+1)  + "T" 
    //                     + now.getHours() + ":"  
    //                     + now.getMinutes() + ":" 
    // } 

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