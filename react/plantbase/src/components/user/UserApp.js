import { useEffect, useState, useContext } from "react";
import CurrentUser from "../contexts/CurrentUser";
import User from "./User";

function UserApp() {
    const auth = useContext(CurrentUser);
    const [user, setUser] = useState({});

    useEffect(() => {
      fetch(`http://localhost:8080/api/planter/${auth.currentUser.username}`)
          .then(response => response.json())
          .then(data => 
            {if (user.username === auth.currentUser.username) {
                return setUser(user);
              }
              else {
                setUser(data);
              }
            })
          .catch(error => console.log(error));
  }, [auth.currentUser.username])

    return (
        <div>
        <div>
            <User user={user}/>
        </div>
        </div>
    );
}

export default UserApp;