package learn.plantbase.data;

import learn.plantbase.models.Planter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class PlanterJdbcTemplateRepositoryTest {

    @Autowired
    PlanterJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindValidId() {
        Planter user = repository.findByUser(1);
        assertNotNull(user);
    }

    @Test
    void shouldNotFindMissingUser() {
        Planter user = repository.findByUser(100);
        assertNull(user);
    }

    @Test
    void shouldFindAllUsers() {
        List<Planter> users = repository.findAll();
        assertNotNull(users);
    }

    @Test
    void shouldAddUser() {
        Planter user = makeNewUser(5);
        Planter actual = repository.addUser(user);
        assertEquals(actual, user);

        List<Planter> users = repository.findAll();
        assertTrue(users.size() >= 2);
    }

    @Test
    void shouldNotAddNullUser() {
        Planter user = repository.addUser(null);
        assertNull(user);
    }

    @Test
    void shouldEditUserWithValidUser() {
        Planter user = repository.findByUser(1);
        user.setFirstName("Riley");
        assertTrue(repository.editUser(user));
    }

    @Test
    void shouldNotEditUserWithInvalidUser() {
        Planter actual = new Planter();
        actual.setRoleId(1);
        actual.setFirstName("Robert");
        actual.setLastName("Fall");
        actual.setEmail("robertf@aol.com");
        actual.setUserId(100);
        boolean success = repository.editUser(actual);
        assertFalse(success);
    }

    @Test
    void shouldNotEditIfNull() {
        assertFalse(repository.editUser(null));
    }

    @Test
    void shouldDeleteByValidUser() {
        assertTrue(repository.deleteByUser(5));
    }

    @Test
    void shouldNotDeleteWithInvalidUser() {
        assertFalse(repository.deleteByUser(100));
    }

    private Planter makeNewUser(int userId) {
        Planter user = new Planter();
        user.setUserId(userId);
        user.setUserId(1);
        user.setRoleId(1);
        user.setFirstName("Bob");
        user.setLastName("Riley");
        user.setEmail("bob.riley@aol.com");
        return user;
    }
}
