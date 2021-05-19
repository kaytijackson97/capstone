package learn.plantbase.controllers;

import learn.plantbase.domain.ReplyService;
import learn.plantbase.models.Reply;
import org.springframework.web.bind.annotation.*;

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
}
