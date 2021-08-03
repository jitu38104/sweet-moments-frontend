import '../css/Profile.css';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { userContext } from '../userContex';
import { getToken } from '../services/localStore';
import SettingsIcon from '@material-ui/icons/Settings';
import { useContext, useState, useEffect } from 'react';

const Profile = ({ userData, userId }) => {
    const { setType, user } = useContext(userContext);
    const [data, setData] = useState(userData);
    const [classType, setClassType] = useState('invisible');
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        const followerArr = user?.meta?.followings?.users || [];
        const followFlag = followerArr.some(id => id === userId);
        setIsFollow(followFlag);
    }, [user, userId]);

    const hoverHandle = (type) => {
        type
        ? setClassType('visible')
        : setClassType('invisible')
    }

    const userRefreshControl = () => {
        const url = `/user/lite/me/${userId}`;
        
        axios.get(url).then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(err => console.error(err.response.data));
    }

    const followHandler = () => {
        const url = `user/follow/${userId}`;
        
        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                userRefreshControl();
                setIsFollow(true);
            })
        }).catch(err => console.error(err.response.data));
    }

    const unfollowHandler = () => {        
        const url = `user/unfollow/${userId}`;
        
        getToken().then(token => {
            axios.get(url, {                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                userRefreshControl();
                setIsFollow(false);
            })
        }).catch(err => console.error(err.response.data));
    }

    return (
        <div 
            className="profile pt-4" 
            onMouseOver={() => hoverHandle(1)}
            onMouseLeave={() => hoverHandle(0)}
        >
        
            <Link to={`/${userId}/dashboard/edit`} className={classType}>
            {
                user._id === userId
                ?
                <div className="setting-icon">                    
                    <SettingsIcon titleAccess="general profile setting" />
                </div>
                : ""
            }
                
            </Link>

            {/* for small screens */}
            <Link to={`/${userId}/dashboard/edit`} className='other-link d-none'>
            {
                user._id === userId
                ?
                <div className="setting-icon2">                    
                    <SettingsIcon titleAccess="general profile setting" />
                </div>
                : ""
            }
                
            </Link>
            {/* ----------------------------------------------------- */}

            <div className='img-btns'>         
                <div className="profile-img">
                    <img src={data.img_path} alt="profile-img" />
                </div>
                <div className="name-btns">
                    <div className="profile-name mt-2">
                        <div className="name-img d-flex align-items-center">
                            <h1>{data.name}</h1>
                            <img className="mb-2 ms-1" src="/tick.png" alt="tick-png" />
                        </div>
                        
                        <h6 className="">{data.email}</h6>
                        <p>{ data?.profession || "Unknown" }</p>
                    </div>
                    <div className="profile-btn">
                    {
                        user._id !== userId
                        ?
                        <button 
                            type="button" 
                            className={`btn btn-primary me-1 ${isFollow ? 'faded' : ''}`}
                            onClick={() => isFollow ? unfollowHandler() : followHandler()}
                        >
                        { isFollow ? 'Unfollow' : 'Follow' } 
                        </button>
                        : null
                    }
                        
                        <button disabled type="button" className="btn btn-primary me-1">Message</button>
                        <button disabled type="button" className="btn btn-primary">E-mail</button>
                    </div>
                </div>                
            </div>

            <div className='about-links'>           
                <div className="profile-about mt-4">
                    <p className="about">
                        {`"${data.about}"`}
                    </p>
                    <p className="add">
                        Founder of <span>@toddagency</span>. WATCH <span>@mynameisasley</span> 
                    </p>
                </div>
                <div className="profile-counter mt-3 mb-3">
                    <div className="counter-moment">
                        <h5>
                            <span>{ data?.moments?.total }</span>
                            <Link to="#" onClick={() => setType('moment')}>
                                <span title="all moments">moments</span>
                            </Link>
                        </h5>
                    </div>
                    <div className="counter-follower">
                        <h5>
                            <span>{ data?.followers?.total }</span>
                            <Link to="#" onClick={() => setType('follower')}>
                                <span title="all followers">followers</span>
                            </Link>                        
                        </h5>
                    </div>
                    <div className="counter-following">
                        <h5>
                            <span>{ data?.following?.total }</span>
                            <Link to="#" onClick={() => setType('following')}>
                                <span title="all following">following</span>
                            </Link>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
