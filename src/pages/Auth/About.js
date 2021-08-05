import React from 'react';
import CallIcon from '@material-ui/icons/Call';

const About = () => {
    return (
        <div className="about container">
            <div className="d-flex flex-column mt-2 mb-2 about-data">
                <h1 className="text-center">About Us</h1>
                <p className="text-break fw-light lh-base mt-2 about-detail" style={{fontSize: '18px'}}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum minus, tempora quia iste veritatis delectus modi quidem eius voluptas quasi ipsum. Eum, ullam quidem minus aperiam placeat veritatis illum repudiandae quisquam, cum obcaecati aliquid impedit quaerat eligendi. Qui vitae eligendi dolores quasi, minus recusandae magnam, error tempore tempora unde at soluta omnis veritatis, est facilis dolorum quaerat nam dignissimos ea eum cupiditate corrupti culpa corporis. Aspernatur veniam molestias commodi maxime eos et est recusandae mollitia consequatur. Qui alias excepturi animi repellat, dolor blanditiis accusamus tempore culpa dolore molestiae ullam earum voluptatem illum rem ducimus, sapiente quasi quis, libero porro consequatur. Nostrum reprehenderit consectetur voluptas, fugiat aperiam, expedita cum saepe distinctio aut dignissimos id officia, ut corporis nesciunt! Ipsum magni possimus vero minima non consectetur explicabo ipsa adipisci quidem assumenda? Porro soluta tenetur ipsa quas sint consectetur, possimus voluptate ullam quos nesciunt beatae aut! Recusandae odio pariatur quam iusto. Culpa quibusdam similique tempore, inventore maiores, laboriosam alias velit tenetur eaque sunt quisquam unde odio, voluptates veritatis iste expedita nostrum? Dignissimos aliquid nobis laudantium consectetur repellat sequi est inventore modi autem expedita odio error corporis magnam quae, explicabo, minima voluptas iusto. Dignissimos consectetur, nam porro unde aliquam ullam rem eum dolorum ab!    
                </p>
                <h5 className="text-end mt-2 fw-normal mb-0 pe-2">Jitender</h5>
                <p className="text-end lh-1 mt-1">
                    <CallIcon className="me-1" />: (+91) 123 456 789
                </p>
            </div>
        </div>
    )
}

export default About
