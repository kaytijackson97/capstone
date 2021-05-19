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
        when(repository.addPost(expected)).thenReturn(expected);

        User user = makeNewUser(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        Plant plant = makeNewPlant(1);
        when(plantRepository.findAll()).thenReturn(List.of(plant));

        Garden garden = makeNewGarden(1);
        when(gardenRepository.findAll()).thenReturn(List.of(garden));

        Result<Post> actual = service.addPost(expected);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfInvalidPhotoType() {
        Post expected = makeNewPost(0);
        expected.setPhoto("test");
        when(repository.addPost(expected)).thenReturn(expected);

        User user = makeNewUser(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        Plant plant = makeNewPlant(1);
        when(plantRepository.findAll()).thenReturn(List.of(plant));

        Garden garden = makeNewGarden(1);
        when(gardenRepository.findAll()).thenReturn(List.of(garden));

        Result<Post> actual = service.addPost(expected);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Invalid image type", actual.getMessages().get(0));
    }

    private Plant makeNewPlant(int plantId) {
        Plant plant = new Plant();
        plant.setPlantId(plantId);
        return plant;
    }

    private Garden makeNewGarden(int gardenId) {
        Garden garden = new Garden();
        garden.setGardenId(gardenId);
        return garden;
    }

    private User makeNewUser(int userId) {
        User user = new User();
        user.setUserId(userId);
        return user;
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
        return post;
    }

}