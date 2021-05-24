import Reply from "./Reply";

function ReplyList( {replies, deleteReplyByReplyId, editReplyByReplyId} ) {
    if (replies !== undefined) {
        return(
            <div>
            {replies.map(r => ( <Reply key={r.replyId} 
                replyId={r.replyId}
                username={r.username} 
                postId={r.postId}
                reply={r.reply}
                datetimePosted={r.datetimePosted}
                likeCount={r.likeCount}
                deleteReplyByReplyId={deleteReplyByReplyId}
                editReplyByReplyId={editReplyByReplyId}/>))}
            </div>
        );
    }

    return(
        <>
        </>
    );
}

export default ReplyList;