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

    function editReplyByReplyId(reply) {
        const newReplies = [];
        for(const r of replies ) {
            if (r.replyId !== reply.replyId) {
                newReplies.push(r);
            } else {
                newReplies.push(reply)
            }
        }

        setReplies(newReplies);
    }

    function addReplyToArray(reply) {
        const newReplies = [...replies, reply];
        setReplies(newReplies);
    }

    return(
    <div className="mb-3" style={{fontFamily: 'Century Gothic'}}>
        <ReplyList replies={replies} deleteReplyByReplyId={deleteReplyByReplyId} editReplyByReplyId={editReplyByReplyId}/>
        <AddReply postId={postId} addReplyToArray={addReplyToArray}/>
    </div>
    );
}

export default ReplyApp;