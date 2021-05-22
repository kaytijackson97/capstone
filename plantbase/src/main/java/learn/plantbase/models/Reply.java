package learn.plantbase.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class Reply {
    @Getter
    @Setter
    private int replyId;

    @Getter
    @Setter
    @NotNull
    @NotBlank
    @Size(max = 250, message = "Reply cannot be greater than 250 characters.")
    private String reply;

    @Getter
    @Setter
    @Min(value = 1, message = "Planter id must be at least 1.")
    private int planterId;

    @Getter
    @Setter
    @Past
    private LocalDateTime datetimePosted;

    @Getter
    @Setter
    private int likeCount;

    @Getter
    @Setter
    @Min(value = 1, message = "Post id must be at least 1.")
    private int postId;

}
