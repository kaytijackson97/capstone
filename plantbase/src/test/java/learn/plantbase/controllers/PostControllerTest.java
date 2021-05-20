package learn.plantbase.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import learn.plantbase.data.PostRepository;
import learn.plantbase.models.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerTest {

    @MockBean
    PostRepository repository;

    @Autowired
    MockMvc mvc;

    private static final LocalDateTime DATE_TIME_POSTED = LocalDateTime.of(2019, Month.MARCH, 28, 14, 33, 48);

    @Test
    void shouldFindAll() throws Exception {
        Post post1 = makeNewPost(1);
        Post post2 = makeNewPost(2);
        Post post3 = makeNewPost(3);
        List<Post> posts = List.of(post1, post2, post3);

        ObjectMapper mapper = new ObjectMapper();
        String expectedJson = mapper.writeValueAsString(posts);

        when(repository.findAll()).thenReturn(posts);

        mvc.perform(get("/api/post"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));
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