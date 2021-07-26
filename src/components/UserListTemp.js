import React from 'react';
import '../css/UserListTemp.css';

const UserListTemp = () => {
    return (
        <div className="userTemp d-flex align-items-center">
            <img 
                src="https://p.favim.com/orig/2018/10/30/blonde-gorgeous-girl-Favim.com-6479337.jpg" 
                alt="avatar-img"
            />

            <div className="right-container">
                <div className="user-info">
                    <h5>Jitender kumar</h5>
                    <h6>Jitender.jk54@gmail.com</h6>
                </div>
                <div className="user-btn d-flex">
                    <h6 className="me-2">followers <span>4K</span></h6>
                    <h6 className="me-2">following <span>5K</span></h6>
                    <h6>moments <span>1K</span></h6>
                </div>
            </div>            
        </div>
    )
}

export default UserListTemp

