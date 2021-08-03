import '../css/Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container">
                <div className="icons">
                    <span>
                        <FacebookIcon />
                    </span>
                    <span>
                        <InstagramIcon />
                    </span>
                    <span>
                        <TwitterIcon />
                    </span>
                </div>

                <div className="terms">
                    <div className="top">
                        <p>Info</p>
                        <p>Support</p>
                        <p>Marketing</p>
                    </div>
                    <div className="down">
                        <p>Terms of Use</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>

                <div className="copyright">
                    <p>made with ❤️ Jitender</p>
                    <p>Copyright©️ 2021: Sweet_Moments</p>                    
                </div>
            </div>
        </div>
    )
}

export default Footer
