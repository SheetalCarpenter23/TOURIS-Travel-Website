import React from 'react';
import SignInButton from './components/SignInButton';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-brand">Travel App</div>
                <div className="nav-buttons">
                    <SignInButton />
                </div>
            </nav>
        </div>
    );
};

export default App; 