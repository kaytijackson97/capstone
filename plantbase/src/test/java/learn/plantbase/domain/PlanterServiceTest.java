package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.Role;
import learn.plantbase.models.Planter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class PlanterServiceTest {

    @Autowired
    PlanterService service;

    @MockBean
    PlanterRepository repository;

    @MockBean
    RoleRepository roleRepository;

    @Test
    void shouldAddValidUser() {
        Planter user = makeNewUser();
        Planter mockout = makeNewUser();
        mockout.setUserId(4);
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.addPlanter(user)).thenReturn(mockout);
        Result<Planter> actual = service.addUser(user);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddNullUser() {
        Result<Planter> result = service.addUser(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddIfInvalidEmail() {
        Planter user = makeNewUser();
        user.setEmail("ashley.com");
        Result<Planter> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullOrBlankFields() {
        Planter user = makeNewUser();
        Result<Planter> actual = service.addUser(user);
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
        Planter user = makeNewUser();
        user.setUserId(1);
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.editPlanter(user)).thenReturn(true);
        when(repository.findById(1)).thenReturn(user);
        user.setFirstName("Molly");

        Result<Planter> actual = service.editUser(user);
        assertEquals(0, actual.getMessages().size());
    }

    // TODO shouldNotEditIfNullOrBlankFields
    @Test
    void shouldNotEditIfNullOrBlankFields() {
        Planter user = makeNewUser();
        user.setUserId(1);
        user.setEmail(null);
        Result<Planter> actual = service.editUser(user);
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
        Planter user = makeNewUser();
        user.setEmail("ashley.org");
        Result<Planter> actual = service.editUser(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditIfInvalidId() {
        Planter user = makeNewUser();
        Result<Planter> actual = service.editUser(user);
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
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteByUser(1));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        when(repository.deleteById(100)).thenReturn(false);
        assertFalse(service.deleteByUser(100));
    }

    private Planter makeNewUser() {
        Planter user = new Planter();
        user.setRoleId(1);
        user.setFirstName("Robert");
        user.setLastName("Fall");
        user.setEmail("robertf@aol.com");
        return user;
    }
}
