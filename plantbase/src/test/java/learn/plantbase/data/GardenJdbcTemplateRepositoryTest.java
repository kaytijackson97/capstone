package learn.plantbase.data;

import learn.plantbase.models.Garden;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GardenJdbcTemplateRepositoryTest {
    @Autowired
    GardenRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindAll() {
        List<Garden> gardens = repository.findAll();
        assertNotNull(gardens);
    }

    @Test
    void shouldFindOne() {
        List<Garden> gardens = repository.findAll();
        assertEquals(1, gardens.size());
    }

    @Test
    void shouldFindGardenWithId1() {
        Garden garden = repository.findById(1);
        assertEquals(1, garden.getGardenId());
    }
}