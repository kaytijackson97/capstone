// import { useEffect, useState, useContext } from "react";
// import { findPlanterByUsername } from "../../services/planter-api";
// import CurrentUser from "../contexts/CurrentUser";
import User from "./User";

function UserApp() {
  //   const auth = useContext(CurrentUser);
  //   const [user, setUser] = useState({});

  //   useEffect(() => {
  //     findPlanterByUsername(auth.currentUser.username)
  //       .then((data) => {
  //         if (user.username === auth.currentUser.username) {
  //           setUser(user);
  //           return;
  //         }
  //         setUser(data);
  //       })
  //       .then((error) => console.log(error));
  // }, [auth.currentUser.username]);

    return (
      <div>
        <div>
          <User />
        </div>
      </div>
    );
}

export default UserApp;