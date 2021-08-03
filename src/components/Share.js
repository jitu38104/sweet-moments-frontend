import '../css/Share.css';
import EmailIcon from '@material-ui/icons/Email';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { 
    FacebookButton, FacebookCount,
    TwitterButton, TwitterCount,
    LinkedInButton, LinkedInCount, 
    RedditButton, RedditCount,
    PinterestButton, PinterestCount,
    EmailButton,
 } from 'react-social';

const Share = (props) => {
    const facebookAppId = '3151898548370026';
    const message = `${props.user} has sent you to show something interesting`;

    return (
      <div className='share-btns'>        
        <div className='row-1'>
            <div className='facebook-btn'>
                <FacebookButton className='btn btn-primary' message={message} url={props.url} appId={facebookAppId}>            
                    <FacebookCount url={props.url} />&nbsp;&nbsp;
                    <FacebookIcon />
                </FacebookButton>
            </div>        

            <div className='twitter-btn'>
                <TwitterButton className='btn btn-primary' message={message} url={props.url}>
                    <TwitterCount url={props.url} />&nbsp;&nbsp;
                    <TwitterIcon />
                </TwitterButton>
            </div>

            <div className='linkedin-btn'>
                <LinkedInButton className='btn btn-primary' message={message} url={props.url}>
                    <LinkedInCount url={props.url} />&nbsp;&nbsp;
                    <LinkedInIcon />
                </LinkedInButton>
            </div>
        </div>


        <div className='row-2'>
            <div className='reddit-btn'>
                <RedditButton className='btn btn-primary' message={message} url={props.url}>
                    <RedditCount url={props.url} />&nbsp;&nbsp;
                    <RedditIcon />
                </RedditButton>
            </div>

            <div className='pinterest-btn'>
                <PinterestButton className='btn btn-primary' message={message} url={props.url}>
                    <PinterestCount url={props.url} />&nbsp;&nbsp;
                    <PinterestIcon />
                </PinterestButton>
            </div>

            <div className='email-btn'>
                <EmailButton className='btn btn-primary' message={message} url={props.url}>
                    <EmailIcon />
                </EmailButton>
            </div>
        </div>              
      </div>
    );
}

export default Share
