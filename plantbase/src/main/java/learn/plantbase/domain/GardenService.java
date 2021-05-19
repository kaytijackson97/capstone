package learn.plantbase.domain;

import learn.plantbase.data.GardenRepository;
import learn.plantbase.models.Garden;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GardenService {
    private final GardenRepository repository;

    public GardenService(GardenRepository repository) {
        this.repository = repository;
    }

    public List<Garden> findAll() { return repository.findAll(); }

    public Garden findById(int gardenId) { return repository.findById(gardenId); }
}
