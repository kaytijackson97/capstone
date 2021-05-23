package learn.plantbase.data;

import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Planter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
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
        Planter planter = repository.findByUsername("john_smith");
        assertNotNull(planter);
    }

    @Test
    void shouldNotFindMissingPlanter() {
        Planter planter = repository.findByUsername("invalid_username");
        assertNull(planter);
    }

    @Test
    void shouldFindAllPlanters() {
        List<Planter> planters = repository.findAll();
        assertNotNull(planters);
    }

    @Test
    void shouldAddPlanter() {
        Planter planter = makeNewPlanter("bob_riley");
        Planter actual = repository.addPlanter(planter);
        System.out.println(planter);
        System.out.println(actual);
        assertEquals(actual, planter);

        List<Planter> planters = repository.findAll();
        assertTrue(planters.size() >= 2);
    }

    @Test

    void shouldNotAddNullPlanter() {
        Planter planter = repository.addPlanter(null);
        assertNull(planter);
    }

    @Test
    void shouldEditPlanterWithValidPlanter() {
        Planter planter = repository.findByUsername("john_smith");
        planter.setFirstName("Riley");
        assertTrue(repository.editPlanter(planter));
    }

    @Test
    void shouldNotEditPlanterWithInvalidPlanter() {
        Planter actual = new Planter();
        actual.setRoleId(1);
        actual.setFirstName("Robert");
        actual.setLastName("Fall");
        actual.setEmail("robertf@aol.com");
        actual.setUsername(null);
        boolean success = repository.editPlanter(actual);
        assertFalse(success);
    }

    @Test
    void shouldNotEditIfNull() {
        assertFalse(repository.editPlanter(null));
    }

    @Test
    void shouldDeleteByValidPlanter() {
        assertTrue(repository.deleteByUsername("bob_riley"));
    }

    @Test
    void shouldNotDeleteWithInvalidPlanter() {
        assertFalse(repository.deleteByUsername("invalid_username"));
    }

    private Planter makeNewPlanter(String name) {
        Planter planter = new Planter();
        planter.setUsername(name);

        planter.setRoleId(1);
        planter.setFirstName("Bob");
        planter.setLastName("Riley");
        planter.setEmail("bob.riley@aol.com");
        return planter;
    }
}
