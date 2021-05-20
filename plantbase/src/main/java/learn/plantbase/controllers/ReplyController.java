package learn.plantbase.controllers;

import learn.plantbase.domain.ReplyService;
import learn.plantbase.domain.Result;
import learn.plantbase.domain.ResultType;
import learn.plantbase.models.Post;
import learn.plantbase.models.Reply;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/reply")
public class ReplyController {

    private final ReplyService service;

    public ReplyController(ReplyService service) {
        this.service = service;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Object> findByPostId(@PathVariable int postId) {
        List<Reply> replies = service.findByPostId(postId);
        if (replies.size() <= 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    @GetMapping("/{replyId}")
    public ResponseEntity<Object> findById(@PathVariable int replyId) {
        Reply reply = service.findById(replyId);
        if (reply == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(reply, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> addReply(@RequestBody @Valid Reply reply, BindingResult results) {
        if (results.hasErrors()) {
            return new ResponseEntity<>(results.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        Result<Reply> result = service.addReply(reply);

        if (result.getType() != ResultType.SUCCESS) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @PutMapping("/{replyId}")
    public ResponseEntity<Object> editReply(@PathVariable int replyId, @RequestBody @Valid Reply reply,
                                            BindingResult results) {
        if (replyId != reply.getReplyId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Reply> result = service.editReply(reply);

        if (results.hasErrors()) {
            return new ResponseEntity<>(results.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        if (result.getType() != ResultType.SUCCESS) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<Object> deleteById(@PathVariable int replyId) {
        if (service.deleteById(replyId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
