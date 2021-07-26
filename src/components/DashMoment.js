import { useState } from 'react';
import '../css/DashMoment.css';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const DashMoment = () => {
    const [visiblity, setVisiblity] = useState(false)

    const hoverHandle = (flag) => {
        flag ? setVisiblity(true) : setVisiblity(false);
    }


    return (
        <div className="img">
            
                <div 
                    className="img-container"                     
                    onMouseOver={() => {hoverHandle(1)}}
                    onMouseLeave={() => {hoverHandle(0)}}
                >
                    <img
                        src="https://i.pinimg.com/originals/7e/24/8c/7e248c8782c1fb4963dc62c3c074d4b4.jpg"
                        alt="moment-img"
                    />
                    <div 
                        className={`img-edit d-flex ${visiblity ? "visible" : "invisible"}`} 
                        id="imgEditBox"
                    >
                        <Link to="/edit-moment">
                            <EditIcon className="me-1" titleAccess="edit image" />
                        </Link>
                        
                        <Link to="#">
                            <DeleteIcon titleAccess="delete image" />
                        </Link>
                    </div>
                    <Link to="/single">
                        <div 
                            className={`img-watch ${visiblity ? "visible" : "invisible"}`} 
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