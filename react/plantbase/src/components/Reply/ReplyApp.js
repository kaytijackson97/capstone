import { useEffect, useState } from "react";
import { findRepliesByPost } from "../../services/api";
import ReplyList from '../reply/ReplyList';

function ReplyApp( {postId} ) {
    const [replies, setReplies] = useState([]);
    useEffect(() => {
        findRepliesByPost(postId)
            .then((data) => setReplies(data));
    }, [postId])

    return(
    <div className="card bg-light mb-3">
        <ReplyList replies={replies}/>
    </div>
    );
}

export default ReplyApp;