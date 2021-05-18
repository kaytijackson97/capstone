package learn.plantbase.data;

import learn.plantbase.models.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostJDBCTemplateRepositoryTest {

    final static int NEXT_ID = 4;
    final static LocalDateTime DATE_TIME_POSTED = LocalDateTime.now();

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
        Post post = makeNewPost();
        Post actual = repository.addPost(post);
        List<Post> posts = repository.findAll();
        assertEquals(actual, post);
        assertEquals(2, posts.size());
    }

    @Test
    void shouldNotAddIfNull() {
        Post post = repository.addPost(null);
        assertNull(post);
    }
//
//    @Test
//    void shouldEditIfValid() {
//        Post post.
//    }
//
//    @Test
//    void shouldNotEditIfInvalidPostId() {
//
//    }
//
//    @Test
//    void shouldNotEditUserId() {
//
//    }
//
//    @Test
//    void shouldNotEditPostId() {
//
//    }
//
//    @Test
//    void shouldNotEditGardenId() {
//
//    }
//
//    @Test
//    void shouldNotEditDateTimePosted() {
//
//    }
//
//    @Test
//    void shouldNotEditLikeCount() {
//
//    }
//
//    @Test
//    void shouldDeleteIfValidId() {
//
//    }
//
//    @Test
//    void shouldNotDeleteIfInvalidId() {
//
//    }

    private Post makeNewPost() {
        Post post = new Post();
        post.setPostId(2);
        post.setUserId(1);
        post.setGardenId(1);
        post.setPlantId(1);
        post.setCaption("test caption");
        post.setPhoto("testPhoto.png");
        post.setDatetimePosted(DATE_TIME_POSTED);
        post.setLikeCount(0);
        return post;
    }
}