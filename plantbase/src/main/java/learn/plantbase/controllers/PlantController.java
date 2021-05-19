package learn.plantbase.controllers;

import learn.plantbase.domain.PlantService;
import learn.plantbase.models.Plant;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/plants")
public class PlantController {

    private final PlantService service;

    public PlantController(PlantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Plant> findAll() { return service.findAll(); }

    @GetMapping("/{plantId}")
    public Plant findById(@PathVariable int plantId) { return service.findById(plantId); }

    @GetMapping("/byMyGarden/{myGardenId}")
    public List<Plant> findByMyGardenId(@PathVariable int myGardenId) { return service.findByMyGardenId(myGardenId); }


}
