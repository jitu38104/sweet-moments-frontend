import '../../css/UserEdit.css';
import axios from '../../config/axios';
import { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { userContext } from '../../userContex';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../../services/localStore';
import { professionListArr } from '../../professions';


const Profile = () => {     
    const history = useHistory();
    const { user, setUser } = useContext(userContext);
    const [isDisplay, setIsDisplay] = useState(false);
    const [name, setName] = useState(user?.name);
    const [about, setAbout] = useState(user?.about);
    const [image, setImage] = useState(`https://sweet-moments-app.herokuapp.com/${user?.image_path}`);
    const [profession, setProfession] = useState(user?.profession || '');

    const submitHandle = (e) => {
        e.preventDefault();
        const fileInp = document.getElementById("imgfile");
        const body = { name, about, profession };
        let formData = new FormData();
        let isPicSelected = false;

        if(fileInp.files && fileInp.files[0]){
            formData.append('uploadPic', fileInp.files[0]);
            isPicSelected = true;
        }        

        getToken().then(token => {
            if(isPicSelected) {
                axios.post('/user/upload/img', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    console.log(res.data);
                    axios.post('/user/edit/info', body, {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        console.log(res.data)
                        setUser(res.data.updated);
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));               
            } else {
                axios.post('/user/edit/info', body, {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    console.log(res.data)
                    setUser(res.data.updated);
                }).catch(err => console.error(err));
            } 
            setIsDisplay(true);
            setTimeout(() => { 
                setIsDisplay(false);
                history.goBack();
            }, 2000);
        }).catch(err => console.error(err));
    }

    const hoverHandle = (flag) => {
        flag
        ? document.getElementById("editPen").style.display = "block"
        : document.getElementById("editPen").style.display = "none"
    }

    const fileOpenHandler = () => {
        const fileInp = document.getElementById("imgfile");                
        fileInp.click();        
    }

    const fileChangeHandler = () => {
        const fileInp = document.getElementById("imgfile");             
        
        if(fileInp.files && fileInp.files[0]){
            const reader = new FileReader();
    
            reader.onload = function(e){
                setImage(e.target.result);                                
            }
            reader.readAsDataURL(fileInp.files[0]);
        } else {
            console.log("out of limit");
        }
    }
    return (
        <div className="edit-profile">
        <div className={isDisplay ? "success-message" : "d-none"}>
            <p>updated sucessfully</p>
        </div>
            <div className="profile d-flex flex-column m-auto">
                <Link to={`/${user._id}/dashboard`} className="m-auto">
                    <img className="mb-3" src="/logo.png" alt="logo" />
                </Link>    
                <div 
                    className="profile-img text-center" 
                    onMouseOver={() => hoverHandle(1)} 
                    onMouseOut={() => hoverHandle(0)}
                >
                    <img 
                        src={image}
                        alt="profile-img" 
                        id="avatarImg"                             
                    />
                    <EditIcon 
                        className="icon" 
                        id="editPen" 
                        titleAccess="upload profile image"
                        onClick={fileOpenHandler}                        
                    />
                </div>
                <input 
                    type="file" 
                    className="d-none" 
                    id="imgfile"
                    onChange={fileChangeHandler}
                />

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

                        <div className="form-group">
                            <label className="form-label mt-2 text-primary">Profession:</label>
                            <select 
                                className="form-select border border-primary" 
                                onClick={(e) => setProfession(e.target.value)}>
                                <option>--SELECT--</option>
                                {
                                    professionListArr.map((item, index) => {
                                        if(user?.profession === item) {
                                            return <option key={index} value={item} selected>{item}</option>
                                        } else {
                                            return <option key={index} value={item}>{item}</option>
                                        }                                       
                                    })
                                }
                            </select>
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
