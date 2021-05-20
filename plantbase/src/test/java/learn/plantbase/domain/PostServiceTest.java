package learn.plantbase.domain;

import learn.plantbase.data.*;
import learn.plantbase.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostServiceTest {

    private static final LocalDateTime DATE_TIME_POSTED = LocalDateTime.of(2019, Month.MARCH, 28, 14, 33, 48);

    @Autowired
    PostService service;

    @MockBean
    PostRepository repository;

    @MockBean
    UserRepository userRepository;

    @MockBean
    GardenRepository gardenRepository;

    @MockBean
    PlantRepository plantRepository;

    @Test
    void shouldFindAll() {
        Post expected = makeNewPost(1);
        when(repository.findAll()).thenReturn(List.of(expected));
        List<Post> actual = service.findAll();
        assertEquals(1, actual.size());
    }

    @Test
    void shouldFindByIdIfValidId() {
        Post expected = makeNewPost(1);
        when(repository.findById(1)).thenReturn(expected);
        Post actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByIdIfInvalidId() {
        Post actual = service.findById(5);
        assertNull(actual);
    }

    @Test
    void shouldAddIfValid() {
        Post expected = makeNewPost(0);
        Result<Post> actual = service.addPost(expected);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddNull() {
        Result<Post> actual = service.addPost(null);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfPostIdIsSet() {
        Post expected = makeNewPost(1);
        Result<Post> actual = service.addPost(expected);
        assertEquals("Post id cannot be set", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfRepositoryAddFailed() {
        Post expected = makeNewPost(0);
        when(repository.addPost(expected)).thenReturn(null);
        Result<Post> actual = service.addPost(expected);
        assertEquals("Add failed", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfInvalidUserId() {
        Post expected = makeNewPost(0);
        expected.setUserId(10);

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfInvalidPlantId() {
        Post expected = makeNewPost(0);
        expected.setPlantId(10);

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfInvalidGardenId() {
        Post expected = makeNewPost(0);
        expected.setGardenId(10);

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfNullCaption() {
        Post expected = makeNewPost(0);
        expected.setCaption(null);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Post>> violations = validator.validate(expected);

        assertEquals(2, violations.size());
    }

    @Test
    void shouldNotAddIfInvalidPhotoType() {
        Post expected = makeNewPost(0);
        expected.setPhoto("test");

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Invalid image type", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfDateTimeInFuture() {
        Post expected = makeNewPost(0);
        expected.setDatetimePosted(LocalDateTime.now().plusWeeks(10));

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Post>> violations = validator.validate(expected);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotAddIfLikeCountIsSet() {
        Post expected = makeNewPost(0);
        expected.setLikeCount(10);

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldEditIfValid() {
        Post post = makeNewPost(1);
        when(repository.editPost(post)).thenReturn(true);
        when(repository.findById(1)).thenReturn(post);
        post.setCaption("new test caption for edit.");

        Result<Post> actual = service.editPost(post);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfNull() {
        Result<Post> actual = service.editPost(null);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfRepositoryEditFailed() {
        Post post = makeNewPost(1);
        when(repository.editPost(post)).thenReturn(false);
        when(repository.findById(1)).thenReturn(post);

        Result<Post> actual = service.editPost(post);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfUserIdIsChanged() {
        Post post = makeNewPost(1);
        when(repository.findById(1)).thenReturn(post);

        Post updatedPost = makeNewPost(1);
        updatedPost.setUserId(2);
        when(repository.editPost(post)).thenReturn(true);

        User user1 = new User();
        user1.setUserId(1);

        User user2 = new User();
        user2.setUserId(2);
        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        Result<Post> actual = service.editPost(updatedPost);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change user.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfPlantIdIsChanged() {
        Post post = makeNewPost(1);
        when(repository.findById(1)).thenReturn(post);

        Post updatedPost = makeNewPost(1);
        updatedPost.setPlantId(2);
        when(repository.editPost(post)).thenReturn(true);

        Plant plant1 = new Plant();
        plant1.setPlantId(1);

        Plant plant2 = new Plant();
        plant2.setPlantId(2);
        when(plantRepository.findAll()).thenReturn(List.of(plant1, plant2));

        Result<Post> actual = service.editPost(updatedPost);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change plant.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfGardenIdIsChanged() {
        Post post = makeNewPost(1);
        when(repository.findById(1)).thenReturn(post);

        Post updatedPost = makeNewPost(1);
        updatedPost.setGardenId(2);
        when(repository.editPost(post)).thenReturn(true);

        Garden garden1 = new Garden();
        garden1.setGardenId(1);

        Garden garden2 = new Garden();
        garden2.setGardenId(2);
        when(gardenRepository.findAll()).thenReturn(List.of(garden1, garden2));

        Result<Post> actual = service.editPost(updatedPost);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change garden.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfDateTimePostedIsChanged() {
        Post post = makeNewPost(1);
        when(repository.findById(1)).thenReturn(post);

        Post updatedPost = makeNewPost(1);
        updatedPost.setDatetimePosted(DATE_TIME_POSTED.minusDays(10));
        when(repository.editPost(post)).thenReturn(true);

        Result<Post> actual = service.editPost(updatedPost);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change datetimePosted.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfLikeCountIsChanged() {
        Post post = makeNewPost(1);
        when(repository.findById(1)).thenReturn(post);

        Post updatedPost = makeNewPost(1);
        updatedPost.setLikeCount(1000);
        when(repository.editPost(post)).thenReturn(true);

        Result<Post> actual = service.editPost(updatedPost);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change like count.", actual.getMessages().get(0));
    }

    @Test
    void shouldDeleteIfValidId() {
        when(repository.deletePost(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        when(repository.deletePost(1)).thenReturn(false);
        assertFalse(service.deleteById(1));
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

        when(repository.addPost(post)).thenReturn(post);

        User user = new User();
        user.setUserId(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        Plant plant = new Plant();
        plant.setPlantId(1);
        when(plantRepository.findAll()).thenReturn(List.of(plant));

        Garden garden = new Garden();
        garden.setGardenId(1);
        when(gardenRepository.findAll()).thenReturn(List.of(garden));
        return post;
    }

}