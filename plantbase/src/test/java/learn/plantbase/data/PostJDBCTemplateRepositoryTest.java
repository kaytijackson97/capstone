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
        Post post = repository.findById(1);
        assertNotNull(post);
        assertEquals(1, post.getUserId());
    }

    @Test
    void shouldNotFindByIdIfValid() {
        Post post = repository.findById(10);
        assertNull(post);
    }

    @Test
    void shouldFindAllPostsByValidUser() {
        List<Post> posts = repository.findByUserId(1);
        assertNotNull(posts);
        assertEquals(1, posts.size());
    }

    @Test
    void shouldNotFindAnyPostsIfInvalidUser() {
        List<Post> posts = repository.findByUserId(10);
        assertNotNull(posts);
        assertEquals(0, posts.size());
    }

    @Test
    void shouldAddIfValid() {
        
    }

    @Test
    void shouldNotAddIfNull() {
        Post post = repository.addPost(null);
        assertNull(post);
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