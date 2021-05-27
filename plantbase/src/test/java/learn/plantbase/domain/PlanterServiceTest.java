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

@SpringBootTest
public class PlanterServiceTest {

    @Autowired
    PlanterService service;

    @MockBean
    PlanterRepository repository;

    @MockBean
    RoleRepository roleRepository;

    @Test
    void shouldAddValidPlanter() {
        Planter planter = makeNewPlanter();
        Planter mockout = makeNewPlanter();
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.addPlanter(planter)).thenReturn(mockout);
        Result<Planter> actual = service.addPlanter(planter);
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotAddNullPlanter() {
        Result<Planter> result = service.addPlanter(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddIfInvalidEmail() {
        Planter planter = makeNewPlanter();
        planter.setEmail("ashley.com");
        Result<Planter> result = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullOrBlankFields() {
        Planter planter = makeNewPlanter();
        Result<Planter> actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setFirstName(" ");
        actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setFirstName(null);
        actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setLastName(" ");
        actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setFirstName(null);
        actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setEmail(" ");
        actual = service.addPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setEmail(null);
        actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldEditValidPlanter() {
        Planter planter = makeNewPlanter();
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.editPlanter(planter)).thenReturn(true);
        when(repository.findByUsername("robert_fall")).thenReturn(planter);
        planter.setFirstName("Molly");

        Result<Planter> actual = service.editPlanter(planter);
        assertEquals(0, actual.getMessages().size());
    }

    // TODO shouldNotEditIfNullOrBlankFields
    @Test
    void shouldNotEditIfNullOrBlankFields() {
        Planter planter = makeNewPlanter();
        planter.setUsername("test");
        planter.setEmail(null);
        Result<Planter> actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setUsername("test");
        planter.setRoleId(0);
        actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setUsername("test");
        planter.setFirstName(" ");
        actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditIfInvalidEmail() {
        Planter planter = makeNewPlanter();
        planter.setEmail("ashley.org");
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));

        Result<Planter> actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("invalid email", actual.getMessages().get(0));
    }

    @Test
    void shouldNotEditIfInvalidId() {
        Planter planter = makeNewPlanter();
        Result<Planter> actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setRoleId(-1);
        actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());

        planter = makeNewPlanter();
        planter.setUsername("invalid_username");
        actual = service.editPlanter(planter);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditValidPlanterIfRepositoryEditFails() {
        Planter planter = makeNewPlanter();
        Role role = new Role();
        role.setRoleId(1);
        when(roleRepository.findAll()).thenReturn(List.of(role));
        when(repository.editPlanter(planter)).thenReturn(false);
        when(repository.findByUsername("robert_fall")).thenReturn(planter);
        planter.setFirstName("Molly");

        Result<Planter> actual = service.editPlanter(planter);
        assertEquals(1, actual.getMessages().size());
    }

    @Test
    void shouldDeletePlanter() {
        when(repository.deleteByUsername("robert_fall")).thenReturn(true);
        assertTrue(service.deleteByPlanter("robert_fall"));
    }

    @Test
    void shouldNotDeleteIfInvalidId() {
        when(repository.deleteByUsername("robert_fall")).thenReturn(false);
        assertFalse(service.deleteByPlanter("robert_fall"));
    }

    private Planter makeNewPlanter() {
        Planter planter = new Planter();
        planter.setRoleId(1);
        planter.setUsername("robert_fall");
        planter.setFirstName("Robert");
        planter.setLastName("Fall");
        planter.setEmail("robertf@aol.com");
        return planter;
    }
}
