import { useState } from 'react';


const AddMoment = () => {
    const [title, setTitle] = useState('Amazing Hicking😍✌🏼🎉');
    const [desc, setDesc] = useState('It was an amazing day where I did alot of things!');

    const submitHandle = (e) => {
        e.preventDefault();
        console.log({title, desc});
    }
    return (
        <div className="moment container mt-5">
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
