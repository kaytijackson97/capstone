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
        assertTrue(all.size() >= 2);
    }

    @Test
    void shouldFindByIdIfValid() {
        Post post = repository.findById(1);
        assertNotNull(post);
        assertEquals(1, post.getUserId());
        assertNotNull(post.getReplies());
    }

    @Test
    void shouldNotFindByIdIfValid() {
        Post post = repository.findById(5);
        assertNull(post);
    }

    @Test
    void shouldFindAllPostsByValidUser() {
        List<Post> posts = repository.findByUserId(1);
        assertNotNull(posts);
        assertTrue(posts.size() >= 1);
    }

    @Test
    void shouldNotFindAnyPostsIfInvalidUser() {
        List<Post> posts = repository.findByUserId(5);
        assertNotNull(posts);
        assertEquals(0, posts.size());
    }

    @Test
    void shouldFindAllPostsByValidPlant() {
        List<Post> posts = repository.findByPlantId(1);
        assertNotNull(posts);
        assertTrue(posts.size() >= 1);
    }

    @Test
    void shouldNotFindAnyPostsIfInvalidPlant() {
        List<Post> posts = repository.findByPlantId(5);
        assertNotNull(posts);
        assertEquals(0, posts.size());
    }

    @Test
    void shouldAddIfValid() {
        Post post = makeNewPost(4);
        Post actual = repository.addPost(post);
        assertEquals(actual, post);

        List<Post> posts = repository.findAll();
        assertTrue(posts.size() >= 2);
    }

    @Test
    void shouldNotAddIfNull() {
        Post post = repository.addPost(null);
        assertNull(post);
    }

    @Test
    void shouldEditIfValid() {
        Post post = repository.findById(2);
        post.setCaption("new test caption");
        assertTrue(repository.editPost(post));
    }

    @Test
    void shouldNotEditIfInvalidPostId() {
        Post post = makeNewPost(5);
        assertFalse(repository.editPost(post));
    }

    @Test
    void shouldNotEditIfNull() {
        assertFalse(repository.editPost(null));
    }

    @Test
    void shouldDeleteIfValidId() {
        assertTrue(repository.deletePost(3));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        assertFalse(repository.deletePost(5));
    }

    private Post makeNewPost(int postId) {
        Post post = new Post();
        post.setPostId(postId);
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