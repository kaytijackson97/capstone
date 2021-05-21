import Reply from "./Reply";

function ReplyList( {replies} ) {
    return(
        <div>
            {replies.map(r => ( <Reply key={r.replyId} 
            replyId={r.replyId} 
            userId={r.userId} 
            postId={r.postId}
            reply={r.reply}
            datetimePosted={r.datetimePosted}
            likeCount={r.likeCount}/>))}
        </div>
    );
}

export default ReplyList;