import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Compiler from './components/Compiler';

import './App.css';

function App() {
    
    return (
        <div className="App">
            <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/compiler" element={<Compiler />} />
                </Routes>
            </Router>
        </div>
    );
    
}

export default App;
