package learn.plantbase.data;

import learn.plantbase.models.Post;
import learn.plantbase.models.Role;
import learn.plantbase.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserJdbcTemplateRepositoryTest {

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindValidId() {
        User user = repository.findByUser(1);
        assertNotNull(user);
    }

    @Test
    void shouldNotFindMissingUser() {
        User user = repository.findByUser(100);
        assertNull(user);
    }

    @Test
    void shouldFindAllUsers() {
        List<User> users = repository.findAll();
        assertNotNull(users);
    }

    @Test
    void shouldAddUser() {
        User user = makeNewUser(5);
        User actual = repository.addUser(user);
        assertEquals(actual, user);

        List<User> users = repository.findAll();
        assertTrue(users.size() >= 2);
    }

    // TODO fail
    @Test
    void shouldNotAddNullUser() {
        User user = repository.addUser(null);
        assertNull(user);
    }

    @Test
    void shouldEditUserWithValidUser() {
        User user = repository.findByUser(1);
        user.setFirstName("Riley");
        assertTrue(repository.editUser(user));
    }

    // TODO fail
    @Test
    void shouldNotEditUserWithInvalidUser() {
        User user = makeNewUser(7);
        assertFalse(repository.editUser(user));
    }

    // TODO should not edit if null

    @Test
    void shouldDeleteByValidUser() {
        assertTrue(repository.deleteByUser(5));
    }

    @Test
    void shouldNotDeleteWithInvalidUser() {
        assertFalse(repository.deleteByUser(100));
    }

    private User makeNewUser(int userId) {
        User user = new User();
        user.setUserId(userId);
        user.setUserId(1);
        user.setRoleId(1);
        user.setFirstName("Bob");
        user.setLastName("Riley");
        user.setEmail("bob.riley@aol.com");
        return user;
    }
}
