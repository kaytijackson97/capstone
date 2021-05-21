package learn.plantbase.controllers;

import learn.plantbase.domain.PostService;
import learn.plantbase.domain.Result;
import learn.plantbase.domain.ResultType;
import learn.plantbase.models.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/post")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping
    public List<Post> findAll(){
        return service.findAll();
    }

    @GetMapping("/planter/{planterId}")
    public ResponseEntity<Object> findByPlanterId(@PathVariable int planterId) {
        List<Post> posts = service.findByUserId(planterId);
        if (posts.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<Object> findByPlantId(@PathVariable int plantId) {
        List<Post> posts = service.findByPlantId(plantId);
        if (posts.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> findById(@PathVariable int postId) {
        Post post = service.findById(postId);
        if (post == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> addPost(@RequestBody @Valid Post post, BindingResult results) {
        if (results.hasErrors()) {
            return new ResponseEntity<>(results.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        Result<Post> result = service.addPost(post);
        if (result.getType() != ResultType.SUCCESS) {
            return ErrorResponse.build(result);
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Object> editPost(@PathVariable int postId, @RequestBody @Valid Post post,
                                           BindingResult results) {
        if (postId != post.getPostId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Post> result = service.editPost(post);

        if (results.hasErrors()) {
            return new ResponseEntity<>(results.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        if (result.getType() != ResultType.SUCCESS) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Object> deleteById(@PathVariable int postId) {
        if (service.deleteById(postId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
