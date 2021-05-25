import { useEffect, useState, useContext } from "react";
import CurrentUser from "../contexts/CurrentUser";
import User from "./User";

function UserApp() {
    const auth = useContext(CurrentUser);
    const [user, setUser] = useState({});

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/planter/${auth.currentUser.username}`)
          .then(response => response.json())
          .then(data => setUser(data))
          .catch(error => console.log(error));
  }, [auth.currentUser.username])



    // const editUser = (user) => {
    //   console.log("hello");
    //   const newUsers = [];
    //   for (const u of user) {
    //     if (u.username !== user.username) {
    //       newUsers.push(u);
    //     }
    //     else {
    //       newUsers.push(user);
    //     }
    //   }
    //   setUsers(newUsers);
    // }

    return (
        <div>
            <User user={user} setUser={setUser}/>
        </div>
    );
}

export default UserApp;