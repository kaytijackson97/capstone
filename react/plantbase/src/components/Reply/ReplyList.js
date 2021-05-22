import Reply from "./Reply";

function ReplyList( {replies, deleteReplyByReplyId} ) {
    return(
        <div>
            {replies.map(r => ( <Reply key={r.replyId} 
            replyId={r.replyId}
            planterId={r.planterId} 
            reply={r.reply}
            datetimePosted={r.datetimePosted}
            deleteReplyByReplyId={deleteReplyByReplyId}
            likeCount={r.likeCount}/>))}
        </div>
    );
}

export default ReplyList;