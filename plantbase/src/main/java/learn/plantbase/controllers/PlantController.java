package learn.plantbase.controllers;

import learn.plantbase.domain.PlantService;
import learn.plantbase.domain.Result;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Plant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/plants")
public class PlantController {

    private final PlantService service;

    public PlantController(PlantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Plant> findAll() { return service.findAll(); }

    @GetMapping("/{plantId}")
    public ResponseEntity<Plant> findById(@PathVariable int plantId) {
        Plant plant = service.findById(plantId);
        if (plantId == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else  if (plant == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(plant);
    }

    @GetMapping("/byMyGarden/{myGardenId}")
    public ResponseEntity<Object> findByMyGardenId(@PathVariable int myGardenId) {
        List<Plant> plants = service.findByMyGardenId(myGardenId);
        if (myGardenId == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else if (plants.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(plants);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody @Valid Plant plant, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<Plant> result = service.add(plant);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{plantId}")
    public ResponseEntity<Object> update(@PathVariable int plantId, @RequestBody @Valid Plant plant,
                                         BindingResult bindingResult) {
        if (plantId != plant.getPlantId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        Result<Plant> result = service.edit(plant);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{plantId}")
    public ResponseEntity<Void> deleteById(@PathVariable int plantId) {
        if (service.deleteById(plantId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
