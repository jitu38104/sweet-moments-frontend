import moment from 'moment';
import axios from '../config/axios';
import { useEffect, useState } from 'react';

const Message = ({ info }) => {
    const [commentOwner, setCommentOwner] = useState()
    
    useEffect(() => {
         axios.get(`/user/lite/me/${info.id}`).then(res => {            
            setCommentOwner(res.data);            
        }).catch(err => console.error(err.response.data));
    }, [info]);

    return (
        <div className="message d-flex align-items-center">
            <img
                src={ commentOwner?.img_path }
                alt="user-img"
            />       
            <div className="user-msg">
                <h6>
                    { commentOwner?.name } &nbsp;&nbsp;
                    <span>{ moment(info?.date).format("MMMM Do, YYYY") } </span>
                </h6>
                <p> { info?.comment } </p>
            </div>     
        </div>
    )
}

export default Message
