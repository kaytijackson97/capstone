package learn.plantbase.domain;

import learn.plantbase.data.*;
import learn.plantbase.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PostServiceTest {

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
    void shouldAddIfValid() {
        Post expected = makeNewPost(0);
        Result<Post> actual = service.addPost(expected);
        assertEquals(0, actual.getMessages().size());
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

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfInvalidPhotoType() {
        Post expected = makeNewPost(0);
        expected.setPhoto("test");

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Invalid image type", actual.getMessages().get(0));
    }

    //come back to after controller
//    @Test
//    void shouldNotAddIfDateTimeInFuture() {
//        Post expected = makeNewPost(0);
//        expected.setDatetimePosted(LocalDateTime.now().plusWeeks(10));
//
//        Result<Post> actual = service.addPost(expected);
//        assertEquals(1, actual.getMessages().size());
//    }

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

//    @Test
//    void shouldNotEditIfUserIdIsChanged() {
//        Post post = makeNewPost(1);
//        when(repository.editPost(post)).thenReturn(true);
//        when(repository.findById(1)).thenReturn(post);
//
//        User user1 = makeNewUser(1);
//        User user2 = makeNewUser(2);
//        when(userRepository.findAll()).thenReturn(List.of(user1, user2));
//        post.setUserId(2);
//
//        Result<Post> actual = service.editPost(post);
//        assertEquals(1, actual.getMessages().size());
//    }
//
//    @Test
//    void shouldNotEditIfPlantIdIsChanged() {
//
//    }
//
//    @Test
//    void shouldNotEditIfGardenIdIsChanged() {
//
//    }
//
//    @Test
//    void shouldNotEditIfDateTimePostedIsChanged() {
//
//    }
//
//    @Test
//    void shouldNotEditIfLikeCountIsChanged() {
//
//    }

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
        post.setDatetimePosted(LocalDateTime.now());
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