import React from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';

const Profile = () => {
    return (
        <div className="profile d-flex flex-column pt-4 ps-3">
            <Link to="/myList/setting">
                <div className="setting-icon">
                    <SettingsIcon titleAccess="general profile setting" />
                </div>
            </Link>
                        
            <div className="profile-img">
                <img src="https://p.favim.com/orig/2018/10/30/blonde-gorgeous-girl-Favim.com-6479337.jpg" alt="profile-img" />
            </div>
            <div className="profile-name mt-2">
                <div className="name-img d-flex align-items-center">
                    <h1>Ashley Todd</h1>
                    <img className="mb-2 ms-1" src="tick.png" alt="tick-png" />
                </div>
                
                <h6 className="">@ashleyTodd</h6>
                <p>Designer</p>
            </div>
            <div className="profile-btn">
                <button type="button" className="btn btn-primary me-1">Follow</button>
                <button type="button" className="btn btn-info me-1">Message</button>
                <button type="button" className="btn btn-info">E-mail</button>
            </div>
            <div className="profile-about mt-4">
                <p className="about">
                    Bringing you closer to the people and the ones you love.
                </p>
                <p className="add">
                    Founder of <span>@toddagency</span>. WATCH <span>@mynameisasley</span> 
                </p>
            </div>
            <div className="profile-counter mt-3 mb-3">
                <div className="counter-moment">
                    <h5>
                        <span>1,475</span>
                        <span>moments</span>
                    </h5>
                </div>
                <div className="counter-follower">
                    <h5>
                        <span>1,475</span>
                        <Link to="/followers">
                            <span>followers</span>
                        </Link>                        
                    </h5>
                </div>
                <div className="counter-following">
                    <h5>
                        <span>1,475</span>
                        <Link to="/following">
                            <span>following</span>
                        </Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Profile
