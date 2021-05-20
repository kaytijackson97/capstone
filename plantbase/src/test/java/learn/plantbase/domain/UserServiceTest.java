package learn.plantbase.domain;

import learn.plantbase.data.UserRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    // fail
    @Test
    void shouldAddValidUser() {
        User user = makeNewUser();
//        User mockOut = makeNewUser();
//        mockOut.setUserId(4);
//
//        when(repository.addUser(user)).thenReturn(mockOut);

        Result<User> actual = service.addUser(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
//        assertEquals(mockOut, actual.getPayload());
    }

    // TODO shouldNotAddNullUser
    // TODO shouldNotAddIfInvalidEmail
    // TODO shouldNotAddDuplicateUser
    // TODO shouldNotAddNullOrBlankFields


    @Test
    void shouldNotAddNullFirstName() {
        User user = makeNewUser();
        user.setFirstName("   ");

        Result<User> actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    // TODO shouldEditValidUser
    @Test
    void shouldEditValidUser() {
        User user = makeNewUser();
        user.setUserId(1);

        when(repository.editUser(user)).thenReturn(true);

        Result<User> actual = service.editUser(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    // TODO shouldNotEditIfNullOrBlankFields
    // TODO shouldNotEditIfChangedUser
    // TODO shouldNotEditIfInvalidEmail

    @Test
    void shouldNotEditIfInvalid() {
        User user = makeNewUser();
        Result<User> actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setRoleId(-1);
        actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setUserId(100);
        actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }


    // TODO shouldDelete
    @Test
    void shouldDelete() {

    }

    private User makeNewUser() {
        User user = new User();
        user.setRoleId(1);
        user.setFirstName("Robert");
        user.setLastName("Fall");
        user.setEmail("robertf@aol.com");
        user.setUserId(4);
        return user;
    }
}
