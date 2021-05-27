package learn.plantbase.data;

import learn.plantbase.models.Garden;

import java.util.List;

public interface GardenRepository {
    List<Garden> findAll();

    Garden findById(int gardenId);
}
