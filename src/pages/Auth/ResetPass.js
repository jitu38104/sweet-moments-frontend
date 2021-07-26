import '../../css/Login.css';
import { useState } from 'react';

const Login = () => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({pass1, pass2});
    }

    return (
        <div className="login">            
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
                            value={pass1}
                            onChange={(e) => setPass1(e.target.value)}    
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
