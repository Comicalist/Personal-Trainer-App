import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Customer from './components/Customer';
import Training from './components/Training';

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '10px' }}>Customer</Link>
                    <Link to="/training">Training</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Customer />} />
                    <Route path="/training" element={<Training />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
