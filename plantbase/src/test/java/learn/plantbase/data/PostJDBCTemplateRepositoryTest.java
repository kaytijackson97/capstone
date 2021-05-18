package learn.plantbase.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostJDBCTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    PostJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll(){

    }

    @Test
    void shouldFindByIdIfValid() {

    }

    @Test
    void shouldNotFindByIdIfValid() {

    }

    @Test
    void shouldFindAllPostsByValidUser() {

    }

    @Test
    void shouldNotFindAnyPostsIfInvalidUser() {

    }

    @Test
    void shouldAddIfValid() {

    }

    @Test
    void shouldNotAddIfNull() {

    }

    @Test
    void shouldEditIfValid() {

    }

    @Test
    void shouldNotEditIfInvalidPostId() {
        
    }


}