import '../css/Card.css';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { userContext } from '../userContex';
import { getToken } from '../services/localStore';
import { useState, useEffect, useContext } from 'react';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';

const Card = ({ data, setExit, setInfo }) => {
    const { user, setUser } = useContext(userContext);
    const [likeCount, setLikeCount] = useState(data.meta.likes);
    const [isLike, setIsLike] = useState(false);
    const [userData, setUserData] = useState({});  

    useEffect(() => {
        axios.get(`/user/lite/me/${data?.user_id}`).then(res => {
            setUserData(res.data);
        }).catch(err => {
            console.log(err.response.data);
        });

        const likedArr = user?.meta?.liked || [];
        const flag = likedArr.some(item => item === data._id);
        setIsLike(flag);       
        
    },[user, data]);
    

    const userRefreshControl = () => {
        getToken().then(token => {
            axios.get('/user/me', {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }).then(result => {
                setUser(result.data);            
            }).catch(err => console.error(err.response.data));
        }).catch(err => console.error(err));
    }


    const likeHandler = () => {
        const url = `moment/like/${data?.user_id}/${data?._id}`;

        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data?.flag) {
                    console.log(res.data);
                    userRefreshControl();
                    setLikeCount( likeCount + 1 );
                    setIsLike(true);
                }
            }).catch(err => console.log(err.response.data));
        }).catch(err => console.error(err));
    }

    const dislikeHandler = () => {
        const url = `moment/dislike/${data?.user_id}/${data._id}`;

        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data?.flag) {
                    console.log(res.data);
                    userRefreshControl();
                    setLikeCount( likeCount - 1 );
                    setIsLike(false);
                }
            }).catch(err => console.log(err.response.data))
        }).catch(err => console.error(err));
    }

    const shareStateHandler = (path, name) => {
        console.log(path, name);
        setExit(false);
        setInfo({
            img_url: path,
            username: name
        });
    }

    return (
        <div className="Card container mt-2">
            <div className="card-info card m-auto">
                <Link to={`/${data?.user_id}/dashboard`}>
                    <div className="card-header d-flex align-items-center">
                        <img 
                            src={ userData?.img_path }
                            title={userData?.name}
                            alt="profile-img"                             
                        />
                        <div className="card-user">
                            <h3>{ userData?.name }</h3>
                            <h6>{ userData?.email }</h6>
                        </div>
                    </div>
                </Link>
                <div className="card-desc">
                    <p>
                        { data.description.substring(0, 150)+'...' }                        
                    </p>
                </div>
                <div className="card-img">
                    <Link to={`/${data?.user_id}/dashboard/moment?id=${data._id}`}>
                        <img 
                            src={ data.image_path }
                            alt="moment-img" 
                        />
                        <h5>{ data.title }</h5>
                    </Link>                    
                </div>
                <div className="card-btn d-flex justify-content-between">
                    <div onClick={() => isLike ? dislikeHandler() : likeHandler()}>
                        <FavoriteSharpIcon className={`${isLike ? "liked" : "unliked"}`} titleAccess="Like/Dislike" />
                        <span> { likeCount }</span>
                    </div>
                    <div>
                        <Link to={`/${data?.user_id}/dashboard/moment?id=${data._id}`}>
                            <ChatBubbleRoundedIcon titleAccess="Comment" />
                        </Link>                        
                    </div>
                    <div>
                        <ShareRoundedIcon 
                            onClick={() => shareStateHandler(data.image_path, user.name)} 
                            titleAccess="Share"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
