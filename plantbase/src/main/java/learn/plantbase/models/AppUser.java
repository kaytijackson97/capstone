package learn.plantbase.models;

import java.util.ArrayList;
import java.util.List;

public class AppUser {
    private int appUserId;
    private String username;
    private String password;
    private boolean disabled;
    private Planter planter;
    private MyGarden myGarden;

    private List<String> roles = new ArrayList<>();

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public boolean hasRole(String role) {
        if (roles == null) {
            return false;
        }
        return roles.contains(role);
    }

    public Planter getPlanter() {
        return planter;
    }

    public void setPlanter(Planter planter) {
        this.planter = planter;
    }

    public MyGarden getMyGarden() {
        return myGarden;
    }

    public void setMyGarden(MyGarden myGarden) {
        this.myGarden = myGarden;
    }
}
