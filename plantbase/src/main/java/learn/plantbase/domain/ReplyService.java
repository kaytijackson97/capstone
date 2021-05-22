package learn.plantbase.domain;

import learn.plantbase.data.PostRepository;
import learn.plantbase.data.ReplyRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {

    private final ReplyRepository repository;
    private final PlanterRepository planterRepository;
    private final PostRepository postRepository;

    public ReplyService(ReplyRepository repository, PlanterRepository planterRepository, PostRepository postRepository) {
        this.repository = repository;
        this.planterRepository = planterRepository;
        this.postRepository = postRepository;
    }

    public Reply findById(int replyId) {
        return repository.findById(replyId);
    }

    public List<Reply> findByPostId(int postId) {
        return repository.findByPostId(postId);
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

    public Result<Reply> editReply(Reply reply) {
        Result<Reply> result = validateReply(reply);
        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }
        Reply originalReply = repository.findById(reply.getReplyId());
        hasDifferentIds(result, originalReply.getUsername(), reply.getUsername(), "Cannot change planter id.");
        hasDifferentIds(result, originalReply.getPostId(), reply.getPostId(), "Cannot change post id.");

        if (!originalReply.getDatetimePosted().equals(reply.getDatetimePosted())) {
            result.addMessage("Cannot change datetimePosted.", ResultType.INVALID);
            return result;
        }

        if (result.getType() != ResultType.SUCCESS) {
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

        List<Planter> planters = planterRepository.findAll();
        boolean planterExists = planters.stream()
                .anyMatch(i -> i.getPlanterId() == reply.getUsername());

        if (!planterExists) {
            result.addMessage("Invalid planter id", ResultType.INVALID);
            return result;
        }

        List<Post> posts = postRepository.findAll();
        boolean postExists = posts.stream()
                .anyMatch(i -> i.getPostId() == reply.getPostId());

        if (!postExists) {
            result.addMessage("Invalid post id", ResultType.INVALID);
            return result;
        }

        return result;
    }

    private boolean hasValue(int id) {
        return id > 0;
    }
    private Result<Reply> hasDifferentIds(Result<Reply> result, int originalId, int newId, String error) {
        if (originalId != newId) {
            result.addMessage(error, ResultType.INVALID);
        }

        return result;
    }
}
