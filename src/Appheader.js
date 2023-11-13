import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login') {
            showmenuupdateupdate(false);
        } else { 
            if(location.pathname !== '/profile'){
            showmenuupdateupdate(true);
            }
            else{
            showmenuupdateupdate(true);
            let username = localStorage.getItem('email');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }
        }

    }, [location, usenavigate])
    return (
        <div>
            {showmenu &&
                <div className="header">

                    <Link to={'/'}>Home</Link>
                    <Link to={'/users'}>Users</Link>
                    <Link to={'/profile'} style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></Link>
                    <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;