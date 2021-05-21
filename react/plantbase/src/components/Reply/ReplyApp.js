import { useEffect, useState } from "react";
import { findRepliesByPost } from "../../services/reply-api";
<<<<<<< HEAD
import ReplyList from '../reply/ReplyList';
=======
import ReplyList from './ReplyList';
>>>>>>> ca4f7b403898c69b6f816017bc86753954e4a1b2

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