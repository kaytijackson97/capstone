package learn.plantbase.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

public class Role {
    @Getter
    @Setter
    @Min(value = 0, message = "Id must be greater than or equal to 0.")
    private int roleId;

    @Getter
    @Setter
    @NotNull(message = "Role cannot be blank.")
    @Size(max = 10, message = "Role title must be smaller than 10 characters.")
    private String roleName;

    @Setter
    private List<Planter> planters = new ArrayList<>();

    public List<Planter> getPlanters() {
        return new ArrayList<>(planters);
    }
}
