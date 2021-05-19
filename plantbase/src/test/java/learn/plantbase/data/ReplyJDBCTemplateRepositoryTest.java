package learn.plantbase.data;

import learn.plantbase.models.Reply;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReplyJDBCTemplateRepositoryTest {

    @Autowired
    ReplyJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByIfValidId() {
        Reply reply = repository.findById(1);
        assertNotNull(reply);
        assertEquals(1, reply.getPostId());
    }

    @Test
    void shouldNotFindByIfInvalidId() {
        Reply reply = repository.findById(5);
        assertNull(reply);
    }

    @Test
    void shouldAddIfValid() {
        Reply reply = makeReply(4);
        Reply actual = repository.addReply(reply);
        assertNotNull(actual);
        assertEquals(reply, actual);
    }

    @Test
    void shouldNotAddIfNull() {
        assertNull(repository.addReply(null));
    }

    @Test
    void shouldEditIfValidId() {
        Reply reply = repository.findById(2);
        reply.setReply("new test reply");
        assertTrue(repository.editReply(reply));

        Reply actual = repository.findById(2);
        assertEquals(reply.getReply(), actual.getReply());
    }

    @Test
    void shouldNotEditIfInvalidId() {
        Reply reply = new Reply();
        reply.setReplyId(5);
        assertFalse(repository.editReply(reply));
    }

    @Test
    void shouldNotEditIfNull() {
        assertFalse(repository.editReply(null));

    }

    @Test
    void shouldDeleteIfValid() {
        assertTrue(repository.deleteById(3));

        Reply actual = repository.findById(3);
        assertNull(actual);
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        assertFalse(repository.deleteById(5));
    }

    private Reply makeReply(int replyId){
        Reply reply = new Reply();
        reply.setReplyId(replyId);
        reply.setUserId(1);
        reply.setPostId(1);
        reply.setReply("test reply");
        reply.setDatetimePosted(LocalDateTime.now());
        reply.setLikeCount(0);
        return reply;
    }
}