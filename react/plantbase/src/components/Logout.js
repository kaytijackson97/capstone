import { Link, useHistory } from 'react-router-dom';
import React, {useContext} from 'react';
import CurrentUser from './contexts/CurrentUser';

function Logout () {
    const auth = useContext(CurrentUser);
    const history = useHistory();
    
    const handleLogout = (event) => {
        event.preventDefault();

        
        auth.logout();
        history.push('/');
    }

    return (
        <div>
            <Link onClick={handleLogout}className="nav-link nav-item dropdown" style={{color: 'green', textDecoration: 'none'}}>Logout 🍂</Link>
        </div>
    );
}

export default Logout;