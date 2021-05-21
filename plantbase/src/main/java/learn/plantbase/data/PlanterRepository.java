package learn.plantbase.data;

import learn.plantbase.models.Planter;

import java.util.List;

public interface PlanterRepository {

    List<Planter> findAll();

    Planter findByUser(int userId);

    Planter addUser(Planter user);

    boolean editUser(Planter user);

    boolean deleteByUser(int userId);

}
