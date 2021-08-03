import React from 'react'

const PageNotFound = () => {
    return (
        <div 
            className='notFound' 
            style={{
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            <img 
                src="/pageNotFound.png" 
                alt="pnf-img"
                style={{
                    marginTop: '5rem',
                    height: '400px',
                    width: '700px',
                    objectFit: 'cover',
                    border: 'none'
                }}
            />
        </div>
    )
}

export default PageNotFound
