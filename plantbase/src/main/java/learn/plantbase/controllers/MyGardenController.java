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
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/my-garden")
public class MyGardenController {

    private final MyGardenService service;

    public MyGardenController(MyGardenService service) {
        this.service = service;
    }

    @GetMapping
    public List<MyGarden> findAll() { return service.findAll(); }

    @GetMapping("/{myGardenId}")
    public MyGarden findById(@PathVariable int myGardenId) { return service.findById(myGardenId); }

    @GetMapping("/from-user/{userId}")
    public MyGarden findByUser(@PathVariable int userId) { return service.findByUser(userId); }

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
}
