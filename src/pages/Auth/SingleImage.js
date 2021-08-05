import '../../css/SingleImage.css';
import axios from '../../config/axios';
import Share from '../../components/Share';
import Message from '../../components/Message';
import { userContext } from '../../userContex';
import CancelIcon from '@material-ui/icons/Cancel';
import { getToken } from '../../services/localStore';
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

const SingleImage = () => {
    const { id } = useParams();
    const [close, setClose] = useState(true);
    const [isFollow, setIsFollow] = useState(false);
    const [followCount, setFollowCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [allComment, setAllComment] = useState(0)
    const [comment, setComment] = useState("");
    const [imageId, setImageId] = useState(null);
    const [momentOwner, setMomentOwner] = useState({})
    const [momentData, setMomentData] = useState({});
    const { user } = useContext(userContext);
    const history = useHistory();
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('id');
        setImageId(query);
        const url = `/moment/one/moment/${query}?user_id=${id}`;

        axios.get(url).then(res => {
            setMomentData(res.data[0]);
            setLikeCount(res.data[0].meta?.likes);
            const comments = res.data[0].comments;
            const reversedArr = comments.reverse();
            setAllComment(reversedArr);
        }).catch(err => console.error(err));

        axios.get(`/user/lite/me/${id}`).then(res => {            
            setMomentOwner(res.data);            
        }).catch(err => console.error(err));

        const likedArr = user?.meta?.liked || [];
        const followingArr = user?.meta?.followings?.users || [];
        setFollowCount(user?.meta?.followings?.total);

        const flag = likedArr.some(item => item === query);
        setIsLike(flag);

        const followingFlag = followingArr.some(item => item === id);
        console.log(followingArr)
        setIsFollow(followingFlag);
    }, [id, user]);

    const submitComment = () => {
        const body = { 
            other_id: id,
            momentId: imageId, 
            comment, 
            date: new Date() 
        }

        getToken().then(token => {
            axios.post('/moment/add/comment', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data); 
                const comments = res.data?.updated;
                const reversedArr = comments.reverse();               
                setAllComment(reversedArr);
                setComment('');
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }


    const likeHandler = () => {
        const url = `moment/like/${id}/${imageId}`;

        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data?.flag) {
                    console.log(res.data);
                    setLikeCount( likeCount + 1 );
                    setIsLike(true);
                }
            })
        }).catch(err => console.error(err));
    }

    const dislikeHandler = () => {
        const url = `moment/dislike/${id}/${imageId}`;

        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data?.flag) {
                    console.log(res.data);
                    setLikeCount( likeCount - 1 );
                    setIsLike(false);
                }
            })
        }).catch(err => console.error(err));
    }

    const followHandler = () => {
        const url = `user/follow/${id}`;
        
        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                setFollowCount(followCount + 1);
                setIsFollow(true);
            })
        }).catch(err => console.error(err));
    }
    
    const unfollowHandler = () => {
        const url = `user/unfollow/${id}`;
        
        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                setFollowCount(followCount - 1);
                setIsFollow(false);
            })
        }).catch(err => console.error(err));
    }

    return (
        <div className="moment container">
            <div className={close ? "d-none" : "share-box"}>
                <div className='share-container'>
                <CancelIcon 
                    className='close-btn' 
                    titleAccess='Close' 
                    onClick={() => close ? setClose(false) : setClose(true)}
                />
                <Share user={user?.name} url={momentData?.image_path} />
                </div>            
            </div>

            <div className="back-btn" onClick={history.goBack}>
                <BackspaceIcon fontSize="large" titleAccess="Back" />
            </div>
            
            <div className="post d-flex ">
                <div className="left-container">            
                    <img
                        src={momentData?.image_path}
                        alt="img" 
                    />
                    <div className="post-btn d-flex justify-content-evenly">
                        <div onClick={() => isLike ? dislikeHandler() : likeHandler()}>
                            <FavoriteSharpIcon 
                                titleAccess="Like/Dislike" 
                                className={`${isLike ? "liked" : "unliked"}`} 
                            />
                            <span> { likeCount }</span>
                        </div>
                        <div>
                            <ShareRoundedIcon 
                                titleAccess="Share" 
                                onClick={() => setClose(false)}
                            />
                        </div>
                    </div>

                    <div className="post-author d-flex justify-content-between align-items-center">
                        <div className="author-detail d-flex align-items-center">
                            <img 
                                src={ momentOwner?.img_path }
                                alt="author-img" 
                            />
                            <div className="author-name">
                                <h5>{ momentOwner?.name }</h5>
                                <h6>
                                {followCount} {followCount > 1 ? "Followers" : "Follower"}
                                </h6>
                            </div>
                        </div>

                        <button 
                            className={ isFollow ? "btn btn-primary faded" : "btn btn-primary"}
                            type="button"
                            disabled={ id !== user._id ? false : true }
                            onClick={() => isFollow ? unfollowHandler() : followHandler()}
                        >
                            { isFollow ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                </div>

                <div className="right-container">
                    <div className="post-title">
                        <h4>
                            { momentData?.title }
                        </h4>
                    </div>
                    <div className="post-detail">
                        <p>
                            { momentData?.description }                            
                        </p>
                    </div>
                </div>
            </div> 

           
            <div className="post-comment">
                <div className="comment-input d-flex align-items-center">
                    <img
                        src={ `https://damp-beyond-66324.herokuapp.com/${user?.image_path}` }
                        //src={ `http://localhost:5000/${user?.image_path}` }
                        alt="user-img"
                    />     
                    <input 
                        type="text"
                        className="form-control"
                        name="comment"
                        value={comment}
                        placeholder="write your comment..."
                        onChange={ (e) => setComment(e.target.value) }
                    />
                    <button type="button" className="btn btn-info" onClick={submitComment}>
                        comment
                    </button>
                </div>
                
                <div className="comment-box">
                    <div className="comment-title mb-3">
                        <h4>Comments:</h4>       
                    </div>
                    {
                        allComment
                        ?
                            allComment.map((data, index) => {
                                return <Message key={index} info={data} />
                            })
                        : ""
                    } 
                </div>
            </div>     

        </div>
    )
}

export default SingleImage