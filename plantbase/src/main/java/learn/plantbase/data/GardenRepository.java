package learn.plantbase.data;

import learn.plantbase.models.Garden;

import java.util.List;

public interface GardenRepository {
    public List<Garden> findAll();
}
