package learn.plantbase.controllers;

import learn.plantbase.domain.GardenService;
import learn.plantbase.models.Garden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/garden")
public class GardenController {
    private final GardenService service;

    public GardenController(GardenService service) {
        this.service = service;
    }

    @GetMapping
    public List<Garden> findAll() { return service.findAll(); }

    @GetMapping("{gardenId}")
    public ResponseEntity<Garden> findById(@PathVariable int gardenId) {
        Garden garden = service.findById(gardenId);
        if (garden == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(garden);
    }

}
