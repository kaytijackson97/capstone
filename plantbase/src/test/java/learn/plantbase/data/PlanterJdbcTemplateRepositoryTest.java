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
        Planter planter = repository.findById(1);
        assertNotNull(planter);
    }

    @Test
    void shouldNotFindMissingPlanter() {
        Planter planter = repository.findById(100);
        assertNull(planter);
    }

    @Test
    void shouldFindAllPlanters() {
        List<Planter> planters = repository.findAll();
        assertNotNull(planters);
    }

    @Test
    void shouldAddPlanter() {
        Planter planter = makeNewPlanter(5);
        Planter actual = repository.addPlanter(planter);
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
    void shouldEditUserWithValidPlanter() {
        Planter planter = repository.findById(1);
        planter.setFirstName("Riley");
        assertTrue(repository.editPlanter(planter));
    }

    @Test
    void shouldNotEditUserWithInvalidPlanter() {
        Planter actual = new Planter();
        actual.setRoleId(1);
        actual.setFirstName("Robert");
        actual.setLastName("Fall");
        actual.setEmail("robertf@aol.com");
        actual.setPlanterId(100);
        boolean success = repository.editPlanter(actual);
        assertFalse(success);
    }

    @Test
    void shouldNotEditIfNull() {
        assertFalse(repository.editPlanter(null));
    }

    @Test
    void shouldDeleteByValidPlanter() {
        assertTrue(repository.deleteById(5));
    }

    @Test
    void shouldNotDeleteWithInvalidPlanter() {
        assertFalse(repository.deleteById(100));
    }

    private Planter makeNewPlanter(int planterId) {
        Planter planter = new Planter();
        planter.setPlanterId(planterId);
        planter.setPlanterId(1);
        planter.setRoleId(1);
        planter.setFirstName("Bob");
        planter.setLastName("Riley");
        planter.setEmail("bob.riley@aol.com");
        return planter;
    }
}
