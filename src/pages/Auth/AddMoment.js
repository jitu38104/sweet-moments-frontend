import { useState } from 'react';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../services/localStore';

const AddMoment = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('Write Description...');
    const [file, setFile] = useState(null);

    const submitHandle = (e) => {
        e.preventDefault();        

        if(file) {
            const formData = new FormData();
            const body = { title, desc };

            formData.append('file', file);
            formData.append('upload_preset', 'sweet-moments');
            formData.append('cloud_name', 'jituboss38104');

            getToken().then(token => {
                const url = 'https://api.cloudinary.com/v1_1/jituboss38104/image/upload';
                axios.post(url, formData).then(res => {
                    console.log(res.data?.secure_url);
                    body['img_path'] = res.data?.secure_url;
                    body['img_id'] = res.data?.public_id;

                    axios.post('/moment/upload/img', body, {
                        headers: {
                            Authorization: `Bearer ${token}`
                            }
                    }).then(res => {
                        console.log(res.data);
                        history.push('/');
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));                
            }).catch(err => console.error(err));            
        } else {
            console.log("Image should be selected.")
            const html = `<p className="mb-0">Image field should be empty.</p>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="alert">X</button>`;
            const div = document.createElement('div');
            
            div.classList.add('alert', 'alert-dismissible', 'alert-primary', 'alert-msg');
            div.innerHTML = html;
            document.querySelector('.moment').prepend(div);
        }
    }
    return (
        <div className="moment container mt-1 mb-5">
        
            <h3 className="text-center mt-1">Add your sweet moment</h3>
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

                    <div className="form-group has-danger">
                        <label className="form-label mt-2">Image</label>
                        <input 
                            type="file" 
                            className="form-control"  
                            id="imgFile"
                            name="uploadPic"
                            accept=".jpg, .jpeg, .png, .gif"                           
                            onChange={(e) => setFile(e.target.files[0])}    
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2 pt-1 pb-1 w-100">Upload</button>
                </form>
            </div>            
        </div>
    )
}

export default AddMoment
