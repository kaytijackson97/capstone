package learn.plantbase.controllers;

import learn.plantbase.domain.ReplyService;
import learn.plantbase.domain.Result;
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
    public List<Reply> findByPostId(@PathVariable int postId) {
        return service.findByPostId(postId);
    }

    @GetMapping("/{replyId}")
    public Reply findById(@PathVariable int replyId) {
        return service.findById(replyId);
    }

    @PostMapping
    public ResponseEntity<Object> addReply(@RequestBody @Valid Reply reply, BindingResult results) {
        Result<Reply> result = service.addReply(reply);
        if (results.hasErrors()) {
            return new ResponseEntity<>(results.getAllErrors(), HttpStatus.BAD_REQUEST);
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

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<Object> deleteById(@PathVariable int postId) {
        if (service.deleteById(postId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
