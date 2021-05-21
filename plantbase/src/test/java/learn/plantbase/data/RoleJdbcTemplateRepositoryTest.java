package learn.plantbase.data;

import learn.plantbase.models.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RoleJdbcTemplateRepositoryTest {

    @Autowired
    RoleJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllRoles() {
        List<Role> roles = repository.findAll();
        assertNotNull(roles);
    }

    @Test
    void shouldFindById() {
        Role role = repository.findByRoleId(1);
        assertNotNull(role);
    }

    @Test
    void shouldReturnNullIfInvalidId() {
        Role role = repository.findByRoleId(100);
        assertNull(role);
    }
}
