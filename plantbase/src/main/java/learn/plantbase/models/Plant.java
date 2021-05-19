package learn.plantbase.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Plant {

    @Getter
    @Setter
    private int plantId;

    @Getter
    @Setter
    @Size(max = 250, message = "Plant Description cannot be greater than 250 characters.")
    private String plantDescription;

    @Getter
    @Setter
    @Size(max = 1000, message = "Photo cannot be greater than 1000 characters.")
    private String photo;

    @Getter
    @Setter
    @NotBlank(message = "Plant name is required.")
    @NotNull
    @Size(max = 50, message = "Plant name cannot be greater than 50 characters.")
    private String plantName;

    @Getter
    @Setter
    @NotBlank(message = "Plant type is required.")
    @NotNull
    @Size(max = 50, message = "Plant type cannot be greater than 50 characters.")
    private String plantType;

    @Getter
    @Setter
    @NotNull
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @PastOrPresent(message = "gotcha date cannot be in the future.")
    private LocalDate gotchaDate;

    @Getter
    @Setter
    @Min(value = 1, message = "MyGarden id must be at least 1.")
    private int myGardenId;

    @Setter
    private List<Post> posts = new ArrayList<>();

    public List<Post> getPosts() {
        return new ArrayList<>(posts);
    }

}
