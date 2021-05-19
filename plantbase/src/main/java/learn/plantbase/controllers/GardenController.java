package learn.plantbase.controllers;

import learn.plantbase.domain.GardenService;
import learn.plantbase.models.Garden;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/garden")
public class GardenController {
    private final GardenService service;

    public GardenController(GardenService service) {
        this.service = service;
    }

    @GetMapping
    public List<Garden> findAll() { return service.findAll(); }

    @GetMapping("{gardenId}")
    public Garden findById(@PathVariable int gardenId) { return service.findById(gardenId); }

}
