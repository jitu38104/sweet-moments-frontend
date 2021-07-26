import { useState, useEffect } from 'react';
import '../../css/Register.css';
import { Link } from 'react-router-dom';

// is-valid is-invalid
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rPass, setRpass] = useState("");
    const [emailClass, setEmailClass] = useState("");
    const [passClass, setPassClass] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({name, email, password, rPass})
    }

    useEffect(() => {
        const mail = "jk38104@gmail.com";                

        console.log(email)
        if(email.includes('.com')) {
            email === mail ? setEmailClass('is-invalid') : setEmailClass('is-valid'); 
        } else {
            setEmailClass('')
        }
    }, [email]);
    
                
    

    useEffect(() => {
        if(password.length !== 0) {
            if(password.length === rPass.length) {
                password === rPass ? setPassClass('is-valid') : setPassClass('is-invalid');         
            } else {
                setPassClass('');
            }
        }        
    }, [rPass, password]);

    return (
        <div className="register">
            <div className="register-form d-flex flex-column justify-content-center">
            <Link to="/" className="m-auto">
                <img className="mb-1 mt-2" src="/logo.png" alt="logo" />
            </Link>                
                <form className="m-auto" onSubmit={(e) => {submitHandle(e)}}>
                    <div className="form-group has-success">
                        <label className="form-label mt-2 text-primary">Name</label>
                        <input 
                            type="text" 
                            className="form-control border border-primary text-primary" 
                            id="name"
                            name="name" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />                        
                    </div>

                    <div className="form-group has-danger">
                        <label className="form-label mt-2 text-primary">Email</label>
                        <input 
                            type="email" 
                            className={`form-control border border-primary text-primary ${emailClass}`} 
                            id="mail"
                            name="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                        <div className="invalid-feedback">Sorry, that username's taken. Try another?</div>
                        <div className="valid-feedback">This email seems to be unused.</div>
                    </div>

                    <div className="form-group has-success">
                        <label className="form-label mt-2 text-primary">Password</label>
                        <input 
                            type="password" 
                            className="form-control border border-primary text-primary" 
                            id="pass1"
                            name="password" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="valid-feedback">Success! You've done it.</div>
                    </div>

                    <div className="form-group has-success">
                        <label className="form-label mt-2 text-primary">Repeat Password</label>
                        <input
                            type="password" 
                            className={`form-control border border-primary text-primary ${passClass}`} 
                            id="pass2"
                            name="repeat_password" 
                            placeholder="Enter repeat password" 
                            value={rPass}
                            onChange={(e) => setRpass(e.target.value)}
                        />
                        <div className="valid-feedback">passwords matched.</div>
                        <div className="invalid-feedback">passwords mismatch.</div>
                    </div>                   
                        <button type="submit" className="btn btn-primary mt-2">Register</button>                    
                </form>
            </div>            
        </div>
    )
}

export default Register
