import './css/App.css';
import { 
  Home, 
  About, 
  Login, 
  Register, 
  Dashboard, 
  UserEdit,
  AddMoment,
  EditMoment,
  ResetPass,
  SingleImage,
  Admin,
  Feedback,
  EmailVarify,
  PageNotFound,
  SearchUser,
  Landing
} from './pages';
import axios from './config/axios';
import Header from './components/Header';
import Footer from './components/Footer';
import { userContext } from './userContex';
import { useState, useEffect } from 'react';
import { getToken } from './services/localStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});
  const [research, SetResearch] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState('moment');

  useEffect(() => {
      getToken().then(token => {
        if(token) {
          axios.get('/user/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(result => {
            setUser(result.data);
            setIsLogged(true);
          }).catch(err => console.log(err));
        }      
      }).catch(err => console.log(err));   
    }, []);

  return (
    <userContext.Provider value={{
      user, setUser, 
      isLogged, setIsLogged, 
      type, setType,
      research, SetResearch
    }}>
      <div className="app">     
        <Router>                   
            <Switch>  
                <Route path="/account/password/reset/request">
                  <Header />
                  <EmailVarify />
                  <Footer />
                </Route>

                <Route path="/60f6c5b2bf69d52038edc107/reset">
                  <ResetPass />
                </Route>

                {
                  user?.role === 'admin'
                  ?
                    <Route path='/:id/:name/admin'>
                      <Admin />
                    </Route>
                  :
                    null
                }
                
                <Route path='/:id/dashboard/moment/edit'>
                  <Header />                 
                  {isLogged ?  <EditMoment /> : <PageNotFound />}
                  <Footer />
                </Route>

                <Route path='/:id/dashboard/moment'>                  
                  {isLogged ? <SingleImage /> : <PageNotFound />}
                </Route>

                <Route path="/:id/dashboard/edit">                
                  {isLogged ? <UserEdit /> : <PageNotFound />}
                </Route>    

                <Route path="/:id/dashboard">
                  <Header />                  
                  {isLogged ? <Dashboard /> : <PageNotFound />}
                  <Footer />
                </Route>

                <Route path="/:id/moment/add">
                  <Header />                  
                  {isLogged ? <AddMoment /> : <PageNotFound />}
                  <Footer />
                </Route>

                <Route path="/register/feeback">                  
                  {isLogged ? <Feedback /> : <PageNotFound />}
                </Route>
              
                <Route path="/about">
                  <Header />
                  <About />
                  <Footer />
                </Route>

                <Route path="/register">
                  <Register />
                </Route> 

                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/search">
                  <Header />
                  <SearchUser />
                </Route>

                <Route path="/" exact={true}>
                  <Header />
                  { isLogged ? <Home /> : <Landing /> }
                  <Footer />
                </Route>

                <Route path="/*">
                  <Header />
                  <PageNotFound />
                </Route>

            </Switch>                            
        </Router>
      </div>
    </userContext.Provider> 
  );
}

export default App;
