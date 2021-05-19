package learn.plantbase.domain;

import learn.plantbase.data.MyGardenRepository;
import learn.plantbase.models.MyGarden;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MyGardenServiceTest {
    @Autowired
    MyGardenService service;

    @MockBean
    MyGardenRepository repository;

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
        myGarden.setUserId(0);
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
        Result<MyGarden> result = service.add(myGarden);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldEdit() {
        MyGarden myGarden = makeMyGarden();
        myGarden.setMyGardenId(2);

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
        myGarden.setUserId(3);
        myGarden.setPlants(new ArrayList<>());
        return myGarden;
    }
}