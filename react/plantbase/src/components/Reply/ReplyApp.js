import { useEffect, useState } from "react";
import { findRepliesByPost } from "../../services/reply-api";
import ReplyList from '../reply/ReplyList';
import AddReply from "./AddReply";

function ReplyApp( {postId} ) {
    const [replies, setReplies] = useState([]);
    useEffect(() => {
        findRepliesByPost(postId)
            .then((data) => setReplies(data));
    }, [postId])

    return(
    <div className="card bg-light mb-3">
        <ReplyList replies={replies}/>
        <AddReply postId={postId}/>
    </div>
    );
}

export default ReplyApp;