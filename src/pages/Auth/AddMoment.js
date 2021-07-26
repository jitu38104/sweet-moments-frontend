import { useState } from 'react';


const AddMoment = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('Write Description...');
    const [file, setFile] = useState(null);

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({title, desc, file});
    }
    return (
        <div className="moment container mt-5">
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
