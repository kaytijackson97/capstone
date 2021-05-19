package learn.plantbase.data;

import learn.plantbase.models.Reply;

public interface ReplyRepository {
    Reply findById(int replyId);

    Reply addReply(Reply reply);

    boolean editReply(Reply reply);

    boolean deleteById(int replyId);
}
