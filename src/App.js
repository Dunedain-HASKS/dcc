import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProblem from './pages/AddProblem';
import Compiler from './components/Compiler';

import './App.css';

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compiler" element={<Compiler />} />
                <Route path="/add-problem" element={<AddProblem />} />
            </Routes>
        </Router>
    );
    
}

export default App;
