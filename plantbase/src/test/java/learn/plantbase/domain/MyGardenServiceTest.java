package learn.plantbase.domain;

import learn.plantbase.data.MyGardenRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Planter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MyGardenServiceTest {
    @Autowired
    MyGardenService service;

    @MockBean
    MyGardenRepository repository;

    @MockBean
    PlanterRepository userRepository;

    // finds are pass-through, don't need domain testing.

    @Test
    void shouldNotAddNullGardenName() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setGardenName(null);
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBlankGardenName() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setGardenName("    ");
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddZeroUserId() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setPlanterId(0);
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBioOver100Characters() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setBio("asdfghjklqwewrtyuiopzxcvcbvnmqwertyuiopasdfgfhjkjdeiohbafewugbfhkjaaeauagaafabaaaa" +
                "fiauewhlfiujewhns;folikehlogfithkakolwesjnfo;lwseihrgvihjefolkesjdwa;olighejtr;oifjvwsae" +
                "eioah;pgeikwjgfm;vewkosaljngfv;likerh4g;ikrjejdnmf/la;kojsmwesozighrel;ikgj'szerdlpkojgtolriked" +
                "agijkehn;kolejsmd;olgkvihredolikgj'ap;ewolkjrndgs;loikhjer;lp4kghyoj;rolikhj;rpdlekglero;");
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddGardenNameOver50Chars() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setGardenName("onetwothreefourfivesixseveneightnineteneleventwelvethirteenfourteenfifteensixteenseventeen" +
                "eightteennineteentwenty");
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        MyGarden myGarden = makeMyGarden();
        MyGarden mockOut = makeMyGarden();
        mockOut.setMyGardenId(1);

        Planter user = makeNewUser(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        when(repository.addMyGarden(myGarden)).thenReturn(mockOut);


        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldEdit() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(1);

        Planter user = makeNewUser(1);
        when(userRepository.findAll()).thenReturn(List.of(user));

        when(repository.editMyGarden(myGarden)).thenReturn(true);

        Result<MyGarden> actual = service.edit(myGarden);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotEditBlankMyGardenName() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(2);
        myGarden.setGardenName("      ");

        when(repository.editMyGarden(myGarden)).thenReturn(false);

        Result<MyGarden> actual = service.edit(myGarden);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditNullMyGardenName() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(2);
        myGarden.setGardenName(null);

        when(repository.editMyGarden(myGarden)).thenReturn(false);

        Result<MyGarden> actual = service.edit(myGarden);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditBioOver100Characters() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(2);
        myGarden.setBio("asdfghjklqwewrtyuiopzxcvcbvnmqwertyuiopasdfgfhjkjdeiohbafewugbfhkjaaeauagaafabaaaa" +
                "fiauewhlfiujewhns;folikehlogfithkakolwesjnfo;lwseihrgvihjefolkesjdwa;olighejtr;oifjvwsae" +
                "eioah;pgeikwjgfm;vewkosaljngfv;likerh4g;ikrjejdnmf/la;kojsmwesozighrel;ikgj'szerdlpkojgtolriked" +
                "agijkehn;kolejsmd;olgkvihredolikgj'ap;ewolkjrndgs;loikhjer;lp4kghyoj;rolikhj;rpdlekglero;");

        when(repository.editMyGarden(myGarden)).thenReturn(false);

        Result<MyGarden> actual = service.edit(myGarden);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotEditGardenNameOver50Characters() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(2);
        myGarden.setGardenName("onetwothreefourfivesixseveneightnineteneleventwelvethirteenfourteenfifteensixteenseventeen" +
                "eightteennineteentwenty");

        when(repository.editMyGarden(myGarden)).thenReturn(false);

        Result<MyGarden> actual = service.edit(myGarden);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(2)).thenReturn(true);

        boolean actual = service.deleteById(2);

        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteMissingMyGardenId() {
        when(repository.deleteById(100)).thenReturn(false);

        boolean actual = service.deleteById(100);

        assertFalse(actual);
    }


    MyGarden makeMyGarden() {
        MyGarden myGarden = new MyGarden();
        myGarden.setGardenName("Rachel");
        myGarden.setPhoto("image.png");
        myGarden.setBio("Welcome to my garden");
        myGarden.setPlanterId(1);
        myGarden.setPlants(new ArrayList<>());
        return myGarden;
    }

    private Planter makeNewUser(int userId) {
        Planter user = new Planter();
        user.setPlanterId(userId);
        return user;
    }
}