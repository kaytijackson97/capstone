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

    function deleteReplyByReplyId(replyId) {
        const newReplies = [];

        for(const reply of replies ) {
            if (reply.replyId !== replyId) {
                newReplies.push(reply);
            }
        }

        setReplies(newReplies);
    }

    return(
    <div className="card bg-light mb-3">
        <ReplyList replies={replies} deleteReplyByReplyId={deleteReplyByReplyId}/>
        <AddReply postId={postId}/>
    </div>
    );
}

export default ReplyApp;