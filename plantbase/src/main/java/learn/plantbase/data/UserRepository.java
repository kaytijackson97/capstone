package learn.plantbase.data;

import learn.plantbase.models.Post;
import learn.plantbase.models.User;

import java.util.List;

public interface UserRepository {

    List<User> findAll();

    User findByUser(int userId);

    User addUser(User user);

    boolean editUser(User user);

    boolean deleteByUser(int userId);

}
