package learn.plantbase.controllers;

import learn.plantbase.domain.MyGardenService;
import learn.plantbase.domain.Result;
import learn.plantbase.models.MyGarden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/my-garden")
public class MyGardenController {

    private final MyGardenService service;

    public MyGardenController(MyGardenService service) {
        this.service = service;
    }

    @GetMapping
    public List<MyGarden> findAll() { return service.findAll(); }

    @GetMapping("/{myGardenId}")
    public ResponseEntity<MyGarden> findById(@PathVariable int myGardenId) {
        MyGarden myGarden = service.findById(myGardenId);
        if (myGarden == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(myGarden);
    }

    @GetMapping("/from-planter/{username}")
    public ResponseEntity<MyGarden> findByPlanter(@PathVariable String username) {
        MyGarden myGarden = service.findByPlanter(username);
        if (myGarden == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(myGarden);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody @Valid MyGarden myGarden,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<MyGarden> result = service.add(myGarden);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{myGardenId}")
    public ResponseEntity<Object> update(@PathVariable int myGardenId,
        @RequestBody @Valid MyGarden myGarden, BindingResult bindingResult) {
        if (myGardenId != myGarden.getMyGardenId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<MyGarden> result = service.edit(myGarden);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{myGardenId}")
    public ResponseEntity<Void> deleteById(@PathVariable int myGardenId) {
        if (service.deleteById(myGardenId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
