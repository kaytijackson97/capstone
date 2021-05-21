package learn.plantbase.data;

import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Plant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MyGardenJdbcTemplateRepositoryTest {
    @Autowired
    MyGardenRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindAll() {
        List<MyGarden> myGardenList = repository.findAll();
        assertNotNull(myGardenList);
    }

    @Test
    void shouldFindFive() {
        List<MyGarden> myGardenList = repository.findAll();
        assertEquals(4, myGardenList.size());
    }

    @Test
    void shouldFindValidId() {
        MyGarden myGarden = repository.findById(3);
        assertNotNull(myGarden);
    }

    @Test
    void shouldFindGardenNameFromValidId() {
        MyGarden myGarden = repository.findById(1);
        assertEquals("John", myGarden.getGardenName());
    }

    @Test
    void shouldNotFindInvalidId() {
        MyGarden myGarden = repository.findById(100);
        assertNull(myGarden);
    }

    @Test
    void shouldFindMyGardenForPlanterId() {
        MyGarden myGarden = repository.findByPlanter(3);
        assertNotNull(myGarden);
    }

    @Test
    void shouldNotFindMyGardenIfInvalidPlanterId() {
        MyGarden myGarden = repository.findByPlanter(100);
        assertNull(myGarden);
    }

    @Test
    void shouldAddMyGarden() {
        MyGarden myGarden = makeMyGarden();
        MyGarden actual = repository.addMyGarden(myGarden);
        assertEquals(5, actual.getMyGardenId());
    }

    @Test
    void shouldNotAddNullMyGarden() {
        MyGarden actual = repository.addMyGarden(null);
        assertNull(actual);
    }

    @Test
    void shouldDeleteByValidId() {
        assertTrue(repository.deleteById(4));
    }

    @Test
    void shouldNotDeleteWithInvalidId() {
        assertFalse(repository.deleteById(100));
    }

    MyGarden makeMyGarden() {
        MyGarden myGarden = new MyGarden();
        myGarden.setMyGardenId(2);
        myGarden.setGardenName("Rachel");
        myGarden.setPhoto("image.png");
        myGarden.setBio("Welcome to my garden");
        myGarden.setPlanterId(3);
        myGarden.setPlants(new ArrayList<>());
        return myGarden;
    }
}