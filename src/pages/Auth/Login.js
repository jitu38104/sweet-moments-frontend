import '../../css/Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({email, password});
    }

    return (
        <div className="login">
            <div className="login-form d-flex flex-column justify-content-center">
                <Link to="/" className="m-auto">
                    <img className="mb-1 mt-2" src="/logo.png" alt="logo" />
                </Link>                
                <form className="m-auto" onSubmit={(e) => submitHandle(e)}>              
                    <div className="form-group has-danger">
                        <label className="form-label mt-2 text-primary">Email</label>
                        <input 
                            type="email" 
                            className={`form-control border border-primary text-primary`} 
                            id="mail"
                            name="email" 
                            placeholder="Enter Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                    </div>

                    <div className="form-group has-success">
                        <label className="form-label mt-2 text-primary">Password</label>
                        <input 
                            type="password" 
                            className="form-control border border-primary text-primary" 
                            id="pass1"
                            name="password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />                        
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Login</button>
                </form>

                <h6 className="text-center mb-3 mt-1">
                    <Link className="fgpss text-primary text-decoration-none" to="/register">Forget password?</Link>
                </h6>
            </div> 
        </div>
    )
}

export default Login
