import { useState } from 'react';
import axios from '../../config/axios';

const EmailVarify = () => {
    const [flag, setFlag] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('#41d7a7');

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(email);
        axios.post('/user/varify', { email }).then(res => {            
            const msg = res.data?.message;
            console.log(msg);
            msg.includes('invalid')             
            ? setColor('#FF2400') 
            : setColor('#41d7a7');
            setMessage(msg);
            setFlag(true);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div 
            className="container email-varify" 
            style={{
                height: '60vh'
            }}
        >
            <form onSubmit={submitHandler}>
                <div className="text-center mt-4 inp-btn-con">
                    <h4>Password reset request</h4>
                    <div className="d-flex justify-content-center inp-btn">                    
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email"
                            value={ email }
                            id="emailVarify"
                            onChange={ (e) => setEmail(e.target.value) }
                            style={{                                
                                width: '50%',
                                color: 'black',
                                height: '3rem',
                                borderRadius: '5px',
                                marginRight: '0.75rem',
                                backgroundColor: '#f8f9fa'
                            }}
                        />  

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Request
                        </button>

                    </div>
                </div>                            
            </form>

            <div 
                className='email-alert'
                style={{                    
                    width: '50%',
                    color: color,
                    display: flag ? "block": "none",
                    padding: '2rem 0',
                    textAlign: 'center',
                    margin: '2rem auto 0 auto',
                    border: `5px solid ${color}`
                }}
            >
                <h3>{ message }</h3>
            </div>
        </div>
    )
}

export default EmailVarify
