import '../../css/UserListTemp.css';
import React from 'react'
import { Link } from 'react-router-dom'

const Feedback = () => {

    return (
        <div className='feedback'>
            <div className='feeback-container'>
                <h1>
                    You have been registered successfully!
                </h1>
                <Link to='/' className="back-link">
                    <p>
                        BACK
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Feedback
