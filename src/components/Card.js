import '../css/Card.css';
import axios from '../config/axios';
import { useState, useEffect } from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';

const Card = ({ data, userId }) => {
    const [isLike, setIsLike] = useState(false);
    const [userData, setUserData] = useState({});  

    useEffect(() => {
        axios.get(`/user/lite/me/${userId}`).then(res => {
            setUserData(res.data);
        }).catch(err => {
            console.log(err);
        });
    },[userId]);

    return (
        <div className="Card container">
            <div className="card-info card m-auto">
                <div className="card-header d-flex align-items-center">
                    <img 
                        src="https://p.favim.com/orig/2018/10/30/blonde-gorgeous-girl-Favim.com-6479337.jpg"
                        alt="profile-img"                             
                    />
                    <div className="card-user">
                        <h3>{ userData?.name }</h3>
                        <h6>{ userData?.email }</h6>
                    </div>
                </div>
                <div className="card-desc">
                    <p>
                        { data.description }                        
                    </p>
                </div>
                <div className="card-img">
                    <img 
                        src={ data.image_path }
                        alt="moment-img" 
                    />
                    <h5>{ data.title }</h5>
                </div>
                <div className="card-btn d-flex justify-content-between">
                    <div onClick={() => { isLike ? setIsLike(false) : setIsLike(true) }}>
                        <FavoriteSharpIcon className={`${isLike ? "liked" : "unliked"}`} />
                    </div>
                    <div>
                        <ChatBubbleRoundedIcon />
                    </div>
                    <div>
                        <ShareRoundedIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
