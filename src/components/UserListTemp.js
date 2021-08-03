import '../css/UserListTemp.css';
import axios from '../config/axios';
import { useEffect, useState } from 'react';

const UserListTemp = ({ follower }) => {    
    const [otherUser, setOtherUser] = useState(false);

    useEffect(() => {
        const url = `/user/lite/me/${follower}`;
        
        axios.get(url).then(res => {
            setOtherUser(res.data);
        }).catch(err => console.error(err.response.data));
    }, [follower]);

    return (
        <>
            {
                otherUser
                ?
                    <div className="userTemp d-flex align-items-center">
                        <img 
                            src={ otherUser?.img_path }
                            title={otherUser?.name}
                            alt="avatar-img"
                        />

                        <div className="right-container">
                            <div className="user-info">
                                <h5>{ otherUser?.name }</h5>
                                <h6>{ otherUser?.email }</h6>
                            </div>
                            <div className="user-btn d-flex">
                                <h6 className="me-2">followers <span>{ otherUser?.followers?.total }</span></h6>
                                <h6 className="me-2">following <span>{ otherUser?.following?.total }</span></h6>
                                <h6>moments <span>{ otherUser?.moments.total }</span></h6>
                            </div>
                        </div>
                    </div>
                :
                    null
            } 
        </>           
        
    )
}

export default UserListTemp

