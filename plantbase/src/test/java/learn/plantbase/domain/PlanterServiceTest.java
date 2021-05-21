package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import learn.plantbase.data.UserRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Post;
import learn.plantbase.models.Role;
import learn.plantbase.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @MockBean
    RoleRepository roleRepository;

    @Test
    void shouldAddValidUser() {
        User user = makeNewUser();
        User mockout = makeNewUser();
        mockout.setUserId(4);
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.addUser(user)).thenReturn(mockout);
        Result<User> actual = service.addUser(user);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddNullUser() {
        Result<User> result = service.addUser(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddIfInvalidEmail() {
        User user = makeNewUser();
        user.setEmail("ashley.com");
        Result<User> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullOrBlankFields() {
        User user = makeNewUser();
        Result<User> actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setFirstName(" ");
        actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setFirstName(null);
        actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setLastName(" ");
        actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setFirstName(null);
        actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setEmail(" ");
        actual = service.addUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setEmail(null);
        actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldEditValidUser() {
        User user = makeNewUser();
        user.setUserId(1);
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.editUser(user)).thenReturn(true);
        when(repository.findByUser(1)).thenReturn(user);
        user.setFirstName("Molly");

        Result<User> actual = service.editUser(user);
        assertEquals(0, actual.getMessages().size());
    }

    // TODO shouldNotEditIfNullOrBlankFields
    @Test
    void shouldNotEditIfNullOrBlankFields() {
        User user = makeNewUser();
        user.setUserId(1);
        user.setEmail(null);
        Result<User> actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setUserId(1);
        user.setRoleId(0);
        actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeNewUser();
        user.setUserId(1);
        user.setFirstName(" ");
        actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditIfInvalidEmail() {
        User user = makeNewUser();
        user.setEmail("ashley.org");
        Result<User> actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditIfInvalidId() {
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

    @Test
    void shouldDeleteUser() {
        when(repository.deleteByUser(1)).thenReturn(true);
        assertTrue(service.deleteByUser(1));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        when(repository.deleteByUser(100)).thenReturn(false);
        assertFalse(service.deleteByUser(100));
    }

    private User makeNewUser() {
        User user = new User();
        user.setRoleId(1);
        user.setFirstName("Robert");
        user.setLastName("Fall");
        user.setEmail("robertf@aol.com");
        return user;
    }
}
