import { Link } from 'react-router-dom'
import Navbarcss from '../CSS/Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-header">
                <h1 className="site-title">Sahara Stationery</h1>
            </div>
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;