import axios from '../../config/axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../services/localStore';
import { useParams, useHistory } from 'react-router-dom';

const AddMoment = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isDisplay, setIsDisplay] = useState(false);
    const [momentId, setMomentId] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("id");
        setMomentId(query);
        const url = `/moment/one/moment/${query}?user_id=${id}`;

        axios.get(url).then(res => {
            const momentData = res.data[0];
            setTitle(momentData.title);
            setDesc(momentData.description);            
        }).catch(err => console.error(err));
    },[id]);

    const submitHandle = (e) => {
        e.preventDefault();

        const body = { title, desc };

        getToken().then(token => {
            axios.patch(`/moment/edit/${momentId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data);
                setIsDisplay(true);
                setTimeout(() => { 
                    history.goBack();
                }, 2000);                
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    return (
        <div className="moment container mt-3 mb-5 position-relative">
            <div className={isDisplay ? "success-message" : "d-none"}>
                <p>Updated sucessfully</p>
            </div>
            <h3 className="text-center mt-1">Edit your sweet moment</h3>
            <div className="moment-form d-flex flex-column w-75 mt-1 m-auto">
                <form onSubmit={(e) => submitHandle(e)}>

                    <div className="form-group has-danger">
                        <label className="form-label mt-2">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="title" 
                            placeholder="Enter title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}    
                        />
                    </div>

                    <div className="form-group has-danger">
                        <label className="form-label mt-2">Description</label>
                        <textarea 
                            name="desc" 
                            className="form-control" 
                            rows="5"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        >
                        </textarea>
                    </div>

                    <button type="submit" className="btn btn-primary mt-2 pt-1 pb-1 w-100">Update</button>
                </form>
            </div>            
        </div>
    )
}

export default AddMoment
