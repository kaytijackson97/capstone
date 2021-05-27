package learn.plantbase.controllers;

import learn.plantbase.domain.Result;
import learn.plantbase.domain.PlanterService;
import learn.plantbase.models.Planter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/planter")
public class PlanterController {

    private final PlanterService service;

    public PlanterController(PlanterService service) {
        this.service = service;
    }

    @GetMapping
    public List<Planter> findAll() {
        return service.findAll();
    }

    @GetMapping("/{username}")
    public ResponseEntity<Planter> findByPlanter(@PathVariable String username) {
        Planter planter = service.findByPlanter(username);
        if (planter == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(planter);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody @Valid Planter planter, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<Planter> result = service.addPlanter(planter);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Object> edit(@PathVariable String username, @RequestBody @Valid Planter planter, BindingResult bindingResult) {
        if (!username.equals(planter.getUsername())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<Planter> result = service.editPlanter(planter);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteById(@PathVariable String username) {
        if (service.deleteByPlanter(username)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
