import '../../css/Admin.css';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { Link } from 'react-router-dom';
import { getToken } from '../../services/localStore';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [flag, setFlag] = useState(0);
    const [isDisplay, setIsDisplay] = useState(false);
    
    useEffect(() => {
        axios.get('user/all/admin').then(res => {
            console.log(res.data);
            setUsers(res.data);
        }).catch(err => console.error(err));
    }, [flag]);

    const deleteHandler = (id) => {
        const url = `user/del?user_id=${id}`;
        
        getToken().then(token => {
            axios.delete(url, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if(res.data?.flag){
                    setFlag(flag + 1);
                    setIsDisplay(true);
                    setTimeout(() => { 
                        setIsDisplay(false);
                    }, 2000);
                }                
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));        
    }

    return (
        <div className='admin'>
            <div className={isDisplay ? "success-message" : "d-none"}>
                <p>Removed sucessfully</p>
            </div>
            <div className='container'>
                <div className="head-section mt-3">
                    <h2 className="text-center">
                        All 'Sweet-Moments' User
                    </h2>
                    <div className="total">
                        <Link to='/'>
                            <span className="ms-5" title="Home page">
                                Home
                            </span>
                        </Link>                        
                        <h4 className="text-center">
                            Total: { users.length }
                        </h4>
                    </div>
                    
                </div>
                <div className='user-container mt-3 m-auto'>
                    <div className="title-head">
                        <h6>Profile</h6>
                        <h6>Name</h6>
                        <h6>Email</h6>
                        <h6>Delete</h6>
                    </div>


                    <div className="all-users">
                        {
                            users.map(user => {
                                return <div className="user" key={user?._id}>
                                            <div className="user-img">
                                                <img 
                                                    src={ "https://sweet-moments-app.herokuapp.com/"+user.image_path }
                                                    alt="user-img"
                                                />
                                            </div>
                                            <div className={user.role === 'admin' ? "admin-name" : "user-name"}>
                                                <h5>{ user.name }</h5>
                                            </div>
                                            <div className={user.role === 'admin' ? "admin-email" : "user-email"}>
                                                <h5>{ user.email }</h5>
                                            </div>
                                            <div className="user-del">
                                            {
                                                user?.role !== 'admin'
                                                ?
                                                    <DeleteForeverSharpIcon 
                                                        className='delIcon' 
                                                        titleAccess="delete user" 
                                                        onClick={() => deleteHandler(user._id)}
                                                    />
                                                :
                                                    null
                                            }                                                
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                                        
                </div>
            </div>            
        </div>
    )
}

export default Admin
