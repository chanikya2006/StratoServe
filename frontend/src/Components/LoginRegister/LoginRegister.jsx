import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showAdminPassword, setShowAdminPassword] = useState(false);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({});

    const registerLink = () => {
        setAction('active');
        setErrorMessage({});
    };
    const loginLink = () => {
        setAction('');
        setErrorMessage({});
    };
    const adminLink = () => {
        setAction('admin');
        setErrorMessage({});
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage({});
        try {
            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: registerUsername,
                    email: registerEmail,
                    password: registerPassword
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.message.toLowerCase().includes('username')) {
                    setErrorMessage({ username: data.message });
                    toast.error(data.message);
                } else if (data.message.toLowerCase().includes('email')) {
                    setErrorMessage({ email: data.message });
                    toast.error(data.message);
                } else if (data.message.toLowerCase().includes('password')) {
                    setErrorMessage({ password: data.message });
                    toast.error(data.message);
                } else {
                    setErrorMessage({ general: data.message });
                    toast.error(data.message);
                }
            } else {
                // Success case
                toast.success('Registration successful! Please login.');
                setRegisterUsername('');
                setRegisterEmail('');
                setRegisterPassword('');
                // Switch to login form after successful registration
                setTimeout(() => {
                    setAction('');
                }, 2000);
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('An error occurred during registration. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage({});
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.message.toLowerCase().includes('username')) {
                    setErrorMessage({ username: data.message });
                    toast.error(data.message);
                } else if (data.message.toLowerCase().includes('password')) {
                    setErrorMessage({ password: data.message });
                    toast.error(data.message);
                } else {
                    setErrorMessage({ general: data.message });
                    toast.error(data.message);
                }
            } else {
                toast.success('Login successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                // Small delay before navigating to let the user see the success message
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1500);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setErrorMessage({});
        try {
            const res = await fetch('http://localhost:5000/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminname: adminUsername,
                    password: adminPassword
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.message.toLowerCase().includes('username')) {
                    setErrorMessage({ username: data.message });
                    toast.error(data.message);
                } else if (data.message.toLowerCase().includes('password')) {
                    setErrorMessage({ password: data.message });
                    toast.error(data.message);
                } else {
                    setErrorMessage({ general: data.message });
                    toast.error(data.message);
                }
            } else {
                toast.success('Admin login successful!');
                localStorage.setItem('admin', JSON.stringify(data.admin));
                // Small delay before navigating to let the user see the success message
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 1500);
            }
        } catch (error) {
            console.error('Admin login error:', error);
            toast.error('An error occurred during admin login. Please try again.');
        }
    };

    return (
        <div className="login-register-container">
            <div className={`wrapper ${action}`}>
                {action === '' && (
                    <div className="form-box login">
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    required
                                />
                                <FaUser className="icon" />
                                {errorMessage.username && <span className="error-message">{errorMessage.username}</span>}
                            </div>
                            <div className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                {showPassword ? (
                                    <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
                                ) : (
                                    <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
                                )}
                                {errorMessage.password && <span className="error-message">{errorMessage.password}</span>}
                            </div>
                            {errorMessage.general && <p className="message">{errorMessage.general}</p>}
                            <button type="submit">Login</button>
                            <div className="register-link">
                                <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                                <p>Login as admin? <a href="#" onClick={adminLink}>Admin Login</a></p>
                            </div>
                        </form>
                    </div>
                )}

                {action === 'active' && (
                    <div className="form-box register">
                        <form onSubmit={handleRegister}>
                            <h1>Registration</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={registerUsername}
                                    onChange={(e) => setRegisterUsername(e.target.value)}
                                    required
                                />
                                <FaUser className="icon" />
                                {errorMessage.username && <span className="error-message">{errorMessage.username}</span>}
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                />
                                <FaEnvelope className="icon" />
                                {errorMessage.email && <span className="error-message">{errorMessage.email}</span>}
                            </div>
                            <div className="input-box">
                                <input
                                    type={showRegisterPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />
                                {showRegisterPassword ? (
                                    <FaEyeSlash className="eye-icon" onClick={() => setShowRegisterPassword(false)} />
                                ) : (
                                    <FaEye className="eye-icon" onClick={() => setShowRegisterPassword(true)} />
                                )}
                                {errorMessage.password && <span className="error-message">{errorMessage.password}</span>}
                            </div>
                            {errorMessage.general && <p className="message">{errorMessage.general}</p>}
                            <button type="submit">Register</button>
                            <div className="register-link">
                                <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                            </div>
                        </form>
                    </div>
                )}

                {action === 'admin' && (
                    <div className="form-box login">
                        <form onSubmit={handleAdminLogin}>
                            <h1>Admin Login</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={adminUsername}
                                    onChange={(e) => setAdminUsername(e.target.value)}
                                    required
                                />
                                <FaUser className="icon" />
                                {errorMessage.username && <span className="error-message">{errorMessage.username}</span>}
                            </div>
                            <div className="input-box">
                                <input
                                    type={showAdminPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    required
                                />
                                {showAdminPassword ? (
                                    <FaEyeSlash className="eye-icon" onClick={() => setShowAdminPassword(false)} />
                                ) : (
                                    <FaEye className="eye-icon" onClick={() => setShowAdminPassword(true)} />
                                )}
                                {errorMessage.password && <span className="error-message">{errorMessage.password}</span>}
                            </div>
                            {errorMessage.general && <p className="message">{errorMessage.general}</p>}
                            <button type="submit">Login</button>
                            <div className="register-link">
                                <p>Back to <a href="#" onClick={loginLink}>User Login</a></p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
