package learn.plantbase.data;

import learn.plantbase.models.MyGarden;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
    void shouldFindOne() {
        List<MyGarden> myGardenList = repository.findAll();
        assertEquals(1, myGardenList.size());
    }

    @Test
    void shouldFindValidId() {
        MyGarden myGarden = repository.findById(1);
        assertNotNull(myGarden);
    }

    @Test
    void shouldFindGardenNameFromValidId() {
        MyGarden myGarden = repository.findById(1);
        assertEquals("John", myGarden.getGardenName());
    }


//            shouldNotFindInvalidId


//    shouldFindListOfPlantsForId


//            shouldNotFindAnyPlantsIfInvalidId


//    shouldAddMyGarden


//            shouldNotAddNullMyGarden


//    shouldNotAddMyGardenWithInvalidUser


//            shouldEditMyGardenWithValidId


//    shouldNotEditMyGardenWithInvalidId


//            shouldDeleteByValidId


//    shouldNotDeleteWithInvalidId

}