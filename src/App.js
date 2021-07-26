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
  SingleImage
} from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="app">     
      <Router>                   
          <Switch> 
              <Route path="/add-moment">
                <Header />
                <AddMoment />
              </Route> 
              <Route path="/edit-moment">
                <Header />
                <EditMoment />
              </Route>
              <Route path="/reset">
                <ResetPass />
              </Route>
              <Route path="/single">
                <SingleImage   />
              </Route>


              <Route path="/mylist/setting">                
                <UserEdit />
              </Route>            
              <Route path="/mylist">
                <Header />
                <Dashboard />
              </Route>
              <Route path="/about">
                <Header />
                <About />
              </Route>
              <Route path="/register">
                <Register />
              </Route>            
              <Route path="/login">
                <Login />
              </Route>                                
              <Route path="/" exact={true}>
                <Header />
                <Home />
              </Route>
          </Switch>                            
      </Router>
    </div>
  );
}

export default App;
