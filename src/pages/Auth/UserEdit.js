import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import '../../css/UserEdit.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({name, about});
    }

    const hoverHandle = (flag) => {
        flag
        ? document.getElementById("editPen").style.display = "block"
        : document.getElementById("editPen").style.display = "none"
    }
    return (
        <div className="edit-profile">
            <div className="profile d-flex flex-column m-auto">
                <Link to="/mylist" className="m-auto">
                    <img className="mb-3" src="/logo.png" alt="logo" />
                </Link>    
                <div 
                    className="profile-img text-center" 
                    onMouseOver={() => hoverHandle(1)} 
                    onMouseOut={() => hoverHandle(0)}
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png" alt="profile-img" />
                    <EditIcon className="icon" id="editPen" titleAccess="upload profile image" />
                </div>
                <input type="file" className="d-none" id="imgfile" />

                <div className="form-input">
                    <form onSubmit={ (e) => submitHandle(e) }>
                        <div className="form-group has-danger">
                            <label className="form-label mt-2 text-primary">Name: </label>
                            <input 
                                type="text" 
                                className={`form-control border border-primary text-primary`} 
                                id="mail"
                                name="email" 
                                placeholder="Enter Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}    
                            />
                        </div>

                        <div className="form-group has-danger pb-2">
                            <label className="form-label mt-2 text-primary">About:</label>
                            <input 
                                type="text" 
                                className={`form-control border border-primary text-primary`} 
                                id="mail"
                                name="email" 
                                placeholder="Enter About" 
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}    
                            />
                        </div>
                        <div className="form-btn text-center">
                            <button type="submit" className="btn btn-primary mt-2">Update</button>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>        
    )
}

export default Profile
