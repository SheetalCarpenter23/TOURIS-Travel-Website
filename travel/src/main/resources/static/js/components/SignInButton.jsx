import React, { useState } from 'react';
import './SignInButton.css';

const SignInButton = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        // Reset form and close
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setShowForm(false);
    };

    return (
        <div className="sign-in-container">
            <button className="sign-in-btn" onClick={() => setShowForm(true)}>
                Sign In
            </button>

            {showForm && (
                <div className="form-overlay">
                    <div className="form-container">
                        <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Confirm your password"
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignInButton; 