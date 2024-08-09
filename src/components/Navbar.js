import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to='/'>Dunedain's Compiler</Link>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/add-problem">Add Problem</Link>
                <Link to="/compiler">Compile Code</Link>
            </div>
        </nav>
    );
}

export default Navbar;
