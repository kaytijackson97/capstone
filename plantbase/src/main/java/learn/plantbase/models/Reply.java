package learn.plantbase.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class Reply {
    @Getter
    private int replyId;

    @Getter
    @Setter
    @Size(max = 250, message = "Reply cannot be greater than 250 characters.")
    private String reply;

    @Getter
    @Setter
    @Min(value = 1, message = "User id must be at least 1.")
    private int userId;

    @Getter
    @Setter
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private LocalDateTime datetimePosted;

    @Getter
    @Setter
    @NotBlank(message = "Like count is required.")
    private int likeCount;

    @Getter
    @Setter
    @Min(value = 1, message = "Post id must be at least 1.")
    private int postId;
}
