import { useState } from 'react';
import '../../css/SingleImage.css';
import { useHistory } from 'react-router-dom';
import Message from '../../components/Message';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import BackspaceIcon from '@material-ui/icons/Backspace';

const Follow = () => {
    const [comment, setComment] = useState("");
    const history = useHistory();

    const submitComment = () => {
        console.log({comment});
    }

    return (
        <div className="moment container">
            <div className="back-btn" onClick={history.goBack}>
                <BackspaceIcon fontSize="large" />
            </div>
            
            <div className="post d-flex ">
                <div className="left-container">            
                    <img 
                        src="https://i.pinimg.com/originals/7e/24/8c/7e248c8782c1fb4963dc62c3c074d4b4.jpg" 
                        alt="img" 
                    />
                    <div className="post-btn d-flex justify-content-evenly">
                        <div>
                            <FavoriteSharpIcon titleAccess="like" />
                            <span> 2K</span>
                        </div>
                        <div>
                            <ShareRoundedIcon titleAccess="share" />
                        </div>
                    </div>

                    <div className="post-author d-flex justify-content-between align-items-center">
                        <div className="author-detail d-flex align-items-center">
                            <img 
                                src="https://p.favim.com/orig/2018/10/30/blonde-gorgeous-girl-Favim.com-6479337.jpg" 
                                alt="author-img" 
                            />
                            <div className="author-name">
                                <h5>Alizée - La Isla Bonita</h5>
                                <h6>124K Followers</h6>
                            </div>
                        </div>

                        <button className="btn btn-primary" type="button">Follow</button>
                    </div>
                </div>

                <div className="right-container">
                    <div className="post-title">
                        <h4>
                            Neque porro quisquam est qui dolorem ipsum quia
                        </h4>
                    </div>
                    <div className="post-detail">
                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors.
                        </p>
                    </div>
                </div>
            </div> 

            <div className="post-comment">
                <div className="comment-input d-flex align-items-center">
                    <img
                        src="https://media.istockphoto.com/photos/little-asian-boy-picture-id497000834?k=6&m=497000834&s=612x612&w=0&h=CLdnZwoo_G4oUH0_KPLBAEeiXlUmY9c06PPD4wVcznk="
                        alt="user-img"
                    />     
                    <input 
                        type="text"
                        className="form-control"
                        name="comment"
                        value={comment}
                        placeholder="write your comment..."
                        onChange={ (e) => setComment(e.target.value) }
                    />
                    <button type="button" className="btn btn-info" onClick={submitComment}>
                        comment
                    </button>
                </div>
                
                <div className="comment-box">
                    <div className="comment-title mb-3">
                        <h4>Comments:</h4>       
                    </div>
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                </div>
            </div>           
        </div>
    )
}

export default Follow
