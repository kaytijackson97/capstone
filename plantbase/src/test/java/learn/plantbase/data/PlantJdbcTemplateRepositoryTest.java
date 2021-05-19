package learn.plantbase.data;

import learn.plantbase.models.Plant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PlantJdbcTemplateRepositoryTest {

    @Autowired
    PlantRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindValidId() {
        Plant plant = repository.findByPlantId(1);
        assertNotNull(plant);
    }

    @Test
    void shouldNotFindInvalidId() {
        Plant plant = repository.findByPlantId(100);
        assertNull(plant);
    }

    @Test
    void shouldFindAll() {
        List<Plant> plants = repository.findAll();
        assertNotNull(plants);
    }

    @Test
    void shouldFindListOfPlantsForGardenId() {
        List<Plant> plants = repository.findByGardenId(1);
        assertNotNull(plants);
    }

    @Test
    void shouldNotFindAnyPlantsIfInvalidGardenId() {
        List<Plant> plants = repository.findByGardenId(100);
        assertEquals(0, plants.size());
    }

    @Test
    void shouldAddPlant() {
        Plant plant = makePlant();
        Plant actual = repository.addPlant(plant);
        assertEquals(4, actual.getPlantId());
    }

    @Test
    void shouldNotAddNullPlant() {
        Plant actual = repository.addPlant(null);
        assertNull(actual);
    }

    @Test
    void shouldEditPlantWithValidId() {
        Plant plant = makePlant();
        plant.setPlantId(1);
    }

    @Test
    void shouldNotEditPlantWithInvalidId() {
        Plant actual = new Plant();
        actual.setMyGardenId(1);
        actual.setPlantDescription("pink");
        actual.setPhoto("test.png");
        actual.setPlantName("katy");
        actual.setPlantType("double flower flaming katy");
        actual.setGotchaDate(LocalDate.of(2021, 5, 13));
        actual.setPlantId(1000);
        boolean success = repository.editPlant(actual);
        assertFalse(success);
    }


    @Test
    void shouldDeleteByValidId() {
        assertTrue(repository.deleteById(2));
    }

    @Test
    void shouldNotDeleteWithInvalidId() {
        assertFalse(repository.deleteById(100));
    }

    private Plant makePlant() {
        Plant plant = new Plant();
        plant.setPlantDescription("test");
        plant.setPhoto("test.png");
        plant.setPlantName("testie");
        plant.setPlantType("bird of paradise");
        plant.setGotchaDate(LocalDate.now());
        plant.setMyGardenId(2);
        return plant;
    }

}