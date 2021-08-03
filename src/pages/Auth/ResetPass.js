import '../../css/Login.css';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
    const history = useHistory();
    const [pass2, setPass2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisplay, setIsDisplay] = useState(false);    

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userEmail = params.get('email');
        setEmail(userEmail);
    }, []);

    const submitHandle = (e) => {
        e.preventDefault();
        const body = {password, email}; 
        
        axios.post('/user/password/reset', body).then(res => {
            if(res.data?.flag){
                setIsDisplay(true);
                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            }
        }).catch(err => console.error(err));
    }

    return (
        <div className="login position-relative">   
            <div className={isDisplay ? "success-message" : "d-none"} style={{top: '-5rem'}}>
                <p>updated sucessfully</p>
            </div>         
            <div className="login-form d-flex flex-column justify-content-center mt-5">                               
                <h4 className="text-primary text-center mt-3">Reset Password</h4>
                <form className="m-auto" onSubmit={(e) => submitHandle(e)}>              
                    <div className="form-group has-danger">
                        <label className="form-label mt-2 text-primary">Password</label>
                        <input 
                            type="password" 
                            className="form-control border border-primary text-primary"                             id="mail"
                            name="pass1" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}    
                        />
                    </div>

                    <div className="form-group has-success">
                        <label className="form-label mt-2 text-primary">Retype-Password</label>
                        <input 
                            type="password" 
                            className="form-control border border-primary text-primary" 
                            name="pass2" 
                            placeholder="Enter Retype-password" 
                            value={pass2}
                            onChange={(e) => setPass2(e.target.value)}
                        />                        
                    </div>
                    <div className="text-center mt-2 mb-2">
                        <button type="submit" className="btn btn-primary mt-2">Reset</button>
                    </div>                    
                </form>
            </div> 
        </div>
    )
}

export default Login
