import Reply from "./Reply";

function ReplyList( {replies} ) {
    return(
        <div>
            {replies.map(r => ( <Reply key={r.replyId} 
            userId={r.userId} 
            reply={r.reply}
            datetimePosted={r.datetimePosted}
            likeCount={r.likeCount}/>))}
        </div>
    );
}

export default ReplyList;