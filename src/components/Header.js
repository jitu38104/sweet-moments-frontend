import axios from '../config/axios';
import { userContext } from '../userContex';
import { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { getToken, deleteToken } from '../services/localStore';

const Header = () => {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [direction, setDirection] = useState('upward');
    const { user, setUser, isLogged, setIsLogged, research, SetResearch } = useContext(userContext);

    const userLogout = () => {        
        getToken().then(userToken => {
            axios.post('/user/logout', {
                token: userToken
            }).then(res => {
                console.log(res.data);
                if(res.data?.flag === 1){
                    setUser({});
                    setIsLogged(false);
                    deleteToken();
                    directionHandler();                    
                    history.push('/');
                }
            }).catch(err => console.error(err.response.data));
        }).catch(err => console.error(err));
    }

    const searchHandler = () => {
        const url = `/search?s=${search}`;
        setSearch('');
        directionHandler();
        SetResearch(research + 1);
        history.push(url);
    }

    const directionHandler = () => {
        direction === 'upward'
        ? setDirection('downward')
        : setDirection('upward')
    }

    return (
        <nav 
            className="bg-primary"
            style={{
                position: "sticky", 
                top: 0, 
                zIndex: 100,
                padding: '1rem 0',
                maxHeight: '6.2rem',
            }}
        >
        {/* this functionality only for small screen */}
        <div className={`hidden-nav-bar bg-primary d-none ${direction}`}>
            <div className="container-sm links">
                <Link to='/about' onClick={directionHandler}>About</Link>
                {
                    isLogged
                    ?
                    <>
                        {
                            user?.role === 'admin'
                            ?
                                <Link to={`/${user._id}/${user.name}/admin`} onClick={directionHandler}>Admin</Link>
                            : null
                        }                        
                        <Link to={`/${user._id}/dashboard`} onClick={directionHandler}>Dashboard</Link>
                        <Link to={`/${user._id}/moment/add`} onClick={directionHandler}>Post Image</Link>
                        <Link to='#' onClick={userLogout}>Logout</Link>
                        <div className="search-inp">
                            <input 
                                type="text"
                                value={search}
                                className="form-control"
                                placeholder="Find someone by email"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button 
                                className="btn btn-info"
                                type='button'
                                onClick={searchHandler}
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </>
                    :""
                }
            </div>
        </div> 
        {/* /-------------------------------------------------------------------/    */}

            <div className="header container container-sm bg-primary d-flex justify-content-between align-items-center">
                <div className="brand">
                    <Link className="navbar-brand" to="/">
                        <img src="/logo.png" height="50" width="150" alt="logo-png" title="Home" />
                    </Link>
                </div>

                <div className={isLogged ? "search d-flex flex-grow-1 justify-content-center align-items-center" : "d-none"}>
                    <input 
                        type="text"
                        value={search}
                        className="form-control w-75"
                        placeholder="Find user by email"
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            height: '2.5rem',
                            borderRadius: 0,
                            borderRight: 'none',     
                        }}
                    />
                    <button 
                        className="btn"
                        title="Search"
                        onClick={searchHandler}
                        style={{
                            height: '2.5rem',
                            color: 'white',
                            borderRadius: 0,
                            backgroundColor: '#528fb3',
                            border: '1px solid #528fb3',
                            borderLeft: 'none',
                            fontWeight: 500, 
                        }}                        
                    >
                        <SearchIcon />
                    </button>
                </div>
                
                <div 
                    className="menu-bar d-none" 
                    onClick={directionHandler}
                >
                    <MenuIcon />
                </div>
                <div className="menu">
                    <ul className="d-flex align-items-center justify-content-center" style={{listStyle: 'none'}}>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/about" 
                                title="About Sweet-Moment"
                            >
                                About
                            </Link>
                        </li>
                          
                        {
                            isLogged
                            ?
                                    
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">
                                        {
                                            isLogged 
                                                ? 
                                                    <img 
                                                        src={user.image_path}
                                                        title={user.email}
                                                        style={{
                                                            height: '50px',
                                                            width: '50px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%'
                                                        }}
                                                        alt="avatar-img" 
                                                    /> 
                                                : "Login"
                                        }                            
                                    </Link>
                                    
                                        
                                            <div className="dropdown-menu">
                                                {
                                                    user?.role === 'admin'
                                                    ?
                                                    <Link className="dropdown-item" to={`/${user._id}/${user.name}/admin`}>Admin</Link>
                                                    : null
                                                }                                        
                                                <Link className="dropdown-item" to={`/${user._id}/dashboard`}>Dashboard</Link>
                                                <Link className="dropdown-item" to={`/${user._id}/moment/add`}>Post image</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to="#" onClick={userLogout}>Logout</Link>
                                            </div>                                                                                                        
                                </li> 
                                
                                : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
