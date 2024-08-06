import { Link } from 'react-router-dom'

export default function Navbar() {
    return(
        <nav>
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/shop">Shop</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/cart">Cart</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    )
}