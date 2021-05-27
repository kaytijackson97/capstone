package learn.plantbase.data;

import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Plant;
import learn.plantbase.models.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
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
    void shouldFindMyGardenForUsername() {
        MyGarden myGarden = repository.findByPlanter("rcuccia");
        assertNotNull(myGarden);
    }

    @Test
    void shouldNotFindMyGardenIfInvalidUsername() {
        MyGarden myGarden = repository.findByPlanter(null);
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
    void shouldNotAddMyGardenIfFailedInDB() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setUsername(null);
        MyGarden actual = repository.addMyGarden(myGarden);
        assertNull(actual);
    }

    @Test
    void shouldEditIfValidMyGarden() {
        MyGarden myGarden = repository.findById(2);
        myGarden.setBio("new test bio");
        assertTrue(repository.editMyGarden(myGarden));
    }

    @Test
    void shouldNotEditIfInvalidMyGarden() {
        MyGarden myGarden = repository.findById(2);
        myGarden.setUsername(null);
        assertFalse(repository.editMyGarden(myGarden));
    }

    @Test
    void shouldNotEditIfMyGardenIdNull() {
        assertFalse(repository.editMyGarden(null));
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
        myGarden.setUsername("rcuccia");
        myGarden.setGardenName("Rachel");
        myGarden.setPhoto("image.png");
        myGarden.setBio("Welcome to my garden");
        myGarden.setPlants(new ArrayList<>());
        return myGarden;
    }
}