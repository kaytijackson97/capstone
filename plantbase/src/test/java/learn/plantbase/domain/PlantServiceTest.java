package learn.plantbase.domain;

import learn.plantbase.data.MyGardenRepository;
import learn.plantbase.data.PlantRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Plant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PlantServiceTest {

    @Autowired
    PlantService service;

    @MockBean
    PlantRepository repository;

    @MockBean
    MyGardenRepository myGardenRepository;

    @Test
    void shouldAdd() {
        Plant plant = makePlant();
        Plant mockOut = makePlant();
        mockOut.setPlantId(1);

        MyGarden myGarden = makeMyGarden();
        when(myGardenRepository.findAll()).thenReturn(List.of(myGarden));

        when(repository.addPlant(plant)).thenReturn(mockOut);

        Result<Plant> result = service.add(plant);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddPlantIfIdIsSet() {
        Plant plant = makePlant();
        plant.setPlantId(1);

        Result<Plant> result = service.add(plant);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullPlantName() {
        Plant plant = makePlant();
        plant.setPlantName(null);

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(2, violations.size());
    }

    @Test
    void shouldNotAddBlankPlantName() {
        Plant plant = makePlant();
        plant.setPlantName("    ");

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotAddNullPlant() {
        Result<Plant> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullPlantType() {
        Plant plant = makePlant();
        plant.setPlantType(null);

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(2, violations.size());
    }

    @Test
    void shouldNotAddBlankPlantType() {
        Plant plant = makePlant();
        plant.setPlantType("    ");

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotAddFutureGotchaDate() {
        Plant plant = makePlant();
        plant.setGotchaDate(LocalDate.now().plusDays(1));

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotAddZeroMyGardenId() {
        Plant plant = makePlant();
        plant.setMyGardenId(0);

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldEdit() {
        Plant plant = makePlant();
        plant.setPlantId(1);

        MyGarden myGarden = makeMyGarden();
        when(myGardenRepository.findAll()).thenReturn(List.of(myGarden));

        when(repository.editPlant(plant)).thenReturn(true);

        Result<Plant> result = service.edit(plant);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotEditIfPlantIsNull() {
        Result<Plant> result = service.edit(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotEditIfPlantIdIs0() {
        Plant plant = makePlant();
        plant.setPlantId(0);

        Result<Plant> result = service.edit(plant);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotEditNullPlantName() {
        Plant plant = makePlant();
        plant.setPlantId(1);
        plant.setPlantName(null);

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(2, violations.size());
    }

    @Test
    void shouldNotEditBlankPlantName() {
        Plant plant = makePlant();
        plant.setPlantId(1);
        plant.setPlantName("     ");

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotEditNullPlantType() {
        Plant plant = makePlant();
        plant.setPlantId(1);
        plant.setPlantType(null);

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(2, violations.size());
    }

    @Test
    void shouldNotEditBlankPlantType() {
        Plant plant = makePlant();
        plant.setPlantId(1);
        plant.setPlantType("     ");

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotEditFutureGotchaDate() {
        Plant plant = makePlant();
        plant.setPlantId(1);
        plant.setGotchaDate(LocalDate.now().plusDays(1));

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Plant>> violations = validator.validate(plant);

        assertEquals(1, violations.size());
    }

    @Test
    void shouldNotEditRepositoryEditFails() {
        Plant plant = makePlant();
        plant.setPlantId(1);

        MyGarden myGarden = makeMyGarden();
        when(myGardenRepository.findAll()).thenReturn(List.of(myGarden));

        when(repository.editPlant(plant)).thenReturn(false);

        Result<Plant> result = service.edit(plant);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(2)).thenReturn(true);

        boolean actual = service.deleteById(2);

        assertTrue(actual);
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteById(-1)).thenReturn(false);

        boolean actual = service.deleteById(-1);

        assertFalse(actual);
    }


    private Plant makePlant() {
        Plant plant = new Plant();
        plant.setPlantDescription("test");
        plant.setPhoto("test.png");
        plant.setPlantName("testie");
        plant.setPlantType("bird of paradise");
        plant.setGotchaDate(LocalDate.now());
        plant.setMyGardenId(2);
        return plant;
    }

    MyGarden makeMyGarden() {
        MyGarden myGarden = new MyGarden();
        myGarden.setMyGardenId(1);
        return myGarden;
    }

}