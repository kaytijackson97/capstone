package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RoleServiceTest {

    @Autowired
    RoleService service;

    @MockBean
    RoleRepository repository;

}
