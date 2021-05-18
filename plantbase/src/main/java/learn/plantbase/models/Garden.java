package learn.plantbase.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class Garden {
    @Getter
    private int gardenId;

    @Setter
    private List<Post> posts = new ArrayList<>();

    public List<Post> getPosts() {
        return new ArrayList<>(posts);
    }

}
