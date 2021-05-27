package learn.plantbase.data;

import learn.plantbase.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindByValidId() {
        AppUser appUser = repository.findByUsername("john_smith");
        assertNotNull(appUser);
    }

    @Test
    void shouldNotFindByInvalidId() {
        AppUser appUser = repository.findByUsername("test_username");
        assertNull(appUser);
    }

    @Test
    void shouldAddValidAppUser() {
        AppUser appUser = makeAppUser();
        AppUser actual = repository.add(appUser);
        assertNotNull(actual);
    }

    @Test
    void shouldNotAddInvalidAppUser() {
        assertNull(repository.add(null));
    }

    private AppUser makeAppUser() {
        AppUser appUser = new AppUser();
        appUser.setUsername("testy_test");
        appUser.setPassword("test_password");
        appUser.setDisabled(false);
        return appUser;
    }

}