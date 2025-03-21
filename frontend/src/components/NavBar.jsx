
import { Link } from 'react-router-dom';
import Home from './../pages/Home';
import '../css/NavBar.css';
function NavBar(){

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className='nav-links'>Home</Link>
                <Link to="/favorites" className='nav-links'>Favorites</Link> 
            </div>
        </nav>
    )
}

export default NavBar;