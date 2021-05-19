package learn.plantbase.domain;

import learn.plantbase.data.*;
import learn.plantbase.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReplyServiceTest {

    private static final LocalDateTime LOCAL_DATE_TIME = LocalDateTime.of(2019, Month.MARCH, 28, 14, 33, 48);

    @Autowired
    ReplyService service;

    @MockBean
    ReplyRepository repository;

    @MockBean
    UserRepository userRepository;

    @MockBean
    PostRepository postRepository;

    @Test
    void shouldFindByIdIfValidId() {
        Reply expected = makeNewReply(1);
        when(repository.findById(1)).thenReturn(expected);
        Reply actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByIdIfInvalidId() {
        Reply actual = service.findById(5);
        assertNull(actual);
    }

    @Test
    void shouldAddIfValid() {
        Reply expected = makeNewReply(0);
        Result<Reply> actual = service.addReply(expected);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfReplyIdIsSet() {
        Reply expected = makeNewReply(1);
        Result<Reply> actual = service.addReply(expected);
        assertEquals("Reply id cannot be set", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfRepositoryAddFailed() {
        Reply expected = makeNewReply(0);
        when(repository.addReply(expected)).thenReturn(null);
        Result<Reply> actual = service.addReply(expected);
        assertEquals("Add failed", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddIfInvalidUserId() {
        Reply expected = makeNewReply(0);
        expected.setUserId(10);

        Result<Reply> actual = service.addReply(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfInvalidPlantId() {
        Reply expected = makeNewReply(0);
        expected.setPostId(10);

        Result<Reply> actual = service.addReply(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotAddIfNullReply() {
        Reply expected = makeNewReply(0);
        expected.setReply(null);

        Result<Reply> actual = service.addReply(expected);
        assertEquals(1, actual.getMessages().size());
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
        Reply expected = makeNewReply(0);
        expected.setLikeCount(10);

        Result<Reply> actual = service.addReply(expected);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldEditIfValid() {
        Reply reply = makeNewReply(1);
        when(repository.editReply(reply)).thenReturn(true);
        when(repository.findById(1)).thenReturn(reply);
        reply.setReply("new test reply for edit.");

        Result<Reply> actual = service.editReply(reply);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfNull() {
        Result<Reply> actual = service.editReply(null);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfRepositoryEditFailed() {
        Reply reply = makeNewReply(1);
        when(repository.editReply(reply)).thenReturn(false);
        when(repository.findById(1)).thenReturn(reply);

        Result<Reply> actual = service.editReply(reply);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldNotEditIfUserIdIsChanged() {
        Reply reply = makeNewReply(1);
        when(repository.findById(1)).thenReturn(reply);

        Reply updatedReply = makeNewReply(1);
        updatedReply.setUserId(2);
        when(repository.editReply(reply)).thenReturn(true);

        User user1 = new User();
        user1.setUserId(1);

        User user2 = new User();
        user2.setUserId(2);
        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        Result<Reply> actual = service.editReply(updatedReply);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change user id.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfPostIdIsChanged() {
        Reply reply = makeNewReply(1);
        when(repository.findById(1)).thenReturn(reply);

        Reply updatedReply = makeNewReply(1);
        updatedReply.setPostId(2);
        when(repository.editReply(reply)).thenReturn(true);

        Post post1 = new Post();
        post1.setPostId(1);

        Post post2 = new Post();
        post2.setPostId(2);
        when(postRepository.findAll()).thenReturn(List.of(post1, post2));

        Result<Reply> actual = service.editReply(updatedReply);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change post id.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfDateTimePostedIsChanged() {
        Reply reply = makeNewReply(1);
        when(repository.findById(1)).thenReturn(reply);

        Reply updatedReply = makeNewReply(1);
        updatedReply.setDatetimePosted(LOCAL_DATE_TIME.minusDays(10));
        when(repository.editReply(reply)).thenReturn(true);

        Result<Reply> actual = service.editReply(updatedReply);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change datetimePosted.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfLikeCountIsChanged() {
        Reply reply = makeNewReply(1);
        when(repository.findById(1)).thenReturn(reply);

        Reply updatedReply = makeNewReply(1);
        updatedReply.setLikeCount(1000);
        when(repository.editReply(reply)).thenReturn(true);

        Result<Reply> actual = service.editReply(updatedReply);
        assertEquals(1, actual.getMessages().size());
        assertEquals("Cannot change like count.", actual.getMessages().get(0));
    }

    @Test
    void shouldDeleteIfValidId() {
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        when(repository.deleteById(1)).thenReturn(false);
        assertFalse(service.deleteById(1));
    }

    private Reply makeNewReply(int replyId) {
        Reply reply = new Reply();
        reply.setReplyId(replyId);
        reply.setUserId(1);
        reply.setPostId(1);
        reply.setReply("test reply");
        reply.setDatetimePosted(LOCAL_DATE_TIME);
        reply.setLikeCount(0);

        when(repository.addReply(reply)).thenReturn(reply);

        User user = new User();
        user.setUserId(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        Post post = new Post();
        post.setPostId(1);
        when(postRepository.findAll()).thenReturn(List.of(post));

        return reply;
    }

}