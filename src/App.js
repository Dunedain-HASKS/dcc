
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProblem from './pages/AddProblem';
import Navbar from './components/Navbar';
import Compiler from './components/Compiler';
import UserDashboard from './pages/UserDashboard';

import './App.css';
import Problems from "./pages/Problems";

function App() {
    
    return (
        <div className="App">
            <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/compiler" element={<Compiler />} />
                    <Route path="/add-problem" element={<AddProblem />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/problems" element={<Problems />} />
            </Routes>
            </Router>
            <ToastContainer />
        </div>
    );
    
}

export default App;
