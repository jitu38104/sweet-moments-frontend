import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav 
            className="w-100 navbar navbar-expand-lg navbar-dark bg-primary position-fixed"
            style={{position: "sticky", top: 0, zIndex: 100}}
        >
            
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" height="50" width="150" alt="logo-png" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/mylist">My List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                          
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Login</Link>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/login">Login</Link>
                                <Link className="dropdown-item" to="/register">Register</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/add-moment">Post Image</Link>
                                <Link className="dropdown-item" to="/edit-moment">Edit Image</Link>
                                <Link className="dropdown-item" to="/reset">Reset Password</Link>
                                {/* 
                                <Link className="dropdown-item" href="#">Dashboard</Link>
                                <Link className="dropdown-item" to="/login">Post image</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" href="#">Logout</Link> */}
                            </div>
                        </li>
                    </ul>                                   
                </div>                
            </div>
            
        </nav>
    )
}

export default Header
