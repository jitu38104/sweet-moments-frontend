import '../css/DashMoment.css';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { userContext } from '../userContex';
import { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { getToken } from '../services/localStore';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const DashMoment = ({ data, userId, flags }) => {
    const { setUser, user } = useContext(userContext);
    const [visiblity, setVisiblity] = useState(false);

    const hoverHandle = (flag) => {
        flag ? setVisiblity(true) : setVisiblity(false);
    }

    const deleteHandler = () => {
        const url = `/moment/delete/${data._id}`;
        
        getToken().then(token => {
            axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                axios.get('/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(result => {
                    flags.setFlag(flags.flag + 1);
                    setUser(result.data);
                }).catch(err => console.error(err.response.data));
            }).catch(err => console.error(err.response.data));
        }).catch(err => console.error(err));        
    }
    
    return (
        <div className="img">
            
                <div 
                    className="img-container"                     
                    onMouseOver={() => {hoverHandle(1)}}
                    onMouseLeave={() => {hoverHandle(0)}}
                >
                    <img
                        src={ data?.image_path }
                        alt="moment-img"
                    />
                    {
                        user._id === userId
                        ?
                            <div 
                                className={ `img-edit d-flex ${ visiblity ? "visible" : "invisible" }` } 
                                id="imgEditBox"
                            >
                                <Link to={`/${userId}/dashboard/moment/edit?id=${ data._id }`}>
                                    <EditIcon className="me-1" titleAccess="edit image" />
                                </Link>
                                
                                <Link to="#" onClick={ deleteHandler }>
                                    <DeleteIcon titleAccess="delete image" />
                                </Link>
                            </div>                           
                        :   null
                    }  
                     <Link to={ `/${userId}/dashboard/moment?id=${ data._id }` }>
                        <div 
                            className={ `img-watch ${ visiblity ? "visible" : "invisible" }` } 
                            id="visualIcon"
                        >
                            <VisibilityIcon titleAccess="see image" />
                        </div>
                    </Link>                                                         
                </div>            
        </div>
    )
}

export default DashMoment