import '../../css/Home.css';
import axios from '../../config/axios';
import Card from '../../components/Card';
import Share from '../../components/Share';
import { userContext } from '../../userContex';
import CancelIcon from '@material-ui/icons/Cancel';
import { getToken } from '../../services/localStore';
import { useEffect, useState, useContext } from 'react';

const Home = () => {
  const [momentArr, setMomentArr] = useState([]);  
  const { setUser, setIsLogged } = useContext(userContext);
  const [close, setClose] = useState(true);
  const [shareInfo, setShareInfo] = useState({});

  useEffect(() => {
    axios.get('moment/all/moments').then(res => {
      console.log(res.data);
      setMomentArr(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

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
    }, [setUser, setIsLogged]);

    return (
        <div 
          className="home container"
          style={{
            height: momentArr.length ? '' : '46.4vh'            
          }}
        >

          <div className={close ? "d-none" : "share-box"}>
            <div className='share-container'>
              <CancelIcon 
                className='close-btn' 
                titleAccess='close' 
                onClick={() => close ? setClose(false) : setClose(true)}
              />
              <Share user={shareInfo?.username} url={shareInfo?.img_url} />
            </div>            
          </div>

          <div className="home-container">
            {
                momentArr.map((moment, index) => {
                return (
                    <Card 
                      key={index} 
                      data={moment}
                      setExit={setClose} 
                      setInfo={setShareInfo}
                    />
                )
                })
            }
          </div>
                  
        </div>
    )
}

export default Home
