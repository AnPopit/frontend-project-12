//import { Button, Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../slices/authSlice.js';

const Header = () => {

    const dispatch = useDispatch();

    return (
        <>
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a>
                    <button onClick={() => dispatch(logOut())} type="button" className="btn btn-primary">Выйти</button>
                </div>
            </nav>
        </>
    )
};

export default Header;

