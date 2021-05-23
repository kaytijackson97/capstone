import { Link, useHistory } from 'react-router-dom';
import React, {useContext} from 'react';
import CurrentUser from './contexts/CurrentUser';

function Logout () {
    const auth = useContext(CurrentUser);
    const history = useHistory();

    const navStyle = {
        color: 'white',
        'text-decoration': 'none'
    };
    
    const handleLogout = (event) => {
        event.preventDefault();

        
        auth.logout();
        history.push('/logout', {msg: 'Logout successful.'});
    }

    return (
        <div>
            <Link onClick={handleLogout} style={navStyle}>Logout 🍂</Link>
        </div>
    );
}

export default Logout;