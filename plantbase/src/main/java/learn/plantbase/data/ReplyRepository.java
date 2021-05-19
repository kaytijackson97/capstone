package learn.plantbase.data;

import learn.plantbase.models.Reply;

import java.util.List;

public interface ReplyRepository {
    List<Reply> findByPostId(int postId);

    Reply findById(int replyId);

    Reply addReply(Reply reply);

    boolean editReply(Reply reply);

    boolean deleteById(int replyId);
}
