import React from 'react';
import '../../css/Profile.css'; 
import Profile from '../../components/Profile';
import UserMoment from '../../components/DashMoment';
import UserListTemp from '../../components/UserListTemp';

const Dashboard = () => {
    return (
        <>
        <div className="container dashbord d-flex">
            <div className="user-detail">
                <Profile />
            </div>

            <div className="dashbord-list">
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
                <UserListTemp />
            </div>
            
            {/* <div className="dashbord-moments">
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />
                <UserMoment />                
            </div> */}
        </div>
        </>
    )
}

export default Dashboard
