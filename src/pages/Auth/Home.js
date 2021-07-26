import { useEffect, useState } from 'react';
import '../../css/Home.css';
import axios from '../../config/axios';
import Card from '../../components/Card';

const Home = () => {
  const [momentArr, setMomentArr] = useState([]);

  useEffect(() => {
    axios.get('moment/all/moments').then(res => {
      setMomentArr(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

    return (
        <div className="home container">
          <div className="home-container">
            {
              momentArr.map((moment, index) => {
                const imgPath = moment.image_path;
                const splitedPath = imgPath.split('\\');           

                return (
                  <Card key={index} data={moment} userId={splitedPath[1]} />
                )
              })
            }
          </div>          
        </div>
    )
}

export default Home
