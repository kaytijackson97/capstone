package learn.plantbase.data;

import learn.plantbase.models.Planter;

import java.util.List;

public interface PlanterRepository {

    List<Planter> findAll();

    Planter findByPlanter(int planterId);

    Planter addPlanter(Planter planter);

    boolean editPlanter(Planter planter);

    boolean deleteByPlanter(int planterId);

}
