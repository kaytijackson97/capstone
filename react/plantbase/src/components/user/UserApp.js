import { useEffect, useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";


function UserApp() {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState(" ");

    function deleteUserByUsername(username) {
        const newUsers = [];
        for(const user of users ) {
            if (user.username !== username) {
                newUsers.push(user);
            }
        }

        setUsers(newUsers);
    }

    function editUserByUsername(user) {
        const newUsers = [];
        for(const u of users ) {
            if (u.username !== user.username) {
                newUsers.push(u);
            } else {
                newUsers.push(user)
            }
        }
       }
    return (
        <div>
            <AddUser />
            <UserList users={users} deleteUserByUsername={deleteUserByUsername} editUserByUsername={editUserByUsername}/>
        </div>
    );
}

export default UserApp;