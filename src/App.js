import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Compiler from './components/Compiler';

import './App.css';

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compiler" element={<Compiler />} />
            </Routes>
        </Router>
    );
    
}

export default App;
