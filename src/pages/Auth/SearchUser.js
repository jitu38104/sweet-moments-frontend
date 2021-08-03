import { useState, useEffect, useContext } from 'react';
import axios from '../../config/axios';
import { userContext } from '../../userContex';
import UserListTemp from '../../components/UserListTemp';
import { Link } from 'react-router-dom';

const SearchUser = () => {
    const [query, setQuery] = useState(false);
    const [data, setData] = useState({});
    const { research } = useContext(userContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const string = params.get('s');

        setQuery(string);
    }, [research]);

    useEffect(() => {        
        if(query) {
            const url = `/user/lite/me/${query}`;
            axios.get(url).then(res => {
                setData(res.data);
            }).catch(err => console.error(err.response.data));        
        }        
    }, [query, research]);

    return (
        <div 
            className='search-user container' 
            style={{
                height: '85.8vh',
                padding: '2rem 5rem',           
                backgroundColor: '#fff'
            }}
        >
            <h2 style={{ 
                color: '#343a40', 
                marginBottom: '3rem' 
                }}
            >
                Search result:
            </h2>
            {
                query ?
                    <Link to={`/${data?.id}/dashboard`} style={{textDecoration: 'none'}}>
                        <UserListTemp follower={query} />
                    </Link>
                : ""
            }
                        
        </div>
    )
}

export default SearchUser
