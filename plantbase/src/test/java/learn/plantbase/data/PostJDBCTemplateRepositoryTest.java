package learn.plantbase.data;

import learn.plantbase.models.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

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
        List<Post> all = repository.findAll();
        assertEquals(1, all.size());
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

    @Test
    void shouldNotEditUserId() {

    }

    @Test
    void shouldNotEditPostId() {

    }

    @Test
    void shouldNotEditGardenId() {

    }

    @Test
    void shouldNotEditDateTimePosted() {

    }

    @Test
    void shouldNotEditLikeCount() {

    }

    @Test
    void shouldDeleteIfValidId() {

    }

    @Test
    void shouldNotDeleteIfInvalidId() {

    }
}