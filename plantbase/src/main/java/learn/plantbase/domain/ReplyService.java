package learn.plantbase.domain;

import learn.plantbase.data.PostRepository;
import learn.plantbase.data.ReplyRepository;
import learn.plantbase.data.UserRepository;
import learn.plantbase.models.*;

import java.util.List;

public class ReplyService {

    private final ReplyRepository repository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public ReplyService(ReplyRepository repository, UserRepository userRepository, PostRepository postRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public Reply findById(int replyId) {
        return repository.findById(replyId);
    }

    public Result<Reply> addReply(Reply reply) {
        Result<Reply> result = validateReply(reply);
        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }

        if (hasValue(reply.getReplyId())) {
            result.addMessage("Reply id cannot be set", ResultType.INVALID);
            return result;
        }

        if (hasValue(reply.getLikeCount())) {
            result.addMessage("Like count cannot be set", ResultType.INVALID);
            return result;
        }

        Reply addedReply = repository.addReply(reply);
        if (addedReply == null) {
            result.addMessage("Add failed", ResultType.INVALID);
            return result;
        }
        result.setPayload(addedReply);
        return result;
    }

    public Result<Reply> editPost(Reply reply) {
        Result<Reply> result = validateReply(reply);
        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }
        Reply originalReply = repository.findById(reply.getReplyId());
        if (originalReply.getUserId() != reply.getUserId()) {
            result.addMessage("Cannot change user id.", ResultType.INVALID);
            return result;
        }

        if (originalReply.getPostId() != reply.getPostId()) {
            result.addMessage("Cannot change post id.", ResultType.INVALID);
            return result;
        }

        if (originalReply.getDatetimePosted() != reply.getDatetimePosted()) {
            result.addMessage("Cannot change datetimePosted.", ResultType.INVALID);
            return result;
        }

        if (originalReply.getLikeCount() != reply.getLikeCount()) {
            result.addMessage("Cannot change like count.", ResultType.INVALID);
            return result;
        }

        boolean isSuccessful = repository.editReply(reply);
        if (!isSuccessful) {
            result.addMessage("Edit failed.", ResultType.INVALID);
        }

        return result;
    }

    public boolean deleteById(int replyId) {
        return repository.deleteById(replyId);
    }

    private Result<Reply> validateReply(Reply reply) {
        Result<Reply> result = new Result<>();

        if (reply == null) {
            result.addMessage("Reply cannot be null.", ResultType.INVALID);
            return result;
        }

        List<User> users = userRepository.findAll();
        boolean userExists = users.stream()
                .anyMatch(i -> i.getUserId() == reply.getUserId());

        if (!userExists) {
            result.addMessage("Invalid user id", ResultType.INVALID);
            return result;
        }

        List<Post> posts = postRepository.findAll();
        boolean postExists = posts.stream()
                .anyMatch(i -> i.getPostId() == reply.getPostId());

        if (!postExists) {
            result.addMessage("Invalid post id", ResultType.INVALID);
            return result;
        }

        if (isNullOrBlank(reply.getReply())) {
            result.addMessage("Reply cannot be null or blank", ResultType.INVALID);
            return result;
        }

        return result;
    }

    private boolean hasValue(int id) {
        return id > 0;
    }

    private boolean isNullOrBlank(String value) {
        return value == null || value.isBlank();
    }

}
