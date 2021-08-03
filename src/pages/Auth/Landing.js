import { useHistory } from 'react-router-dom';
import '../../css/Landing.css';

const Landing = () => {
    const history = useHistory();

    return (
        <div className="landing d-flex">
            <div className="note">
                <div className="details">
                    <h1>
                        Want to share your sweet moments with other people who could be your friends?
                    </h1>
                    <p>If so, It's time to make an account in our social app in order to share your sweet moments & make friends.</p>
                </div>                
            </div>
            <div className="buttons card">
                <img src="/logo.png" alt='logo-png' />
                <button className="btn btn-primary" onClick={() => history.push('/login')}>
                    SIGN IN
                </button>
                <button className="btn btn-primary" onClick={() => history.push('/register')}>
                    SIGN UP
                </button>
            </div>
        </div>
    )
}

export default Landing
