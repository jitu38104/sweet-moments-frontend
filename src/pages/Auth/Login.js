import '../../css/Login.css';
import axios from '../../config/axios';
import { useState, useContext } from 'react';
import { userContext } from '../../userContex';
import { Link, useHistory } from 'react-router-dom';
import { addToken } from '../../services/localStore';

const Login = () => {
    const history = useHistory();
    const { setIsLogged } = useContext(userContext);
    const [email, setEmail] = useState('');
    const [isDisplay, setIsDisplay] = useState(false);
    const [login, setLogin] = useState(false);
    const [password, setPassword] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();        
        
        axios.post('/user/login', {
            email: email, 
            password: password
        }).then(res => {
            addToken(res.data?.access_token);
            setLogin(true);
            setIsLogged(true);
            setTimeout(() => {
                history.push('/');
            }, 1000);            
        }).catch(err => {
            setIsDisplay(true);
            setTimeout(() => {
                setIsDisplay(false);
            }, 3000);
            console.log(err);
        });
    }

    return (
        <>
        <div 
            className={isDisplay || login ? "success-message" : "d-none"} 
            style={{ backgroundColor: login ? '#4BB543' : '#ff0f0f' }}
        >
            <p>{login ? 'Login successfully!' : 'Either Username or Password is wrong!'}</p>
        </div>
        
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
                    <Link 
                        className="fgpss text-primary text-decoration-none" 
                        to="/account/password/reset/request"
                    >
                        Forget password?
                    </Link>
                </h6>
            </div> 
        </div>
        </>
    )
}

export default Login
