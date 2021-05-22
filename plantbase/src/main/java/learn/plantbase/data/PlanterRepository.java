package learn.plantbase.data;

import learn.plantbase.models.Planter;

import java.util.List;

public interface PlanterRepository {

    List<Planter> findAll();

    Planter findByUsername(String username);

    Planter addPlanter(Planter planter);

    boolean editPlanter(Planter planter);

    boolean deleteByUsername(String username);

}
