import Reply from "./Reply";

function ReplyList( {replies, deleteReplyByReplyId, editReplyByReplyId} ) {
    if (replies !== undefined) {
        return(
            <div>
            {replies.map(r => ( <Reply key={r.replyId} 
                reply={r}
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