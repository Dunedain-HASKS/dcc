import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    window.onload = function() {
        
        const name = prompt("Enter your name:");
        
        if(name === null || name === "") {
            alert("Please enter a valid name!");
            window.location.reload();
            return;
        }

        alert("Welcome, " + name + "! Let's start coding!");
        localStorage.setItem('userName',name);
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to='/'>Dunedain's Compiler</Link>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/problems">Problems</Link>
                <Link to="/add-problem">Add Problem</Link>
                <Link to="/compiler">Compile Code</Link>
            </div>
        </nav>
    );
}

export default Navbar;
