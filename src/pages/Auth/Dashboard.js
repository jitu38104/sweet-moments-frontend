import '../../css/Profile.css'; 
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';
import Profile from '../../components/Profile';
import { userContext } from '../../userContex';
import UserMoment from '../../components/DashMoment';
import { useContext, useEffect, useState } from 'react';
import UserListTemp from '../../components/UserListTemp';

const Dashboard = () => {
    const { id } = useParams();
    const [dashUser, setDashUser] = useState(0);
    const { type } = useContext(userContext);
    const [ flag, setFlag ] = useState(0);

    useEffect(() => {
        const url = `/user/lite/me/${id}`;
        
        axios.get(url).then(res => {
            console.log(res.data);
            setDashUser(res.data);
        }).catch(err => console.error(err));
    }, [id, flag]);

    return (
        <>
        {
            dashUser
            ?
                <div className="container dashbord d-flex">
                    <div className="user-detail">
                        <Profile userData={dashUser} userId={id} />
                    </div>

                    {
                        type === 'moment'
                        ?   
                            <div className="dashbord-moments">
                                {
                                    dashUser?.moments?.moment.map((item, index) => {
                                        return <UserMoment 
                                                    key={ index } 
                                                    data={ item } 
                                                    userId={id} 
                                                    flags={{flag, setFlag}}                                                    
                                                />
                                    })
                                }                                        
                            </div>
                        : type === 'follower'
                        ?
                            <div className="dashbord-list">
                            {
                                dashUser?.followers?.users.map((id, index) => {
                                    return <UserListTemp key={index} follower={id} />
                                })
                            }
                            </div>
                        :
                            <div className="dashbord-list">
                            {
                                dashUser?.following?.users.map((id, index) => {
                                    return <UserListTemp key={index} follower={id} />
                                })
                            }
                            </div>
                    }            
                </div>
            :
                null
        }        
        </>
    )
}

export default Dashboard
